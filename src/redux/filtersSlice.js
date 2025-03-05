import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  genres: [],
  selectedGenres: [],
  releaseYear: '',
  sortBy: 'popularity.desc',
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload
    },
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload
    },
    setReleaseYear: (state, action) => {
      state.releaseYear = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
      state.currentPage = 1
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    resetFilters: (state) => {
      return { ...initialState, genres: state.genres }
    },
  },
})

export const {
  setGenres,
  setSelectedGenres,
  setReleaseYear,
  setSortBy,
  setPage,
  setTotalPages,
  setSearchQuery,
  resetFilters,
} = filtersSlice.actions
export default filtersSlice.reducer
