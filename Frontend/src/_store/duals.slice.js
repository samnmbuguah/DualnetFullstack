import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "_helpers";
import data from "_components/DualInvestSidebar/DefaultApr.json";
import Swal from "sweetalert2";

const initialState = {
  dualInvestments: {
    exerciseCurrencyList: data.exerciseCurrencyList,
    investCurrencyList: data.investCurrencyList,
  },
  spotPrice: null,
  usdtBalance: 22.589,
  cryptoBalance: 0.00,
  buyLowAmount: 100,
  sellHighAmount: 0.00156,
  aprToBuy: localStorage.getItem('aprToBuy') ? Number(localStorage.getItem('aprToBuy')) : 400,
  aprToSell: 400,
  status: "idle",
  error: null,
  isChecked: false,
  selectedCrypto: "BTC",
  openedBuyDuals: 0,
  buyLowPerShare: 156,
  sellHighPerShare: 156,
  strikePrices: [],
  selectedStrikePrice: "",
  shortSize: -1,
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
    console.log("response", response);
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

export const addShortBot = createAsyncThunk(
  "duals/addShortBot",
  async (_, { getState }) => {
    const dualsState = getState().duals;
    const authState = getState().auth;
    const userId = authState.user[1].id;

    const payload = {
      userId,
      currency: dualsState.selectedCrypto,
      strikePrice: dualsState.selectedStrikePrice,
      investAmount: dualsState.shortSize,
    };

    const response = await fetchWrapper.post(baseUrl + "/add-short-bot", payload);
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
    updateAprToBuy: (state, action) => {
      state.aprToBuy = action.payload;
      localStorage.setItem('aprToBuy', action.payload);
    },
    updateAprToSell: (state, action) => { // Add this new reducer
      state.aprToSell = action.payload;
    },
    toggleCheckedState: (state, action) => {
      state.isChecked = !action.payload;
    },
    updateSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setStrikePrice: (state, action) => {
      state.selectedStrikePrice = action.payload;
    },
    updateShortSize: (state, action) => {
      state.shortSize = action.payload;
    },
    updateInvestCurrencyShare: (state, action) => {
      const { index, value } = action.payload;
      if (state.dualInvestments.investCurrencyList[index]) {
        state.dualInvestments.investCurrencyList[index].shareCount = value;
      }
    },
    updateExerciseCurrencyShare: (state, action) => {
      const { index, value } = action.payload;
      if (state.dualInvestments.exerciseCurrencyList[index]) {
        state.dualInvestments.exerciseCurrencyList[index].shareCount = value;
      }
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

        // Extract the first item from exerciseCurrencyList safely
        const firstExerciseCurrency =
          action.payload.exerciseCurrencyList?.[0] || {};

        // Set buyLowPerShare based on exerciseCurrency
        let buyLowPerShare = firstExerciseCurrency?.perValue ?? 0;
        if (
          firstExerciseCurrency.exerciseCurrency !== "BTC" &&
          firstExerciseCurrency.exerciseCurrency !== "ETH"
        ) {
          buyLowPerShare = 1;
        }

        state.buyLowPerShare = buyLowPerShare;
        state.sellHighPerShare =
          action.payload.investCurrencyList?.[0]?.perValue ?? 0;
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
          // Handle the case when the payload is an empty array
          state.openedDuals = [];
          state.aprToBuy = 450;
          state.aprToSell = 450; // Add this line
          state.isChecked = false;
          state.openedBuyDuals = 0;
        } else {
          // Handle the case when the payload contains data
          state.openedDuals = action.payload;
          state.aprToBuy = action.payload.thresholdBuy || 450;
          state.aprToSell = action.payload.thresholdSell || 450; // Add this line
          state.isChecked = action.payload.active || false;
          state.openedBuyDuals = action.payload.dualCount || 0;
          state.strikePrices = action.payload.strikePrices || ["64000"];
          state.selectedStrikePrice = action.payload.strikePrices?.[0] || "64000";
        }
      })
      .addCase(fetchOpenedDuals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addShortBot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addShortBot.fulfilled, (state, action) => {
        state.status = "succeeded";
        Swal.fire("Success", "Short bot opened successfully", "success");
      })
      .addCase(addShortBot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        Swal.fire("Error", "Failed to open hedge bot", "error");
      });
  },
});

// Export actions and reducer
export const {
  updateBuyLowAmount,
  updateSellHighAmount,
  updateAprToBuy,
  updateAprToSell, // Add this new action
  toggleCheckedState,
  updateSelectedCrypto,
  setStrikePrice,
  updateShortSize,
  updateInvestCurrencyShare,
  updateExerciseCurrencyShare,
} = dualsSlice.actions;
export const dualsReducer = dualsSlice.reducer;