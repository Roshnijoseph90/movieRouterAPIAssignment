const express = require('express')
const router = express.Router()
const movies = require('../movies')


router.get('/',(req,res)=>{
    try{
     res.status(200).json(movies)
  
    }catch(error){
      res.status(404).json({error:"movies not found"})
  
    }
  })
  
  router.get('/:id',(req,res)=>{
     try{
         const movieID = parseInt(req.params.id)
         
         const movie = movies.find(movie=>movie.id === movieID)
         if(!movie){
           res.status(404).json({error:"movies not found"})
         }
         res.status(200).json(movie)
  
     }catch(error){
        res.status(404).json({error:error.message})
  
     }
  })
  router.post('/',(req,res)=>{
    try {
      if (!req.body){
         return res.status(400).json({ message: "title,genre,releaese data and rating  are required" });
      }
      const { title,genre, releaseYear,rating } = req.body;
      if (!title|| !genre || !releaseYear||!rating) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newMovie = {
        id: movies.length ? movies[movies.length - 1].id + 1 : 1,
        title,genre,releaseYear,rating
        
      };
  
      movies.push(newMovie);
      res.status(201).json({ message: "Movies added successfully", movie: newMovie });
    } catch (error) {
      res.status(404).json({ error: error });
    }
  });

  
  router.patch('/:id', (req, res) => {
    try {
        const movieID = parseInt(req.params.id, 10);
        const { rating } = req.body;
        console.log(`Received PATCH request for movie ID: ${movieID}, new rating: ${rating}`);

        const movie = movies.find(m => m.id === movieID);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (!rating) {
            return res.status(400).json({ message: 'Rating is required to update' });
        }

        movie.rating = rating;
        res.status(200).json(movie);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});
   
 
   

 router.delete('/:id', (req, res) => {
    try {
      const movieID = parseInt(req.params.id);
      const movieIndex = movies.findIndex(movie => movie.id === movieID);
      if (movieIndex === -1) {
        return res.status(404).json({ error: "movie not found" });
      }
      const deleteMovie = movies.splice(movieIndex, 1);
      return res.status(200).json({ message: "Deleted movie", movie:deleteMovie });
    } catch (error) {
      res.status(404).json({ error: error });
    }
  })
  
  module.exports = router;
  

  
  
  
