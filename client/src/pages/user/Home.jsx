import { useState, useEffect } from "react";
import { IoIosBasket } from "react-icons/io";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom"
import { useMovies } from "../../hooks/useMovies";


import "./Home.css";

const Home = () => {

  const [limit , setLimit] =useState(20);
  const [page ,  setPage] = useState(1);
  const [title ,  setTitle] =  useState("");


  const {data  , error ,  msg ,  loading ,  getAllMovies } = useMovies();

  // const getFeaturedMovies = ()=>{
  // return  data?.data?.movies[0] || {};
    
  // }


  useEffect(()=>{
    getAllMovies({limit , page, title});
  },[ limit ,  page ,title,   getAllMovies]);
  return  (
   <>

    <div className="container">

    <div className="row">
      <div className="col-md-3">
      <Form.Label >Search Movie By Title</Form.Label>
      <Form.Control onChange={(e)=>setTitle(e.target.value)}/>
      </div>
    </div>

    </div>
   
   <div className="album py-5 bg-body-tertiary">
    <div className="container">

      <div className="row">
        {data?.data?.movies.length > 0 ? 
          (data.data.movies.map((movie) => {
              return(
                <div key={movie?.slug} className="col-md-3">
                <div className="card shadow-sm">
                 <img src={movie?.poster}/>
                  <div className="card-body">
                  <h5 className="card-title">
                     {movie?.title}
                    </h5>
                    <p className="card-text">
                      {movie?.synopsis.substring(0 ,90).concat("...")}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-primary">
                        <IoIosBasket />
                        </button>
                        <Link to={`/movies/${movie?.slug}` }>
                        <button type="button" className="btn btn-sm btn-outline-danger">
                          Buy Now
                        </button>
                        </Link>
                      </div>
                      <small className="text-body-secondary">{movie?.duration}</small>
                    </div>
                  </div>
                </div>
              </div>
      
              )
           })
          ) :(
          <>No movies</>
        )
      
      }


    
      </div>
    </div>
  </div>
   </>
  )
  
}

export default Home;