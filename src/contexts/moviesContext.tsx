import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";


interface MovieContextInterface {
    favourites: number[];
    mustWatch: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    addToMustWatch: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    mustWatch: [],
    addToFavourites: () => {},
    addToMustWatch: () => {},
    removeFromFavourites: () => {},
    addReview: (movie, review) => { movie.id, review},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>( [] )
    const [mustWatch, setMustWatch] = useState<number[]>( [] )

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

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                mustWatch,
                addToFavourites,
                addToMustWatch,
                removeFromFavourites,
                addReview,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;