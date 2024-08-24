import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "_helpers";
import data from "_components/DualInvestSidebar/DefaultApr.json";

const initialState = {
  dualInvestments: {
    exerciseCurrencyList: data.exerciseCurrencyList || [],
    investCurrencyList: data.investCurrencyList || [],
  },
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

const dualsSlice = createSlice({
  name: "duals",
  initialState,
  reducers: {},
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
      });
  },
});

// Export actions and reducer
export const dualsReducer = dualsSlice.reducer;
