import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "./ContextApi";
const SingleMovie = ({ item }) => {
  const { title, overview, poster_path, name, id } = item;

  const { list, addToWishList } = useContext(MovieContext);
  const addMovieInWishList = (movie) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === movie.id) {
        return;
      }
    }
    const wishList = [movie, ...list];
    addToWishList(wishList);
  };

  return (
    <div className="col-md-4">
      <div className="card bg-light">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt="Card  cap"
        />
        <div className="card-body ">
          <h5 className="card-title border-bottom pb-3">{title || name}</h5>
          <p className="card-text">{overview.slice(0, 50)}</p>
          <Link to={`/Movie/${id}`} className="btn btn-sm btn-info float-right">
            Know More
          </Link>
          <Link
            onClick={() => addMovieInWishList(item)}
            className="btn btn-sm btn-info float-right"
          >
            Add to wishList
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
