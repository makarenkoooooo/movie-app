import React, { createContext, useReducer, useContext } from 'react'

const FiltersContext = createContext(null)

const initialState = {
  genres: [],
  selectedGenres: [],
  releaseYear: '',
  sortBy: 'popular', // Значение по умолчанию
  currentPage: 1, // Текущая страница
  totalPages: 1, // Всего страниц
  searchQuery: '', // Добавлено поле для поиска фильмов
}

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return { ...state, genres: action.payload }
    case 'SET_SELECTED_GENRES':
      return { ...state, selectedGenres: action.payload }
    case 'SET_RELEASE_YEAR':
      return { ...state, releaseYear: action.payload }
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload, currentPage: 1 } // При смене сортировки сбрасываем на первую страницу
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload } // Обновляем текущую страницу
    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.payload } // Обновляем общее число страниц
    case 'SET_SEARCH_QUERY': // Новый обработчик поиска
      return { ...state, searchQuery: action.payload, currentPage: 1 } // При поиске сбрасываем страницу на первую
    case 'RESET_FILTERS':
      return { ...initialState, genres: state.genres } // Жанры не сбрасываем
    default:
      return state
  }
}

export const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState)

  return (
    <FiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = () => useContext(FiltersContext)
