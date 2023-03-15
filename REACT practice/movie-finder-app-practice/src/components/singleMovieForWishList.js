import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "./ContextApi";
const SingleMovieForWishList = ({ item }) => {
  const { title, overview, poster_path, name, id } = item;
  const { list, addToWishList } = useContext(MovieContext);
  const removeFromWishList = (movie) => {
    const data = list.filter((d) => {
      return d.id !== movie.id;
    });
    addToWishList(data);
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
            onClick={() => removeFromWishList(item)}
            className="btn btn-sm btn-info float-right"
          >
            Remove from wishList
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleMovieForWishList;
