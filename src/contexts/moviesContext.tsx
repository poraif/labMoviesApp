import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review, FantasyMovieForm } from "../types/interfaces";
import { v4 as uuidv4 } from 'uuid';


interface MovieContextInterface {
    favourites: number[];
    mustWatch: number[];
    fantasyMovies: FantasyMovieForm[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    addToMustWatch: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);
    addFantasyMovie: ((formData: FantasyMovieForm ) => void);
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    mustWatch: [],
    fantasyMovies: [],
    addToFavourites: () => {},
    addToMustWatch: () => {},
    removeFromFavourites: () => {},
    addReview: (movie, review) => { movie.id, review},
    addFantasyMovie: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);
    const [fantasyMovies, setFantasyMovies] = useState<FantasyMovieForm[]>([]);

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const addToMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prevMustWatch) => {
          if (!prevMustWatch.includes(movie.id)) {
            const updatedMustWatch = [...prevMustWatch, movie.id];
            console.log('Updated mustWatch list: ', updatedMustWatch);
            return updatedMustWatch;
          }
          return prevMustWatch;
        });
      }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };
    
      // function to add fantasy movie based on the user's inputted data, id generated with uuid
      const addFantasyMovie = useCallback((formData: FantasyMovieForm) => {
        const newMovie: FantasyMovieForm = {
            ...formData,
            id: uuidv4(),
        };
        setFantasyMovies((prevFantasyMovies) => [...prevFantasyMovies, newMovie]);
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                mustWatch,
                fantasyMovies,
                addToFavourites,
                addToMustWatch,
                removeFromFavourites,
                addReview,
                addFantasyMovie,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;