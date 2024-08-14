import React, { useState } from "react";
import FilterMoviesCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps } from "../../types/interfaces";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
    const genreId = Number(value);
    const genreIds = movie.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

export const sortByVotes = (a: BaseMovieProps, b: BaseMovieProps, order: string) => {
    return order === "asc" ? a.vote_average - b.vote_average : b.vote_average - a.vote_average;
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    sortByVotes: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter, sortByVotes }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterMoviesCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          sortByVotes={sortByVotes}
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;
