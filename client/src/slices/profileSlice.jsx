import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProfileServices from '../services/profile';

const initialState = {
  profile: {},
  status: 'idle',
  error: '',
};

export const getProfile = createAsyncThunk("profile/getProfile", async () => {
  const res = await ProfileServices.getProfile();
  return res?.data;
});


export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ id, payload }) => {
    const res = await ProfileServices.update(id, payload);
    return res?.data;
  }
);



const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
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
