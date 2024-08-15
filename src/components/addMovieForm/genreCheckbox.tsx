import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'; 

interface GenreCheckboxProps {
    selectedGenres: number[];
    onChange: (selected: number[]) => void;
}

const GenreCheckbox: React.FC<GenreCheckboxProps> = ({ selectedGenres, onChange })  => {
    const genres = [
        { label: "Action", value: 28 },
        { label: "Adventure", value: 12 },
        { label: "Animation", value: 16 },
        { label: "Comedy", value: 35 },
        { label: "Crime", value: 80 },
        { label: "Documentary", value: 99 },
        { label: "Drama", value: 18 },
        { label: "Family", value: 10751 },
        { label: "Fantasy", value: 14 },
        { label: "History", value: 36 },
        { label: "Horror", value: 27 },
        { label: "Music", value: 10402 },
        { label: "Mystery", value: 9648 },
        { label: "Romance", value: 10749 },
        { label: "Science Fiction", value: 878 },
        { label: "TV Movie", value: 10770 },
        { label: "Thriller", value: 53 },
        { label: "War", value: 10752 },
        { label: "Western", value: 37 },
    ];

    const handleCheckboxChange = (value: number) => {
        const currentIndex = selectedGenres.indexOf(value);
        const newChecked = [...selectedGenres];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        onChange(newChecked);
    };

    return (
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                {genres.map((genre) => (
                    <FormControlLabel
                        key={genre.value}
                        control={
                            <Checkbox
                                checked={selectedGenres.includes(genre.value)}
                                onChange={() => handleCheckboxChange(genre.value)}
                            />
                        }
                        label={genre.label}
                        labelPlacement="top"
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
};
export default GenreCheckbox;