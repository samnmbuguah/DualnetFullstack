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
    // const response = await fetchWrapper.get(`/api/users/${userId}/bots`); // Replace with your API endpoint for fetching bots by user
    // return { userId, bots: response.data };
    return { userId, bots: "" };
  }
);

export const trade = createAsyncThunk("bots/trade", async (tradeData) => {
  console.log("trade", tradeData);
  const response = await fetchWrapper.post(baseUrl + "/trade", tradeData);
  // return response.data;
  console.log("response", response);
  return response;
});

export const autoBot = createAsyncThunk("bots/autoBot", async (tradeData) => {
  console.log("autoBot", tradeData);
  const response = await fetchWrapper.post(baseUrl + "/autoBot", tradeData);
  console.log("response", response);
  return response;
});

const botsSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    addBot: {
      reducer(state, action) {
        const { userId, bot } = action.payload;
        if (!state.botsByUser[userId]) {
          state.botsByUser[userId] = [bot];
        } else {
          state.botsByUser[userId].push(bot);
        }
      },
      prepare(userId, bot) {
        return { payload: { userId, bot } };
      },
    },
        addBots: {
      reducer(state, action) {
        const { userId, bots } = action.payload;
        const incomingPositionIds = new Set(bots.map((bot) => bot.positionId));
        if (!Array.isArray(state.botsByUser[userId])) {
          state.botsByUser[userId] = [];
        }
        state.botsByUser[userId] = state.botsByUser[userId].filter((bot) =>
          incomingPositionIds.has(bot.positionId)
        );

        bots.forEach((bot) => {
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

        // Sort bots by createdAt date in descending order (newest first)
        state.botsByUser[userId].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      },
      prepare(userId, bots) {
        return { payload: { userId, bots } };
      },
    },
    removeBot(state, action) {
      const { userId, positionId } = action.payload;
      console.log(positionId, userId, "removing bot");
      if (state.botsByUser[userId]) {
        state.botsByUser[userId] = state.botsByUser[userId].filter(
          (bot) => bot.positionId !== positionId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBotsByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBotsByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { userId, bots } = action.payload;
        state.botsByUser[userId] = bots;
      })
      .addCase(fetchBotsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(trade.pending, (state) => {
        state.status = "loading";
      })
      .addCase(trade.fulfilled, (state, action) => {
        state.status = "succeeded";
        Swal.fire(action.payload.message, "", "success");
      })
      .addCase(trade.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        Swal.fire("Error executing trade", action.error.message, "error");
      });
  },
});

// Export actions and reducer
export const { addBot, removeBot, addBots } = botsSlice.actions;
export const botsReducer = botsSlice.reducer;
