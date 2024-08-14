import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { BaseMovieProps } from "../types/interfaces";
import { useParams } from "react-router-dom";
import { getSimilarMovies } from "../api/tmdb-api";
import { getMovie } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { DiscoverMovies } from "../types/interfaces";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
  } from "../components/movieFilterUI";

  const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
  };
  const genreFiltering = {
    name: "genre",
    value: "0",
    condition: genreFilter,
  };
  
const SimilarMoviesPage: React.FC = () => {

    const { id } = useParams();

    const { data: movie } = useQuery<BaseMovieProps, Error>(
        ["movieDetails", id],
        () => getMovie(id || "")
      );

    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
      ["movie", id],
      ()=> getSimilarMovies(id||"")
    );

    const { filterValues, setFilterValues, filterFunction } = useFiltering(
      [titleFiltering, genreFiltering]
    );
  
    if (isLoading) {
      return <Spinner />;
    }
  
    if (isError) {
      return <h1>{error.message}</h1>;
    }
  
  
    const changeFilterValues = (type: string, value: string) => {
      const changedFilter = { name: type, value: value };
      const updatedFilterSet =
        type === "title"
          ? [changedFilter, filterValues[1]]
          : [filterValues[0], changedFilter];
      setFilterValues(updatedFilterSet);
    };
  
    const movies = data ? data.results : [];
    const displayedMovies = filterFunction(movies);
  
    return (
      <>
        <PageTemplate
          title={`Movies similar to ${movie?.title}`}
          movies={displayedMovies}
          action={(movie: BaseMovieProps) => {
            return <AddToMustWatchIcon {...movie} />
            }}
        />
        <MovieFilterUI
          onFilterValuesChange={changeFilterValues}
          titleFilter={filterValues[0].value}
          genreFilter={filterValues[1].value}
        />
      </>
    );
  };
    export default SimilarMoviesPage;