import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import Filters from './components/Filters'
import Header from './components/Header'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'
import { FiltersProvider, useFilters } from './Contexts/FiltersContext'
import { useSelector } from 'react-redux'
import { fetchMovies } from './services/api'

function AppContent() {
  const { state, dispatch } = useFilters()
  const [movies, setMovies] = useState([])
  const token = useSelector((state) => state.user.token) // ✅ Берём токен из Redux
  const navigate = useNavigate() // ✅ Используем для редиректа

  useEffect(() => {
    if (!token) {
      navigate('/') // ✅ Если нет токена, отправляем на главную
    }
  }, [token, navigate])

  useEffect(() => {
    if (!token) return

    async function loadMovies() {
      const sortBy = state.sortBy === 'Рейтингу' ? 'top_rated' : 'popular'
      const data = await fetchMovies(sortBy, state.currentPage)

      if (data?.results) {
        setMovies(data.results)
        dispatch({
          type: 'SET_TOTAL_PAGES',
          payload: data.total_pages > 500 ? 500 : data.total_pages,
        })
      }
    }

    loadMovies()
  }, [state.sortBy, state.currentPage, dispatch, token])

  if (!token) {
    return (
      <>
        <Header />
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Пожалуйста, войдите в систему, чтобы увидеть фильмы.
        </Typography>
      </>
    )
  }

  return (
    <>
      <Header /> {/* ✅ Теперь Header не сбрасывается при смене страниц */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '24px',
          padding: '16px',
        }}
      >
        <Box>
          <Filters />
        </Box>
        <Box sx={{ flex: '1' }}>
          <MovieList movies={movies} />
        </Box>
      </Box>
    </>
  )
}

function App() {
  return (
    <FiltersProvider>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </FiltersProvider>
  )
}

export default App
