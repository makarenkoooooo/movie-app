const API_URL = 'https://api.themoviedb.org/3/genre/movie/list?language=ru';
const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzEyNTlmNzkxZTY0N2U3M2Y1N2FhNTUxY2FiNDM3YyIsIm5iZiI6MTcxODYyMjcxMy4wMTcsInN1YiI6IjY2NzAxOWY5MjdmYmY4MDViNzE5MjhiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMVx70j1s3K2TUJKJueOxs5NXBhLeM_6Q6LzzhIaB54';

export async function fetchGenres() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    return data.genres || []; // Возвращаем массив жанров
  } catch (error) {
    console.error('Ошибка загрузки жанров:', error);
    return [];
  }
}
