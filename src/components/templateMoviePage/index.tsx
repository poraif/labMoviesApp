import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Accordion from "@mui/material/Accordion";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { getMovieImages, getMovieCredits } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps, BaseCastMemberProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import CastList from "../castList";
import { Typography } from "@mui/material";

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

interface TemplateMoviePageProps {
    movie: MovieDetailsProps;
    children: React.ReactElement;
}


const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({movie, children}) => {
    const { data: imagesData, error: imagesError, isLoading: imagesLoading, isError: imagesIsError } = useQuery<MovieImage[], Error>(
        ["images", movie.id],
        () => getMovieImages(movie.id)
    );
    
    const { data: creditsData, error: creditsError, isLoading: creditsLoading, isError: creditsIsError } = useQuery<BaseCastMemberProps[], Error>(
        ["credits", movie.id],
        () => getMovieCredits(movie.id)                                                                 
    );

    if (imagesLoading || creditsLoading) {
        return <Spinner />;
    }

    if (imagesIsError) {
        return <h1>{(imagesError
               
        ).message}</h1>;
    }

    if (creditsIsError) {
        return <h1>{(creditsError

        ).message}</h1>;
    }

    console.log('Images Data:', imagesData);
    console.log('Credits Data:', creditsData);
                                               
    const images = imagesData as MovieImage[];
    const credits = creditsData as BaseCastMemberProps[];

    return (
        <>
            <MovieHeader {...movie} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            {images.map((image: MovieImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={'Image alternative'}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>
                <Grid item xs={9}>
                {children}
                <Stack 
                direction="column" 
                spacing={2}
                justifyContent="center"
                alignItems="center"
                 >
                <Button 
                    sx={styles.similarButton}
                    variant="contained"
                    color="success"
                    href={`/movies/${movie.id}/similar`}
                >
                    View similar movies
                </Button>
                </Stack>
                <Accordion>
                    <AccordionSummary
                    sx={styles.accordionBox}
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography 
                    sx={styles.accordionBoxText}
                    >Cast Members</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <CastList castMembers={credits} />
                    </AccordionDetails>
                </Accordion>
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;