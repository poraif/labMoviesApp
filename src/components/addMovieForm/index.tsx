import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import { FantasyMovieForm } from "../../types/interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import GenreCheckbox from "./genreCheckbox";

const AddMovieForm: React.FC = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<FantasyMovieForm>({
        defaultValues: {
            title: "Titanic 2: Reckoning",
            overview: "This is where you describe the storyline or other details of your movie",
            genre_ids: [],
            release_date: "1922-03-04",
            runtime: 180,
            production_company: "Peadar Productions",
        }
    });

    const navigate = useNavigate();
    const { addFantasyMovie } = useContext(MoviesContext);
    const [open, setOpen] = useState(false);

    const handleSnackClose = () => {
        setOpen(false);
        navigate("/fantasymovies");
    };

    const onSubmit: SubmitHandler<FantasyMovieForm> = (formData) => {
        addFantasyMovie(formData);
        setOpen(true);
    };

    return (
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">
                Add a fantasy movie
            </Typography>
            <Snackbar
                sx={styles.snack}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={handleSnackClose}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={handleSnackClose}
                >
                    <Typography variant="h4">
                        Fantasy movie submitted
                    </Typography>
                </Alert>
            </Snackbar>
            <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="title"
                    control={control}
                    rules={{ required: "Title is required" }}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "100%" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="title"
                            label="Name of movie"
                            autoFocus
                        />
                    )}
                />
                {errors.title && (
                    <Typography variant="h6" component="p">
                        {errors.title.message}
                    </Typography>
                )}
                <Controller
                    name="overview"
                    control={control}
                    rules={{
                        required: "Overview is required",
                        minLength: { value: 10, message: "Overview must be at least 10 characters." },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={value}
                            onChange={onChange}
                            label="Overview"
                            id="overview"
                            multiline
                            minRows={10}
                        />
                    )}
                />
                {errors.overview && (
                    <Typography variant="h6" component="p">
                        {errors.overview.message}
                    </Typography>
                )}
                <Controller
                    name="genre_ids"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <GenreCheckbox selectedGenres={value} onChange={onChange} />
                    )}
                />
                <Controller
                    name="release_date"
                    control={control}
                    rules={{
                        required: "Release date is required",
                        pattern: {
                            value: /\d{4}-\d{2}-\d{2}/,
                            message: "Release date must be in YYYY-MM-DD format"
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "100%" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="release_date"
                            label="Release Date"
                            autoFocus
                        />
                    )}
                />
                {errors.release_date && (
                    <Typography variant="h6" component="p">
                        {errors.release_date.message}
                    </Typography>
                )}
                <Controller
                    name="runtime"
                    control={control}
                    rules={{
                        required: "Runtime is required",
                        min: { value: 0, message: "Runtime must be a positive number" }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            id="runtime"
                            value={value}
                            onChange={onChange}
                            required
                            label="Runtime (mins)"
                            type="number"
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: "100%" }}
                            variant="outlined"
                            margin="normal"
                        />
                    )}
                />
                {errors.runtime && (
                    <Typography variant="h6" component="p">
                        {errors.runtime.message}
                    </Typography>
                )}
                <Controller
                    name="production_company"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "100%" }}
                            variant="outlined"
                            margin="normal"
                            onChange={onChange}
                            value={value}
                            id="production_company"
                            label="Production Company"
                            autoFocus
                        />
                    )}
                />
                <Box >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={styles.submit}
                    >
                        Submit
                    </Button>
                    <Button
                        type="reset"
                        variant="contained"
                        color="secondary"
                        sx={styles.submit}
                        onClick={() => {
                            reset({
                                title: "",
                                overview: "",
                                genre_ids: [],
                                release_date: "",
                                runtime: 0,
                                production_company: "",
                            });
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddMovieForm;
