import { createSlice  ,  createAsyncThunk } from "@reduxjs/toolkit";
import UserServices from "../services/users";

const initialState = {
  users: [],
  user : {},
  total: 0,
  limit: 12,
  currentPage: 1,
  error: "",
  loading: false,
  adminUser: {},
};

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload) => {
    const res = await UserServices.create(payload);
    return res?.data;
  }
);



export const listUser = createAsyncThunk(
  "users/listUser",
  async ({ page, limit }) => {
    const res = await UserServices.list(limit, page);
    return res?.data;
  }
);


//normal user
export const getUser = createAsyncThunk("users/getUser", async (id) => {
  const res = await UserServices.getById(id);
  return res?.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, payload }) => {
    const res = await UserServices.update(id, payload);
    return res?.data;
  }
);





const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = Number(action.payload);
    },
    setLimit: (state, action) => {
      state.limit = Number(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(listUser.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.users = action.payload.data.users;
      })
      .addCase(listUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(listUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    
  
  }, // API Calls
});

export const { setCurrentPage, setLimit } = userSlice.actions;

export const userReducer = userSlice.reducer;