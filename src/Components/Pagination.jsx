import React from "react";

import "../Components/style.css";

function Pagination(props) {
  let { articlesCount, articlesPerPage, activePage, updateCurrentPageIndex } =
    props;
  console.log(articlesCount, articlesPerPage);
  let numberOfPages = Math.ceil(articlesCount / articlesPerPage);
  // console.log(numberOfPages);
  let pagesArray = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pagesArray.push(i);
  }
  return (
    <div>
      <div className="prev">
        <p
          onClick={() =>
            updateCurrentPageIndex(activePage - 1 < 1 ? 1 : activePage - 1)
          }
        >
          Prev
        </p>
      </div>
      <div className="pagination-count">
        {pagesArray.map((page) => {
          console.log(page);
          return (
            <span
              key={page}
              onClick={() => updateCurrentPageIndex(page)}
              className={`${activePage === page ? "active pages" : ""}`}
            >
              {page}
            </span>
          );
        })}
      </div>
      <div className="next">
        <p
          onClick={() =>
            updateCurrentPageIndex(
              activePage + 1 > numberOfPages ? numberOfPages : activePage + 1
            )
          }
        >
          Next
        </p>
      </div>
    </div>
  );
}

export default Pagination;
