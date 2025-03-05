import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

export const UserContext = createContext(null)

const API_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzEyNTlmNzkxZTY0N2U3M2Y1N2FhNTUxY2FiNDM3YyIsIm5iZiI6MTcxODYyMjcxMy4wMTcsInN1YiI6IjY2NzAxOWY5MjdmYmY4MDViNzE5MjhiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMVx70j1s3K2TUJKJueOxs5NXBhLeM_6Q6LzzhIaB54'

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || '')
  const [accountId, setAccountId] = useState(
    localStorage.getItem('accountId') || ''
  )
  const [favoriteMovies, setFavoriteMovies] = useState([])

  // Функция загрузки избранных фильмов
  const fetchFavorites = useCallback(
    async (accId = accountId) => {
      if (!token || !accId) return
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/account/${accId}/favorite/movies`,
          {
            method: 'GET',
            headers: {
              Authorization: API_TOKEN,
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        setFavoriteMovies(data.results || [])
      } catch (error) {
        console.error('Ошибка загрузки избранных фильмов:', error)
      }
    },
    [token, accountId]
  ) // `fetchFavorites` теперь пересоздается только при изменении `token` или `accountId`

  // Функция загрузки accountId
  const fetchAccountId = useCallback(async () => {
    if (!token) return
    try {
      const response = await fetch(`https://api.themoviedb.org/3/account`, {
        method: 'GET',
        headers: {
          Authorization: API_TOKEN,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (data.id) {
        setAccountId(data.id)
        localStorage.setItem('accountId', data.id)
        fetchFavorites(data.id)
      }
    } catch (error) {
      console.error('Ошибка получения account_id:', error)
    }
  }, [token, fetchFavorites]) // `fetchAccountId` пересоздается только при изменении `token` или `fetchFavorites`

  // Загружаем данные при смене `token`
  useEffect(() => {
    if (token) {
      localStorage.setItem('userToken', token)
      fetchAccountId()
    } else {
      localStorage.removeItem('userToken')
    }
  }, [token, fetchAccountId]) // Все зависимости корректные

  // Функция добавления/удаления из избранного
  const toggleFavorite = useCallback(
    async (movie) => {
      if (!token || !accountId) return
      const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id)

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/account/${accountId}/favorite`,
          {
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
          }
        )

        if (response.ok) {
          fetchFavorites() // Перезапрашиваем избранное после обновления
        }
      } catch (error) {
        console.error('Ошибка изменения избранного:', error)
      }
    },
    [token, accountId, favoriteMovies, fetchFavorites]
  ) // `toggleFavorite` пересоздается только при изменении зависимостей

  // Мемоизация value, чтобы дочерние компоненты не перерисовывались
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      favoriteMovies,
      toggleFavorite,
    }),
    [token, favoriteMovies, toggleFavorite]
  ) // Пересоздается только при изменении этих зависимостей

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}
