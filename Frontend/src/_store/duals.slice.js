import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "_helpers";
import Swal from "sweetalert2";

const initialState = {
  dualInvestments: [],
  buyLowAmount: 100,
  sellHighAmount: 0.00156,
  aprToBuy: localStorage.getItem('aprToBuy') ? Number(localStorage.getItem('aprToBuy')) : 400,
  aprToSell: 400,
  status: "idle",
  error: null,
  isChecked: false,
  selectedCrypto: "BTC",
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

export const fetchOpenedDuals = createAsyncThunk(
  "duals/fetchOpenedDuals",
  async (currency, { getState }) => {
    const state = getState().auth;
    const userId = state.user[1].id;
    const response = await fetchWrapper.get(
      `${baseUrl}/fetch-opened-duals?currency=${currency}&userId=${userId}`
    );
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

const dualsSlice = createSlice({
  name: "duals",
  initialState,
  reducers: {
    updateBuyLowAmount: (state, action) => {
      state.buyLowAmount = action.payload;
    },
    updateSellHighAmount: (state, action) => {
      state.sellHighAmount = action.payload;
    },
    updateAprToBuy: (state, action) => {
      state.aprToBuy = action.payload;
      localStorage.setItem('aprToBuy', action.payload);
    },
    updateAprToSell: (state, action) => {
      state.aprToSell = action.payload;
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
      .addCase(fetchOpenedDuals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOpenedDuals.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(action.payload) && action.payload.length === 0) {
          state.openedDuals = [];
          state.aprToBuy = 450;
          state.aprToSell = 450;
          state.isChecked = false;
        } else {
          state.openedDuals = action.payload;
          state.aprToBuy = action.payload.thresholdBuy || 450;
          state.aprToSell = action.payload.thresholdSell || 450;
          state.isChecked = action.payload.active || false;
        }
      })
      .addCase(fetchOpenedDuals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {
  updateBuyLowAmount,
  updateSellHighAmount,
  updateAprToBuy,
  updateAprToSell,
  toggleCheckedState,
  updateSelectedCrypto,
  updateDualInvestments,
} = dualsSlice.actions;
export const dualsReducer = dualsSlice.reducer;
