import React from "react";
import { useParams } from "react-router-dom";
import { getMovie } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { getMovieCredits } from "../../api/tmdb-api";
import { BaseCastMemberProps } from "../../types/interfaces";


const ActorDetailsPage: React.FC= () => {
    const { id } = useParams();
    const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
      ["movie", id],
      ()=> getMovie(id||"")
    );
  
  
    if (isLoading) {
      return <Spinner />;
    }
  
    if (isError) {
      return <h1>{(error as Error).message}</h1>;
    }
  
    return (
      <>
        {movie ? (
          <>
          <PageTemplate movie={movie}> 
            <MovieDetails {...movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
      </>
    );
  };
  
  export default ActorDetailsPage;