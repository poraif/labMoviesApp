import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  sortByVotes,
} from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { BaseMovieProps } from "../types/interfaces";

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

const sortFiltering = {
  name: "sortOrder",
  value: "desc", 
  condition: () => true, 
  sort: sortByVotes,
};

const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);

  const { filterValues, setFilterValues, filterFunction, sortingFunction } = useFiltering(
    [titleFiltering, genreFiltering, sortFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const updatedFilterSet = filterValues.map(f =>
      f.name === type ? { ...f, value } : f
    );
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const filteredMovies = filterFunction(movies);
  const displayedMovies = sortingFunction(filteredMovies);

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find(f => f.name === "title")?.value || ""}
        genreFilter={filterValues.find(f => f.name === "genre")?.value || "0"}
        sortByVotes={filterValues.find(f => f.name === "sortOrder")?.value || "desc"}
      />
    </>
  );
};

export default HomePage;
