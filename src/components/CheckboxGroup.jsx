// import React from 'react';
// import { useFilters } from '../Contexts/FiltersContext';
// import {
//   Autocomplete,
//   TextField,
//   Checkbox,
//   FormControl,
//   MenuItem,
//   Box,
//   Chip,
// } from '@mui/material';

// function GenreSelect() {
//   const { state, dispatch } = useFilters();

//   // Обновление выбранных жанров
//   const handleChange = (event, newValue) => {
//     dispatch({ type: 'SET_SELECTED_GENRES', payload: newValue });
//   };

//   return (
//     <FormControl fullWidth>
//       <Autocomplete
//         multiple
//         limitTags={2} // Показываем только 2 выбранных жанра, остальные скрываются в "+X"
//         options={state.genres}
//         getOptionLabel={(option) => option.name}
//         value={state.selectedGenres.map((id) =>
//           state.genres.find((g) => g.id === id)
//         )}
//         onChange={(_, newValue) =>
//           handleChange(
//             _,
//             newValue.map((genre) => genre.id)
//           )
//         }
//         disableCloseOnSelect
//         isOptionEqualToValue={(option, value) => option.id === value.id}
//         sx={{ width: '400px' }}
//         renderOption={(props, option, { selected }) => (
//           <MenuItem key={option.id} {...props}>
//             <Checkbox checked={selected} />
//             {option.name}
//           </MenuItem>
//         )}
//         renderTags={(selected, getTagProps) => (
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//             {selected.map((option, index) => (
//               <Chip
//                 key={option.id}
//                 label={option.name}
//                 {...getTagProps({ index })}
//               />
//             ))}
//           </Box>
//         )}
//         renderInput={(params) => (
//           <TextField {...params} label="Жанры" placeholder="Выберите жанры" />
//         )}
//       />
//     </FormControl>
//   );
// }

// export default GenreSelect;

import React from 'react'
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedGenres } from '../redux/filtersSlice'

const CheckboxGroup = () => {
  const genres = useSelector((state) => state.filters.genres)
  const selectedGenres = useSelector((state) => state.filters.selectedGenres)
  const dispatch = useDispatch()

  const handleToggle = (genreId) => {
    let updatedGenres
    if (selectedGenres.includes(genreId)) {
      updatedGenres = selectedGenres.filter((id) => id !== genreId)
    } else {
      updatedGenres = [...selectedGenres, genreId]
    }
    dispatch(setSelectedGenres(updatedGenres))
  }

  return (
    <FormGroup>
      {genres.map((genre) => (
        <FormControlLabel
          key={genre.id}
          control={
            <Checkbox
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleToggle(genre.id)}
            />
          }
          label={genre.name}
        />
      ))}
    </FormGroup>
  )
}

export default CheckboxGroup
