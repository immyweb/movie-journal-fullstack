export const theMoviesDb = {
  baseUrl: 'https://api.themoviedb.org/3/',
  id: `search/movie?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false&query=`,
  detail: `?api_key=${process.env.API_KEY}&language=en-US`,
  credits: `/credits?api_key=${process.env.API_KEY}&language=en-US`,
  imgUrl: `https://www.themoviedb.org/t/p/w220_and_h330_face/`,
};
