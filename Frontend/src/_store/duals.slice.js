import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "_helpers";
import Swal from "sweetalert2";

const initialState = {
  dualInvestments: [],
  buyLowAmount: 100,
  sellHighAmount: 0.00156,
  aprToBuy: localStorage.getItem('aprToBuy') ? Number(localStorage.getItem('aprToBuy')) : 400,
  status: "idle",
  error: null,
  isChecked: false,
  selectedCrypto: "BTC",
  balances: [0.00,0.00],
  aprThreshold: 0, // New state variable for APR >
  closerStrike: 0,  // New state variable for Closer strike
  scaleBy: 0,      // New state variable for Scale by +
};

const baseUrl = `${fetchWrapper.api_url}/api`;

export const fetchInvestmentsByCurrency = createAsyncThunk(
  "duals/fetchInvestmentsByCurrency",
  async (currency) => {
    const response = await fetchWrapper.get(
      baseUrl + `/fetch-investments?currency=${currency}`
    );
    return response.investments;
  }
);

export const fetchSpotPrice = createAsyncThunk(
  "duals/fetchSpotPrice",
  async (currencyPair) => {
    const response = await fetchWrapper.get(
      baseUrl + `/get-spot-price?currencyPair=${currencyPair}`
    );
    return response.spotPrice;
  }
);

export const fetchSpotBalances = createAsyncThunk(
  "duals/fetchSpotBalances",
  async ({ subClientId, cryptoCurrency }) => {
    const response = await fetchWrapper.get(
      baseUrl + `/fetch-spot-balances?subClientId=${subClientId}&cryptoCurrency=${cryptoCurrency}`
    );
    return response;
  }
);

export const toggleAutoDual = createAsyncThunk(
  "duals/toggleAutoDual",
  async (_, { getState }) => {
    const state = getState().duals;
    const authUser = getState().auth.user;
    const subClientId = authUser[1].id;

    const payload = {
      active: !state.isChecked,
      currency: state.selectedCrypto,
      amount: state.buyLowAmount,
      threshold: state.aprToBuy,
      dualType: "buyLow",
      subClientId: subClientId,
    };

    const response = await fetchWrapper.post(baseUrl + "/auto-dual", payload);
    return response;
  }
);

export const fetchBalances = createAsyncThunk(
  "duals/fetchBalances",
  async (subClientId) => {
    const response = await fetchWrapper.post(
      baseUrl + "/get-balances", { subClientId }
    );
    console.log(response);
    return response;
  }
);

export const toggleChecked = () => async (dispatch, getState) => {
  const state = getState().duals;
  try {
    const result = await dispatch(toggleAutoDual());
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(dualsSlice.actions.toggleCheckedState(state.isChecked));
    }
  } catch (error) {
    console.error("Error toggling auto dual:", error);
  }
};
export const updateAutoDual = createAsyncThunk(
    "duals/updateAutoDual",
    async (_, { getState }) => {
        const state = getState().duals; // Get the current state
        const { aprToBuy, aprThreshold, closerStrike, scaleBy, dualInvestments, selectedCrypto } = state;
        const authUser = getState().auth.user;
        console.log("updateAutoDual");

        const response = await fetchWrapper.post(baseUrl + "/update-auto-dual", {
            aprToBuy,
            aprThreshold,
            closerStrike,
            scaleBy,
            dualInvestments,
            subClientId: authUser[1].id, 
            currency: selectedCrypto,
        });
        console.log(response);
        return response;
    }
);

const dualsSlice = createSlice({
  name: "duals",
  initialState,
  reducers: {
    updateAprToBuy: (state, action) => {
      console.log("aprToBuy", action.payload);
      state.aprToBuy = action.payload;
      localStorage.setItem('aprToBuy', action.payload);
    },
    toggleCheckedState: (state, action) => {
      state.isChecked = !action.payload;
    },
    updateSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    updateDualInvestments: (state, action) => {
      state.dualInvestments = action.payload;
    },
    updateBalances: (state, action) => {
      state.balances = action.payload; // Add balances to state
    },
    updateAprThreshold: (state, action) => {
      state.aprThreshold = action.payload;
    },
    updateCloserStrike: (state, action) => {
      state.closerStrike = action.payload;
    },
    updateScaleBy: (state, action) => {
      state.scaleBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestmentsByCurrency.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvestmentsByCurrency.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dualInvestments = action.payload;
      })
      .addCase(fetchInvestmentsByCurrency.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSpotPrice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpotPrice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.spotPrice = action.payload;
      })
      .addCase(fetchSpotPrice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSpotBalances.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpotBalances.fulfilled, (state, action) => {
        state.status = "succeeded";
        const [usdtBalance, cryptoBalance] = action.payload;
        state.usdtBalance = usdtBalance;
        state.cryptoBalance = cryptoBalance;
      })
      .addCase(fetchSpotBalances.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(toggleAutoDual.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleAutoDual.fulfilled, (state, action) => {
        state.status = "succeeded";
        const message = action.payload.active
          ? "Auto dual activated successfully!"
          : "Auto dual deactivated successfully!";
        Swal.fire({
          icon: "success",
          title: "Success",
          text: message,
        });
      })
      .addCase(toggleAutoDual.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to toggle auto dual: ${action.error.message}`,
        });
      })
      .addCase(fetchBalances.fulfilled, (state, action) => {
        state.balances = action.payload; // Store fetched balances
      })
      .addCase(updateAutoDual.fulfilled, (state, action) => {
        // Handle success if needed
      })
      .addCase(updateAutoDual.rejected, (state, action) => {
        // Handle error if needed
      });
  },
});

// Export actions and reducer
export const {
  updateAprToBuy,
  toggleCheckedState,
  updateSelectedCrypto,
  updateDualInvestments,
  updateAprThreshold,
  updateCloserStrike,
  updateScaleBy,
} = dualsSlice.actions;
export const dualsReducer = dualsSlice.reducer;
