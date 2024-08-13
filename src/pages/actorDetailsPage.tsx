import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { getActorDetails } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { ActorProps } from "../types/interfaces";
import img from "../images/actor-placeholder.png";

const ActorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: actor, error, isLoading, isError } = useQuery<ActorProps, Error>(
      ["actor", id],
      () => getActorDetails(id || "")
  );
  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {/* Left Column - Profile Image */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="500"
            image={actor?.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : img}
            alt={actor?.name}
          />
        </Card>
      </Grid>
      {/* Right Column - Actor Information */}
      <Grid item xs={12} sm={8}>
        <Stack spacing={2}>
          <Typography variant="h4">{actor?.name}</Typography>
      
          <Typography variant="h6">Biography:</Typography>
          <Typography>{actor?.biography || 'N/A'}</Typography>
          
          <Typography variant="h6">Birthday:</Typography>
          <Typography>{actor?.birthday || 'N/A'}</Typography>
          
          <Typography variant="h6">Deathday:</Typography>
          <Typography>{actor?.deathday || 'N/A'}</Typography>
          
          <Typography variant="h6">Gender:</Typography>
          <Typography>{actor?.gender === 1 ? 'Female' : 'Male' || 'N/A'}</Typography>
          
          <Typography variant="h6">Place of Birth:</Typography>
          <Typography>{actor?.place_of_birth || 'N/A'}</Typography>
          
          <Typography variant="h6">Popularity:</Typography>
          <Typography>{actor?.popularity?.toFixed(2) || 'N/A'}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ActorDetailsPage;
