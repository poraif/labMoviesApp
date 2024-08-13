import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import img from '../../images/actor-placeholder.png';
import { BaseCastMemberProps } from "../../types/interfaces"; 
import { Link } from "react-router-dom";

const styles = {
  card: { maxWidth: 300 },
  media: { height: 300 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface CastCardProps {
    cast: BaseCastMemberProps;
    action?: (m: BaseCastMemberProps) => React.ReactNode;
}

const CastMemberCard: React.FC<CastCardProps> = ({cast, action}) => {


    return (
        <Card sx={styles.card}>
          <CardMedia
            sx={styles.media}
            image={
              cast.profile_path
                ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                : img
            }
          />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {cast.name}{" "}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {cast.character}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/actors/${cast.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More details
          </Button>
        </Link>
        {action && action(cast)}
      </CardActions>
        </Card>
      );
    }

export default CastMemberCard;