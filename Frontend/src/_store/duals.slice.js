import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "_helpers";
import data from "_components/DualInvestSidebar/DefaultApr.json";

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
  aprToOpen: 0,
  status: "idle",
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestmentsByCurrency.pending, (state) => {
        if (state.status !== "loading") {
          state.status = "loading";
        }
      })
      .addCase(fetchInvestmentsByCurrency.fulfilled, (state, action) => {
        const newInvestments = {
          ...state.dualInvestments,
          ...action.payload,
        };
        if (
          JSON.stringify(state.dualInvestments) !==
          JSON.stringify(newInvestments)
        ) {
          state.status = "succeeded";
          state.dualInvestments = newInvestments;
        }
      })
      .addCase(fetchInvestmentsByCurrency.rejected, (state, action) => {
        if (state.status !== "failed" || state.error !== action.error.message) {
          state.status = "failed";
          state.error = action.error.message;
        }
      })
      .addCase(fetchSpotPrice.pending, (state) => {
        if (state.status !== "loading") {
          state.status = "loading";
        }
      })
      .addCase(fetchSpotPrice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.spotPrice = action.payload;
      })
      .addCase(fetchSpotPrice.rejected, (state, action) => {
        if (state.status !== "failed" || state.error !== action.error.message) {
          state.status = "failed";
          state.error = action.error.message;
        }
      })
      .addCase(fetchSpotBalances.pending, (state) => {
        if (state.status !== "loading") {
          state.status = "loading";
        }
      })
      .addCase(fetchSpotBalances.fulfilled, (state, action) => {
        state.status = "succeeded";
        const [usdtBalance, cryptoBalance] = action.payload;
        state.usdtBalance = usdtBalance;
        state.cryptoBalance = cryptoBalance;
      })
      .addCase(fetchSpotBalances.rejected, (state, action) => {
        if (state.status !== "failed" || state.error !== action.error.message) {
          state.status = "failed";
          state.error = action.error.message;
        }
      });
  },
});

// Export actions and reducer
export const { updateBuyLowAmount, updateSellHighAmount, updateAprToOpen } = dualsSlice.actions; 
export const dualsReducer = dualsSlice.reducer;