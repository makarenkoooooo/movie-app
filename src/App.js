import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Box, Typography } from '@mui/material'
import Filters from './components/Filters'
import Header from './components/Header'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'
import { UserProvider, UserContext } from './Contexts/UserContext'
import { FiltersProvider, useFilters } from './Contexts/FiltersContext'
import { fetchMovies } from './services/api'

function AppContent() {
  const { state, dispatch } = useFilters()
  const [movies, setMovies] = useState([])
  const { token } = useContext(UserContext)

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
      <Header /> {/* Теперь Header не будет сбрасываться при смене страниц */}
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
    <UserProvider>
      <FiltersProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </FiltersProvider>
    </UserProvider>
  )
}

export default App
