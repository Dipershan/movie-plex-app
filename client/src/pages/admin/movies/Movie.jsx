import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getMovie, updateMovie, updateSeats } from "../../../slices/movieSlice";

const Movie = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieId = pathname.split("/")[3];

  const { movie } = useSelector((state) => state.movies);

  const [payload, setPayload] = useState({
    title: movie?.title || "",
    seats: movie?.seats || "",    
  });

  const [seatsPayload, setSeatsPayload] = useState({
    seats: movie?.seats || "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating movie with payload:", payload);
    dispatch(updateMovie({ id: movieId, payload }));
    navigate("/admin/movies");
  };

  const handleUpdateSeats = async (e) => {
    e.preventDefault();
    console.log("Updating seats with payload:", seatsPayload);
    dispatch(updateSeats({ id: movieId, seats: seatsPayload.seats }));
    navigate("/admin/movies");
  };

  useEffect(() => {
    dispatch(getMovie(movieId));
  }, [dispatch, movieId]);

  useEffect(() => {
    setPayload({
      title: movie?.title || "",      
      seats: movie?.seats || "",            
    });
    setSeatsPayload({
      seats: movie?.seats || "",
    });
  }, [movie]);

  return (
    <div>
      <div className="container">
        <div className="py-5 text-center">
          <h2>Movie Details</h2>
        </div>
        <div className="row">
          <div className="col-md-8 order-md-1">
            <form className="needs-validation" onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={payload.title}
                    onChange={(e) => {
                      setPayload((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));
                    }}
                    required
                  />
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Save
              </button>
            </form>
            <hr className="mb-4" />
            <form className="needs-validation" onSubmit={handleUpdateSeats}>
              <div className="col-md-12 mb-3">
                <label>Seats</label>
                <input
                  type="number"
                  className="form-control"
                  value={seatsPayload.seats}
                  onChange={(e) => {
                    setSeatsPayload({
                      seats: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Update Seats
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
