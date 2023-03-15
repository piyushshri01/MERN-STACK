import "./movieDetails.css";
import { useContext } from "react";
import { MovieContext } from "./ContextApi";
const MovieDetails = () => {
  const { data } = useContext(MovieContext);
  console.log(data);
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src="https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg"
        alt="Interstellar"
      />
      <div className="card-body">
        <h4 className="card-title">Interstellar (2014)</h4>

        <div className="container">
          <div className="row">
            <div className="col-sm-4 metadata">
              <i className="fa fa-star" aria-hidden="true"></i>
              <p>9.5/10</p>
            </div>
            <div className="col-sm-8 metadata">Adventure. Sci-Fi</div>
          </div>
        </div>

        <p className="card-text">
          In Earth's future, a global crop blight and second Dust Bowl are
          slowly rendering the planet uninhabitable.
        </p>
        <a
          className="trailer-preview"
          href="https://youtu.be/ePbKGoIGAXY"
          target="new"
        >
          <i className="fa fa-play" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default MovieDetails;
