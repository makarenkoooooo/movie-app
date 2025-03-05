const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzEyNTlmNzkxZTY0N2U3M2Y1N2FhNTUxY2FiNDM3YyIsIm5iZiI6MTcxODYyMjcxMy4wMTcsInN1YiI6IjY2NzAxOWY5MjdmYmY4MDViNzE5MjhiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMVx70j1s3K2TUJKJueOxs5NXBhLeM_6Q6LzzhIaB54';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (sortBy = 'popular', page = 1) => {
  if (!API_KEY) {
    console.error('Ошибка: API_KEY не найден. Проверьте .env файл!');
    return null;
  }

  // Преобразуем `sortBy` в правильный API-параметр
  const sortMapping = {
    Популярности: 'popular',
    Рейтингу: 'top_rated',
  };
  const apiSort = sortMapping[sortBy] || 'popular'; // По умолчанию "популярные"

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${apiSort}?language=ru-RU&page=${page}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error.message);
    return null;
  }
};
