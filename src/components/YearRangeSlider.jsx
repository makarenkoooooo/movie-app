import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setReleaseYear } from '../redux/filtersSlice'
import { Slider, Typography, Box, styled } from '@mui/material'

// 🎨 Кастомный стиль для ползунка (цвет + закругленные ручки)
const CustomSlider = styled(Slider)({
  color: '#1976d2', // Синий цвет
  height: 6, // Высота линии
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '3px solid #1976d2', // Цвет обводки
    '&:hover': {
      boxShadow: '0px 0px 8px rgba(25, 118, 210, 0.5)',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bdbdbd',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bdbdbd',
    height: 8,
    width: 8,
    borderRadius: '50%',
  },
  '& .MuiSlider-markLabel': {
    fontSize: '12px',
    color: '#666',
  },
})

const marks = [
  { value: 1980, label: '1980' },
  { value: 1990, label: '1990' },
  { value: 2000, label: '2000' },
  { value: 2010, label: '2010' },
  { value: 2020, label: '2020' },
  { value: 2023, label: '2023' },
]

function YearRangeSlider() {
  const releaseYear = useSelector((state) => state.filters.releaseYear)
  const dispatch = useDispatch()

  // Значение по умолчанию
  const currentValue = releaseYear.length ? releaseYear : [1980, 2023]

  // Обновление диапазона лет
  const handleChange = (event, newValue) => {
    dispatch(setReleaseYear(newValue))
  }

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Год релиза:
      </Typography>
      <CustomSlider
        min={1980}
        max={2023}
        step={1}
        value={currentValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks} // 🔹 Добавляем метки на шкалу
      />
    </Box>
  )
}

export default YearRangeSlider
