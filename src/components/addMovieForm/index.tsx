import React, { useContext, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import { FantasyMovieProps, FantasyMovieForm } from "../../types/interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// export default function SimpleDatePicker() {
//     return (
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker defaultValue={dayjs('2022-04-17')} />
//       </LocalizationProvider>
//     );
//   }

const AddMovieForm: React.FC<FantasyMovieProps> = (movie) => {
    const defaultValues = {
        title: "Nosferatu",
        overview: "Nosferatu is a silent horror film that tells the story of Count Orlok, a vampire who brings terror and death to a small town while a young man tries to stop him.",
        genre_ids: [18, 27],
        release_date: "1922-03-04",
        runtime: 0,
        production_companies: "",
    };
    
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<FantasyMovieForm>({ defaultValues });

    const navigate = useNavigate();
    const context = useContext(MoviesContext);
    const [open, setOpen] = useState(false);


    const handleSnackClose = () => {
        setOpen(false);
        navigate("/fantasymovies");
    };

    const onSubmit: SubmitHandler<FantasyMovieForm> = (formData) => {
        context.addFantasyMovie(formData);
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
                        Thank you for submitting a review
                    </Typography>
                </Alert>
            </Snackbar>
            <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="author"
                    control={control}
                    rules={{ required: "Name is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="author"
                            label="Author's name"
                            autoFocus
                        />
                    )}
                />
                {errors.author && (
                    <Typography variant="h6" component="p">
                        {errors.author.message}
                    </Typography>
                )}
                <Controller
                    name="content"
                    control={control}
                    rules={{
                        required: "Review cannot be empty.",
                        minLength: { value: 10, message: "Review is too short" },
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={value}
                            onChange={onChange}
                            label="Review text"
                            id="review"
                            multiline
                            minRows={10}
                        />
                    )}
                />
                {errors.content && (
                    <Typography variant="h6" component="p">
                        {errors.content.message}
                    </Typography>
                )}
                <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="select-rating"
                            select
                            variant="outlined"
                            label="Rating Select"
                            value={rating}
                            onChange={handleRatingChange}
                            helperText="Don't forget your rating"
                        >
                            {ratings.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
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
                                author: "",
                                content: "",
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
