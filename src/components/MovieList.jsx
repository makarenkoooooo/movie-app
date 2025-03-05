// import React, { useEffect, useState } from 'react'
// import { Box, CircularProgress } from '@mui/material'
// import MovieCard from './MovieCard'
// import { useSelector, useDispatch } from 'react-redux'
// import { setTotalPages } from '../redux/filtersSlice'

// const API_TOKEN =
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzEyNTlmNzkxZTY0N2U3M2Y1N2FhNTUxY2FiNDM3YyIsIm5iZiI6MTcxODYyMjcxMy4wMTcsInN1YiI6IjY2NzAxOWY5MjdmYmY4MDViNzE5MjhiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMVx70j1s3K2TUJKJueOxs5NXBhLeM_6Q6LzzhIaB54'

// function MovieList() {
//   const state = useSelector((state) => state.filters)
//   const dispatch = useDispatch()
//   const [movies, setMovies] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     async function fetchMovies() {
//       setLoading(true)

//       let url = state.searchQuery.trim()
//         ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
//             state.searchQuery
//           )}&page=${state.currentPage}`
//         : `https://api.themoviedb.org/3/discover/movie?sort_by=${state.sortBy}&page=${state.currentPage}`

//       // Добавляем фильтр по жанрам
//       if (state.selectedGenres.length > 0) {
//         url += `&with_genres=${state.selectedGenres.join(',')}`
//       }

//       // Добавляем фильтр по году релиза
//       if (state.releaseYear.length === 2) {
//         url += `&primary_release_date.gte=${state.releaseYear[0]}-01-01&primary_release_date.lte=${state.releaseYear[1]}-12-31`
//       }

//       try {
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Authorization: API_TOKEN,
//             'Content-Type': 'application/json',
//           },
//         })

//         const data = await response.json()
//         setMovies(data.results || [])

//         // 🔹 Обновляем totalPages в Redux
//         dispatch(setTotalPages(data.total_pages || 1))
//       } catch (error) {
//         console.error('Ошибка загрузки фильмов:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchMovies()
//   }, [
//     state.searchQuery,
//     state.sortBy,
//     state.currentPage,
//     state.selectedGenres,
//     state.releaseYear,
//   ])

//   if (loading) {
//     return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
//   }

//   if (!movies || movies.length === 0) {
//     return <p>Фильмы не найдены.</p>
//   }

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         gap: '16px',
//       }}
//     >
//       {movies.map((movie) => (
//         <Box
//           key={movie.id}
//           sx={{
//             flex: '1 1 calc(33.33% - 16px)',
//             minWidth: '250px',
//             maxWidth: '300px',
//           }}
//         >
//           <MovieCard movie={movie} />
//         </Box>
//       ))}
//     </Box>
//   )
// }

// export default MovieList

import React, { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import MovieCard from './MovieCard'
import { useSelector, useDispatch } from 'react-redux'
import { setTotalPages } from '../redux/filtersSlice'

const API_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzEyNTlmNzkxZTY0N2U3M2Y1N2FhNTUxY2FiNDM3YyIsIm5iZiI6MTcxODYyMjcxMy4wMTcsInN1YiI6IjY2NzAxOWY5MjdmYmY4MDViNzE5MjhiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMVx70j1s3K2TUJKJueOxs5NXBhLeM_6Q6LzzhIaB54'

function MovieList() {
  const state = useSelector((state) => state.filters)
  const dispatch = useDispatch()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true)

      let url = state.searchQuery.trim()
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            state.searchQuery
          )}&page=${state.currentPage}`
        : `https://api.themoviedb.org/3/discover/movie?sort_by=${state.sortBy}&page=${state.currentPage}`

      if (state.selectedGenres.length > 0) {
        url += `&with_genres=${state.selectedGenres.join(',')}`
      }

      if (state.releaseYear.length === 2) {
        url += `&primary_release_date.gte=${state.releaseYear[0]}-01-01&primary_release_date.lte=${state.releaseYear[1]}-12-31`
      }

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: API_TOKEN,
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        const moviesPerPage = 6 // Ограничиваем до 6 фильмов на странице

        setMovies(data.results.slice(0, moviesPerPage) || [])
        dispatch(setTotalPages(Math.ceil(data.total_results / moviesPerPage)))
      } catch (error) {
        console.error('Ошибка загрузки фильмов:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [
    state.searchQuery,
    state.sortBy,
    state.currentPage,
    state.selectedGenres,
    state.releaseYear,
  ])

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
  }

  if (!movies || movies.length === 0) {
    return <p>Фильмы не найдены.</p>
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 карточки в ряд
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: 'auto',
        padding: '20px',
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  )
}

export default MovieList
