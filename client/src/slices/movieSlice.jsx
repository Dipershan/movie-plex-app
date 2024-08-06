import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieServices from "../services/movies";

const initialState = {
  movies: [],
  movie: {},
  total: 0,
  limit: 12,
  currentPage: 1,
  error: "",
  loading: false,
};

export const createMovie = createAsyncThunk(
  "movies/createMovie",
  async (payload) => {
    const res = await MovieServices.create(payload);
    return res?.data;
  }
);

export const listMovie = createAsyncThunk(
  "movies/listMovie",
  async ({ page, limit, title }) => {
    const res = await MovieServices.list(limit, page, title);
    return res?.data;
  }
);

export const getMovie = createAsyncThunk("movies/getMovie", async (id) => {
  const res = await MovieServices.getById(id);
  return res?.data;
});

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, payload }) => {
    const res = await MovieServices.updateById(id, payload);
    return res?.data;
  }
);

export const updateSeats = createAsyncThunk(
  "movies/updateSeats",
  async ({ id, seats }) => {
    const res = await MovieServices.updateSeats(id, { seats });
    return { id, seats: res?.data.seats };
  }
);

const movieSlice = createSlice({
  name: "movies",
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
      .addCase(createMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies.push(action.payload);
      })
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(listMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.movies = action.payload.data.movies;
      })
      .addCase(listMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(listMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload.data;
      })
      .addCase(getMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.movies.findIndex((movie) => movie._id === action.payload._id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        } else {
          state.movies.push(action.payload);
        }
      })
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateSeats.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies[index].seats = action.payload.seats;
        }
        state.movie.seats = action.payload.seats;
      })
      .addCase(updateSeats.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
   
      
  },
});

export const { setCurrentPage, setLimit } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
