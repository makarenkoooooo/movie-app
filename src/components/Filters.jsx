import React, { useEffect } from 'react'
import { Pagination, TextField } from '@mui/material'
import styles from './Filters.module.css'
import CheckboxGroup from './CheckboxGroup'
import { fetchGenres } from '../function/genreApi'
import { useSelector, useDispatch } from 'react-redux'
import {
  setGenres,
  setSearchQuery,
  setSortBy,
  setPage,
  resetFilters,
} from '../redux/filtersSlice'
import YearRangeSlider from './YearRangeSlider'
import SortSelect from './SortSelect'

const Filters = () => {
  const state = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  useEffect(() => {
    async function loadGenres() {
      const data = await fetchGenres()
      dispatch(setGenres(data))
    }
    loadGenres()
  }, [dispatch])

  return (
    <div className={styles.filters}>
      <div className={styles.filtersHeader}>
        <h2>Фильтры</h2>
        <button
          onClick={() => dispatch(resetFilters())}
          className={styles.closeButton}
        >
          сброс фильтров
        </button>
      </div>

      {/* Поле поиска */}
      <TextField
        label="Название фильма"
        variant="outlined"
        fullWidth
        value={state.searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        sx={{ marginBottom: '10px' }}
      />

      {/* Сортировка фильмов */}
      <SortSelect
        value={state.sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
      />

      <YearRangeSlider />

      <h3>Жанры</h3>
      <CheckboxGroup />

      {/* Пагинация */}
      <Pagination
        count={state.totalPages}
        page={state.currentPage}
        onChange={(event, value) => dispatch(setPage(value))}
        color="primary"
        sx={{ margin: '10px' }}
      />
    </div>
  )
}

export default Filters
