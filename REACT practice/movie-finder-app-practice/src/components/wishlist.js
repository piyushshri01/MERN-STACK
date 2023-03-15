import { useContext } from "react";
import { MovieContext } from "./ContextApi";
import SingleMovieForWishList from "./singleMovieForWishList";
const WishList = () => {
  const { list } = useContext(MovieContext);
  return (
    <div>
      {list.length === 0 ? (
        <h1>There is no data in wishlist </h1>
      ) : (
        <div className="container">
          <div className="row">
            {list &&
              list.map((item, key) => (
                <SingleMovieForWishList item={item} key={key} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
