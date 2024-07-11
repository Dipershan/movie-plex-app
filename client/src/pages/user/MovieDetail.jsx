import {useEffect ,  useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useMovies } from '../../hooks/useMovies';

const MovieDetail = () => {
  
  const { pathname } = useLocation();
  const { movie, getBySlug } = useMovies();

  useEffect(() => {
    const movie = pathname.split("/")[2];
    getBySlug(movie);
  }, [pathname, getBySlug]);

  return <div>{movie?.data? JSON.stringify(movie.data) : <>No Movie Found</>} </div>
  
}

export default MovieDetail