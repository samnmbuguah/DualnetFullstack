import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "_helpers";
import data from "_components/DualInvestSidebar/DefaultApr.json";
import Swal from "sweetalert2";

const initialState = {
  dualInvestments: {
    exerciseCurrencyList: data.exerciseCurrencyList || [],
    investCurrencyList: data.investCurrencyList || [],
  },
  spotPrice: null,
  usdtBalance: 0,
  cryptoBalance: 0,
  buyLowAmount: 0,
  sellHighAmount: 0,
  aprToOpen: 450,
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
    return response;
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
      active: state.isChecked,
      currency: state.selectedCrypto,
      amount: state.buyLowAmount,
      threshold: state.aprToOpen,
      dualType: "buyLow",
      subClientId: subClientId,
    };

    const response = await fetchWrapper.post(baseUrl + "/auto-dual", payload);
    return response;
  }
);

export const toggleChecked = () => (dispatch, getState) => {
  const state = getState().duals;
  dispatch(dualsSlice.actions.toggleCheckedState(state.isChecked));
  dispatch(toggleAutoDual());
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
    updateAprToOpen: (state, action) => {
      state.aprToOpen = action.payload;
    },
    toggleCheckedState: (state, action) => {
      state.isChecked = !action.payload;
    },
    updateSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestmentsByCurrency.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvestmentsByCurrency.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dualInvestments = {
          ...state.dualInvestments,
          ...action.payload,
        };
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
      .addCase(toggleAutoDual.fulfilled, (state) => {
        state.status = "succeeded";
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Auto dual activated successfully!",
        });
      })
      .addCase(toggleAutoDual.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to activate auto dual: ${action.error.message}`,
        });
      });
  },
});

// Export actions and reducer
export const {
  updateBuyLowAmount,
  updateSellHighAmount,
  updateAprToOpen,
  toggleCheckedState,
  updateSelectedCrypto,
} = dualsSlice.actions;
export const dualsReducer = dualsSlice.reducer;