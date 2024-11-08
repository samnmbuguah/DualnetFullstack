import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "_helpers";
import Swal from "sweetalert2";

const initialState = {
  botsByUser: {},
  status: "idle",
  error: null,
};

const baseUrl = `${fetchWrapper.api_url}/api`;

export const fetchBotsByUser = createAsyncThunk(
  "bots/fetchBotsByUser",
  async (userId) => {
    return { userId, bots: "" };
  }
);

export const trade = createAsyncThunk("bots/trade", async (tradeData) => {
  const response = await fetchWrapper.post(baseUrl + "/trade", tradeData);
  return response;
});

export const autoBot = createAsyncThunk("bots/autoBot", async (tradeData) => {
  const response = await fetchWrapper.post(baseUrl + "/autoBot", tradeData);
  return response;
});

const botsSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    addBots: {
      reducer(state, action) {
        const { userId, bots } = action.payload;
        const botsArray = Array.isArray(bots) ? bots : [];
    
        const incomingPositionIds = new Set(botsArray.map((bot) => bot.positionId));
        if (!Array.isArray(state.botsByUser[userId])) {
          state.botsByUser[userId] = [];
        }
        const filteredBots = state.botsByUser[userId].filter((bot) =>
          incomingPositionIds.has(bot.positionId)
        );
    
        if (JSON.stringify(filteredBots) !== JSON.stringify(state.botsByUser[userId])) {
          state.botsByUser[userId] = filteredBots;
        }
    
        botsArray.forEach((bot) => {
          const existingBotIndex = state.botsByUser[userId].findIndex(
            (b) => b.positionId === bot.positionId
          );
          if (existingBotIndex !== -1) {
            state.botsByUser[userId][existingBotIndex] = {
              ...state.botsByUser[userId][existingBotIndex],
              ...bot,
            };
          } else {
            state.botsByUser[userId].unshift(bot);
          }
        });
    
        state.botsByUser[userId].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      },
      prepare(userId, bots) {
        return { payload: { userId, bots } };
      },
    },
    removeBot(state, action) {
      const { userId, positionId } = action.payload;
      if (state.botsByUser[userId]) {
        const filteredBots = state.botsByUser[userId].filter(
          (bot) => bot.positionId !== positionId
        );
        if (JSON.stringify(filteredBots) !== JSON.stringify(state.botsByUser[userId])) {
          state.botsByUser[userId] = filteredBots;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBotsByUser.pending, (state) => {
        if (state.status !== "loading") {
          state.status = "loading";
        }
      })
      .addCase(fetchBotsByUser.fulfilled, (state, action) => {
        const { userId, bots } = action.payload;
        if (state.status !== "succeeded" || state.botsByUser[userId] !== bots) {
          state.status = "succeeded";
          state.botsByUser[userId] = bots;
        }
      })
      .addCase(fetchBotsByUser.rejected, (state, action) => {
        if (state.status !== "failed" || state.error !== action.error.message) {
          state.status = "failed";
          state.error = action.error.message;
        }
      })
      .addCase(trade.pending, (state) => {
        if (state.status !== "loading") {
          state.status = "loading";
        }
      })
      .addCase(trade.fulfilled, (state, action) => {
        if (state.status !== "succeeded") {
          state.status = "succeeded";
          Swal.fire(action.payload.message, "", "success");
        }
      })
      .addCase(trade.rejected, (state, action) => {
        if (state.status !== "failed" || state.error !== action.error.message) {
          state.status = "failed";
          state.error = action.error.message;
          Swal.fire("Error executing trade", action.error.message, "error");
        }
      });
  },
});

// Export actions and reducer
export const { removeBot, addBots } = botsSlice.actions;
export const botsReducer = botsSlice.reducer;