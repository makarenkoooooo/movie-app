import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(`${BASE_URL}/movie/${id}?language=ru-RU`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzEyNTlmNzkxZTY0N2U3M2Y1N2FhNTUxY2FiNDM3YyIsIm5iZiI6MTcxODYyMjcxMy4wMTcsInN1YiI6IjY2NzAxOWY5MjdmYmY4MDViNzE5MjhiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMVx70j1s3K2TUJKJueOxs5NXBhLeM_6Q6LzzhIaB54`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка API: ${response.statusText}`);
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6">Ошибка: {error}</Typography>;
  if (!movie) return <Typography variant="h6">Фильм не найден</Typography>;

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : 'https://via.placeholder.com/500'
          }
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="subtitle1">{movie.tagline}</Typography>
          <Typography variant="body1">{movie.overview}</Typography>
          <Typography variant="h6">Рейтинг: {movie.vote_average}</Typography>
          <Typography variant="body2">
            Дата выхода: {movie.release_date}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MovieDetails;
