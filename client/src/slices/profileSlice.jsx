// src/slices/profileSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserServices from "../services/user";




export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async ({ id} ) => {
      const res = await UserServices.update(id);
      return res?.data;
    }
  );

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
  
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const profileReducer = profileSlice.reducer;
