# React App Assignment

###### Full Stack Development 2, HDip in Computer Science

__Name:__ Peadar O Raifeartaigh

__Video Demo:__ https://youtu.be/rsyW5rTiPYE

This repository contains an implementation of the Movie Fans Web Application using the React library. 

### Features

+ Upcoming movies view
+ Cast list, with link to more details for actor within movie details page
+ View similar movies within movie details
+ Sort movies by vote count (descending/ascending)
+ Add a fantasy movie and view list of added movies

### Setup requirements.

No additional setup steps required.

### API endpoints

   + /movie/upcoming - list of upcoming movies
   + /movie/{id}/similar - list of movies similar to selected movie
   + /movie/{id}/credits - get the list of actor credits for the movie
   + /person{id} - get the details of the chosen actor


### Routing

+ /movies/upcoming - list display of upcoming movies, UpcomingMoviesPage
+ /movies/:id/similar - display of movies similar to selected movie, SimilarMoviesPage
+ /actors/:id - details page for individual actors, ActorDetailsPage
+ /fantasymovies - form for creating fantasy movie, list of created fantasy movies, FantasyMoviePage 


### Third Party Components/Integration

None (to be included in future updates)