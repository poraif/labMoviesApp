import React from "react";
import CastMember from "../castMemberCard/";
import Grid from "@mui/material/Grid";
import { BaseCastListProps } from "../../types/interfaces";

const CastList: React.FC<BaseCastListProps> = ({castMembers, action}) => {
    // eslint-disable-next-line prefer-const
  let castCards = castMembers.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
       <CastMember key={m.id} cast={m} action={action}/>
    </Grid>
  ));
  return castCards;
}

  export default CastList;