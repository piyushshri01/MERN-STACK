import SingleMovie from "./SingleMovie";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "./ContextApi";

const Movies = ({ value }) => {
  const { data } = useContext(MovieContext);
  const PageSize = 5;
  const totalPage = Math.ceil(data.length) / PageSize;
  let pageArr = [];
  for (let i = 1; i <= totalPage; i++) {
    pageArr.push(i);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const page = currentPage;
  const firstPageIndex = (page - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const list = data.slice(firstPageIndex, lastPageIndex);
  const sethandlerPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          {list &&
            list.map((item, key) => <SingleMovie item={item} key={key} />)}
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageArr &&
            pageArr.map((key) => {
              return (
                <li key={`${key}`} className={"page-item"}>
                  <Link
                    key={`${key}`}
                    className={
                      key === currentPage
                        ? `${key} page-link active`
                        : `${key} page-link`
                    }
                    onClick={() => sethandlerPage(key)}
                  >
                    {key}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
};

export default Movies;
