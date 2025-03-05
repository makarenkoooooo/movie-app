import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Токен для авторизации
const API_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzEyNTlmNzkxZTY0N2U3M2Y1N2FhNTUxY2FiNDM3YyIsIm5iZiI6MTcxODYyMjcxMy4wMTcsInN1YiI6IjY2NzAxOWY5MjdmYmY4MDViNzE5MjhiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMVx70j1s3K2TUJKJueOxs5NXBhLeM_6Q6LzzhIaB54'

// 🔹 Асинхронный экшен для получения accountId
export const fetchAccountId = createAsyncThunk(
  'user/fetchAccountId',
  async (_, { getState }) => {
    const token = getState().user.token
    if (!token) return

    const response = await fetch('https://api.themoviedb.org/3/account', {
      method: 'GET',
      headers: {
        Authorization: API_TOKEN,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return data.id
  }
)

// 🔹 Асинхронный экшен для загрузки избранных фильмов
export const fetchFavorites = createAsyncThunk(
  'user/fetchFavorites',
  async (_, { getState }) => {
    const { token, accountId } = getState().user
    if (!token || !accountId) return []

    const response = await fetch(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/movies`,
      {
        method: 'GET',
        headers: {
          Authorization: API_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()
    return data.results || []
  }
)

// 🔹 Асинхронный экшен для добавления/удаления фильма в избранное
export const toggleFavorite = createAsyncThunk(
  'user/toggleFavorite',
  async (movie, { getState, dispatch }) => {
    const { token, accountId, favoriteMovies } = getState().user
    if (!token || !accountId) return

    const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id)

    await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movie.id,
        favorite: !isFavorite,
      }),
    })

    // 🔄 После запроса обновляем избранные фильмы
    dispatch(fetchFavorites())
  }
)

// 🔹 Создаем Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('userToken') || '',
    accountId: localStorage.getItem('accountId') || '',
    favoriteMovies: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem('userToken', action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountId.fulfilled, (state, action) => {
        state.accountId = action.payload
        localStorage.setItem('accountId', action.payload)
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteMovies = action.payload
      })
  },
})

// Экспортируем actions и reducer
export const { setToken } = userSlice.actions
export default userSlice.reducer
