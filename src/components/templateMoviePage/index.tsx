import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages, getMovieCredits } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps, BaseCastMemberProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import CastList from "../castList";

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
                <CastList castMembers={credits} />
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;