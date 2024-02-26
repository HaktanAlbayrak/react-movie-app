import axios from 'axios';

export const imagePath = 'https://image.tmdb.org/t/p/w500';
export const imagePathOriginal = 'https://image.tmdb.org/t/p/original';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = import.meta.env.VITE_API_KEY;

// TRENDING

export const fetchTrending = async (timeWindow = 'day') => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );

  return data?.results;
};

// MOVIES && SERIES - DETAILS

export const fetchDetails = async (type, id) => {
  const { data } = await axios.get(
    `${baseUrl}/${type}/${id}?api_key=${apiKey}`
  );

  return data;
};

// MOVIES && SERIES - CREDITS

export const fetchCredits = async (type, id) => {
  const { data } = await axios.get(
    `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
  );
  return data;
};

// MOVIES && SERIES - VIDEOS

export const fetchVideos = async (type, id) => {
  const { data } = await axios.get(
    `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`
  );

  return data;
};
