import React from "react";
import CastMember from "../castMemberCard/";
import Grid from "@mui/material/Grid";
import { BaseCastListProps } from "../../types/interfaces";

const CastList: React.FC<BaseCastListProps> = ({ castMembers, action }) => {
    const castCards = castMembers.map((m) => (
      <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <CastMember cast={m} action={action} />
      </Grid>
    ));
  
    return (
      <Grid container spacing={2}>
        {castCards}
      </Grid>
    );
  };

  export default CastList;