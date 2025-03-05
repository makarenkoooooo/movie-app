import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../redux/userSlice'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  const dispatch = useDispatch()
  const favoriteMovies = useSelector((state) => state.user.favoriteMovies)
  const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id)

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card
        sx={{
          width: '300px', // Фиксированная ширина
          height: '450px', // Фиксированная высота
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: '0.3s',
          '&:hover': { transform: 'scale(1.05)' },
        }}
      >
        <CardMedia
          component="img"
          height="65%"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/300x450?text=Нет+Изображения'
          }
          alt={movie.title}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '35%',
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', fontSize: '16px' }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            Рейтинг: {movie.vote_average}
          </Typography>

          <IconButton
            sx={{ alignSelf: 'center' }}
            onClick={(e) => {
              e.preventDefault()
              dispatch(toggleFavorite(movie))
            }}
          >
            {isFavorite ? <Star color="primary" /> : <StarBorder />}
          </IconButton>
        </CardContent>
      </Card>
    </Link>
  )
}
