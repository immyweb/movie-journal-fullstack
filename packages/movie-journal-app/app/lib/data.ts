import { unstable_noStore as noStore } from 'next/cache';
import { Movie } from './definitions';

const GRAPHQLURL = 'http://localhost:4000/graphql';

export async function fetchMovieById(id: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  const data = await fetch(GRAPHQLURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetMovieById(
          $id: String!
        ) {
          getMovieById(id: $id) {
            dateWatched
            film
            review
            rating
            like
            id
          }
        }
      `,
      variables: {
        id,
      },
    }),
  });

  try {
    const movie = await data.json();
    const result = movie.data.getMovieById;

    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movie by ID.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredMovies(
  query: string,
  currentPage: number,
  user: string
) {
  noStore();

  // const url = new URL('/movies', URLBASE);
  // url.searchParams.append('limit', `${ITEMS_PER_PAGE}`);
  // url.searchParams.append('page', `${currentPage}`);
  // if (query) {
  //   url.searchParams.append('film_eq', query);
  // }

  const data = await fetch(GRAPHQLURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetMoviesByUser(
          $email: String!
          $query: String!
          $skip: Float!
          $take: Float!
        ) {
          getMoviesByUser(email: $email, query: $query, skip: $skip, take: $take) {
            dateWatched
            film
            rating
            like
            id
          }
        }
      `,
      variables: {
        email: user,
        query,
        skip: currentPage - 1,
        take: ITEMS_PER_PAGE,
      },
    }),
  });

  try {
    const movies = await data.json();
    const moviesList = movies.data.getMoviesByUser;
    return moviesList;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered list of movies.');
  }
}

export async function fetchMoviesPages(query: string, user: string) {
  noStore();

  const data = await fetch(GRAPHQLURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetAllMoviesByUser(
          $email: String!
          $query: String!
        ) {
          getAllMoviesByUser(email: $email, query: $query) {
            film
          }
        }
      `,
      variables: {
        email: user,
        query,
      },
    }),
  });

  try {
    const movies = await data.json();

    const totalItems = movies.data.getAllMoviesByUser.length;

    return totalItems;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of movies.');
  }
}

export async function createNewMovie(newMovie: Partial<Movie>, email: string) {
  noStore();

  const data = await fetch(GRAPHQLURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation CreateMovie($authorEmail: String!, $data: MovieCreateInput!) {
          createMovie(authorEmail: $authorEmail, data: $data) {
            film
            id
          }
        }
      `,
      variables: {
        authorEmail: email,
        data: newMovie,
      },
    }),
  });

  try {
    const movie = await data.json();

    return movie;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create movie.');
  }
}

export async function updateMovieById(mergedData: Partial<Movie>, id: string) {
  noStore();

  const data = await fetch(GRAPHQLURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation UpdateMovie($id: String!, $data: MovieCreateInput!) {
          updateMovie(id: $id, data: $data) {
            film
          }
        }
      `,
      variables: {
        id,
        data: mergedData,
      },
    }),
  });

  try {
    const movie = await data.json();

    return movie;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update movie.');
  }
}

export async function deleteMovieById(id: string) {
  noStore();

  const data = await fetch(GRAPHQLURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation DeleteMovie($id: String!) {
          deleteMovie(id: $id) {
            film
          }
        }
      `,
      variables: {
        id,
      },
    }),
  });

  try {
    const movie = await data.json();

    return movie;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete movie.');
  }
}

export async function fetchCardData(email: string) {
  noStore();

  // console.log('Fetching revenue data...');
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = await fetch(GRAPHQLURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetAllMoviesByUser($query: String!, $email: String!) {
          getAllMoviesByUser(query: $query, email: $email) {
            film
            like
            rating
          }
        }
      `,
      variables: {
        query: '',
        email,
      },
    }),
  });

  try {
    const movies = await data.json();
    const results = movies.data.getAllMoviesByUser;
    const totalWatched = results.length;
    const totalLiked = results.filter((movie: Movie) => movie.like).length;
    const totalRatings = results.reduce(
      (sum: number, movie: Movie) => sum + movie.rating,
      0
    );
    const average = totalRatings / totalWatched;
    const averageRating = average.toFixed(1);

    return { totalWatched, totalLiked, averageRating };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchUserByEmail(email: string) {
  noStore();

  const data = await fetch(GRAPHQLURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetUserByEmail($email: String!) {
          getUserByEmail(email: $email) {
            username
            password
            email
          }
        }
      `,
      variables: {
        email,
      },
    }),
  });

  try {
    const result = await data.json();
    const user = result.data.getUserByEmail;

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchSearchResults(query: string) {
  noStore();

  const data = await fetch(GRAPHQLURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query SearchMovies($query: String!) {
          searchMovies(query: $query) {
            results {
              title
              id
            }
          }
        }
      `,
      variables: {
        query,
      },
    }),
  });

  try {
    const movies = await data.json();
    const results = movies.data.searchMovies.results;

    return results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch search results.');
  }
}

export async function signUpUser(
  username: string,
  email: string,
  password: string
) {
  noStore();

  const data = await fetch(GRAPHQLURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation SignUp($username: String!, $email: String!, $password: String!) {
          signUp(username: $username, email: $email, password: $password)
        }
      `,
      variables: {
        username,
        email,
        password,
      },
    }),
  });

  try {
    const result = await data.json();
    const user = result.data.signUp;

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
