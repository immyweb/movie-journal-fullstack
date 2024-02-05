import { RESTDataSource } from '@apollo/datasource-rest';
import { config } from '../config';

export default class MovieDbApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.theMoviesDb.baseUrl;
  }

  async getMovieInfo(id) {
    return this.get(`movie/${id}${config.theMoviesDb.detail}`);
  }

  async getMovieCastCrew(id) {
    return this.get(`movie/${id}${config.theMoviesDb.credits}`);
  }

  async searchMovie(title) {
    return this.get(`${config.theMoviesDb.id}${title}`);
  }
}
