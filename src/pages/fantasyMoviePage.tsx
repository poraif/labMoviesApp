import React from "react";
import AddMovieForm from "../components/addMovieForm";
import Accordion from '@mui/material/Accordion';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MoviesContext } from "../contexts/moviesContext";

const styles = {
  gridListRoot: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
  },
  gridListTile: {
      width: 450,
      height: '100vh',
  },
  accordionBox: {
      border: 1,
      borderColor: 'primary.main',
      bgcolor: 'primary.main',
  },
  accordionBoxText: {
      fontSize: 20,
      color: 'white',
  },
  similarButton: {
      textAlign: "center",
      marginTop: 10,
      marginBottom: 10,
  }
};

const FantasyMoviePage: React.FC = () => {
  const { fantasyMovies } = React.useContext(MoviesContext);

  return (
    <>
        <Grid container spacing={5} style={{ padding: "15px" }}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={9}>
            <Accordion>
                <AccordionSummary
                sx={styles.accordionBox}
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                >
                <Typography 
                sx={styles.accordionBoxText}
                >Add a fantasy movie</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <AddMovieForm />
                </AccordionDetails>
            </Accordion>
            <Box sx={{ marginTop: 4 }}>
                        <Typography variant="h4">Fantasy Movies</Typography>
                        {fantasyMovies.length === 0 ? (
                            <Typography variant="h6" sx={{ marginTop: 2 }}>
                                No fantasy movies added yet.
                            </Typography>
                        ) : (
                            <ul>
                                {fantasyMovies.map((movie, index) => (
                                    <li key={index}>
                                        <Typography variant="h6">{movie.title}</Typography>
                                        <Typography variant="body1">{movie.overview}</Typography>
                                        <Typography variant="body2">
                                            Release Date: {movie.release_date}
                                        </Typography>
                                        <Typography variant="body2">
                                            Runtime: {movie.runtime} mins
                                        </Typography>
                                        <Typography variant="body2">
                                            Production Company: {movie.production_company}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};
export default FantasyMoviePage;

