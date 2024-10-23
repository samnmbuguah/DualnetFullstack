import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { fetchWrapper } from "_helpers";

const name = "auth";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();

const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(extraActions.login.pending, (state) => {
        state.error = null;
      })
      .addCase(extraActions.login.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
        user.password = "";
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(extraActions.login.rejected, (state, action) => {
        state.error = action.payload;  // action.payload will contain the custom error message
        Swal.fire("Error", action.payload ?? "unknown error", "error");
      })
      .addCase(extraActions.signup.pending, (state) => {
        state.error = null;
      })
      .addCase(extraActions.signup.fulfilled, (state, action) => {
        Swal.fire("Success!", "", "success");
      })
      .addCase(extraActions.signup.rejected, (state, action) => {
        state.error = action.error;
        Swal.fire("Error", action.error.message ?? "unknown error", "error");
      });
  },
});

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

function createInitialState() {
  return {
    user: JSON.parse(localStorage.getItem("user")),
    error: null,
  };
}

function createReducers() {
  return {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  };
}

function createExtraActions() {
  const baseUrl = `${fetchWrapper.api_url}/api`;

  return {
    login: createAsyncThunk(
      `${name}/login`,
      async ({ email, password }, { rejectWithValue }) => {
        try {
          return await fetchWrapper.post(`${baseUrl}/login`, { email, password });
        } catch (error) {
          // Try to extract a message from the response, if available
          let errorMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            'Login failed';
          if (typeof error == 'string') errorMessage = error;
    
          // Log detailed error (optional)
    
          // Pass the message to rejectWithValue
          return rejectWithValue(errorMessage);
        }
      }
    ),
    signup: createAsyncThunk(
      `${name}/signup`,
      async (data, { rejectWithValue }) => {
        try {
          const response = await fetchWrapper.post(`${baseUrl}/register`, data);
          return response;
        } catch (error) {
          console.error('Signup error:', error);
          return rejectWithValue(error.message || 'Signup failed');
        }
      }
    ),
  };
}
