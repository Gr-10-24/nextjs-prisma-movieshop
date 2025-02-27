const API_KEY = process.env.API_KEY;
//const API_KEY = "9d93513a5360eeddedf357629119d2ab";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  trailer_url: string | null;
}

interface MovieApiResponse {
  results: Array<{
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
  }>;
}

// export async function fetchMovies(): Promise<Movie[] | null> {
//   const totalMovies = 100;
//   let allMovies: Movie[] = [];
//   let page = 1;
//   const moviesPerPage = 20;
//   const totalPages = Math.ceil(totalMovies / moviesPerPage);

//   try {
//     while (allMovies.length < totalMovies && page <= totalPages) {
//       const response = await fetch(
//         `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
//       );

//       if (!response.ok) {
//         console.log(`Error fetching data: ${response.statusText}`);
//       } else {
//         const data: MovieApiResponse = await response.json();

//         const moviesWithImagesAndTrailers = await Promise.all(
//           data.results.map(async (movie) => {
//             const imageData = {
//               poster_path: movie.poster_path
//                 ? `${IMAGE_BASE_URL}${movie.poster_path}`
//                 : null,
//               backdrop_path: movie.backdrop_path
//                 ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
//                 : null,
//             };

//             const trailerData = await fetchTrailers(movie.id);

//             return {
//               id: movie.id,
//               title: movie.title,
//               poster_path: imageData.poster_path,
//               backdrop_path: imageData.backdrop_path,
//               overview: movie.overview,
//               release_date: movie.release_date,
//               trailer_url: trailerData,
//             };
//           })
//         );
//         allMovies = [...allMovies, ...moviesWithImagesAndTrailers];
//       }

//       page++;
//     }

//     return allMovies.slice(0, totalMovies);
//   } catch (error) {
//     console.error("Error fetching movie data:", error);
//     return null;
//   }
// }

export async function fetchMovies(
  totalMovies = 10000
): Promise<Movie[] | null> {
  console.log(API_KEY);
  let allMovies: Movie[] = [];
  let page = 1;
  const moviesPerPage = 20;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  try {
    while (allMovies.length < totalMovies && page <= totalPages) {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data: MovieApiResponse = await response.json();

      const moviesWithImagesAndTrailers = await Promise.all(
        data.results.map(async (movie) => {
          const imageData = {
            poster_path: movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : null,
            backdrop_path: movie.backdrop_path
              ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
              : null,
          };

          const trailerData = await fetchTrailers(movie.id);

          return {
            id: movie.id,
            title: movie.title,
            poster_path: imageData.poster_path,
            backdrop_path: imageData.backdrop_path,
            overview: movie.overview,
            release_date: movie.release_date,
            trailer_url: trailerData,
          };
        })
      );

      allMovies = [...allMovies, ...moviesWithImagesAndTrailers];
      page++;
    }

    return allMovies.slice(0, totalMovies);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

export async function testTony() {
  const hold = await fetchMovies();
  console.log(hold);
}

async function fetchTrailers(movieId: number): Promise<string | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching trailer: ${response.statusText}`);
    }

    const data = await response.json();
    const trailer = data.results.find(
      (video: { type: string; key: string }) => video.type === "Trailer"
    );
    return trailer ? `http://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
}
