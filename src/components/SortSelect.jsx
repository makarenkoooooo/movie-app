import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SortSelect({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="sort-select-label">Сортировать по:</InputLabel>
      <Select
        labelId="sort-select-label"
        value={value}
        onChange={onChange}
        label="Сортировать по:"
      >
        <MenuItem value="popular">Популярности</MenuItem>
        <MenuItem value="top_rated">Рейтингу</MenuItem>
      </Select>
    </FormControl>
  );
}
