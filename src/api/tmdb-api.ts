export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
  };

export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&sort_by=primary_release_date.desc&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch upcoming movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

// export const getIrishCertifications = () => {
//   return fetch(`https://api.themoviedb.org/3/certification/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`)
//     .then((response) => {
//       if (!response.ok)
//         throw new Error(`Unable to fetch certifications. Response status: ${response.status}`);
//       return response.json();
//     })
//     .then((data) => {
//       const irishCertifications = data.certifications.IE;
//       return irishCertifications;
//     })
//     .catch((error) => {
//       throw error;
//     });
// };


// export const filterByCertification = (certification: string) => {
//   return fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&certification_country=IE&include_adult=false&certification=${certification}&sort_by=popularity.desc`
//   ).then((response) => {
//     if (!response.ok)
//       throw new Error(`Unable to fetch movies after certification change. Response status: ${response.status}`);
//     return response.json();
//   })
//     .catch((error) => {
//       throw error
//     });
// }


export const getPopularMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&primary_release_date.gte=2024-01-01&&include_adult=false&sort_by=popularity.desc&vote_average.gte=7&vote_average.lte=10&vote_count.gte=100&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch popular movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getSimilarMovies = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch similar movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};
  
  export const getMovie = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get movie data. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
  };

  export const getMovieCredits = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to get movie credits. Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => json.cast)
      .catch((error) => {
        throw error;
      });
  };

  export const getActorDetails = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get actor details. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
  };
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };

  export const getMovieReviews = (id: string | number) => { //movie id can be string or number
      return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
      )
        .then((res) => res.json())
        .then((json) => {
          // console.log(json.results);
          return json.results;
        });
      };
