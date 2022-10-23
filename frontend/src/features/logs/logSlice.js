import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import logService from "./logService";

const initialState = {
  logs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  allLogs: [],
};

// Create new log action
export const createLog = createAsyncThunk(
  "log/create",
  async (logData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await logService.createLog(logData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user logs
export const getLogs = createAsyncThunk(
  "logs/getUserLogs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await logService.getLogs(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All logs in DB
export const getAllLogs = createAsyncThunk(
  "logs/getAll",
  async (_, thunkAPI) => {
    try {
      return await logService.getAllLogs();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Delete user log
export const deleteLog = createAsyncThunk(
  "log/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await logService.deleteLog(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logs.push(action.payload);
        state.allLogs.push(action.payload);
      })
      .addCase(createLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logs = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logs = state.logs.filter((log) => log._id !== action.payload.id);
        state.allLogs = state.logs.filter(
          (log) => log._id !== action.payload.id
        );
      })
      .addCase(deleteLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allLogs = action.payload;
      })
      .addCase(getAllLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = logSlice.actions;
export default logSlice.reducer;
