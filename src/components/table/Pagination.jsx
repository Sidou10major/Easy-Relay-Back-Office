import React from "react";
import ArrowLeft from "../../svgs/ArrowLeft";
import ArrowRight from "../../svgs/ArrowRight";
import Button from "@mui/material/Button";
function Pagination({
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  gotoPage,
  pageIndex,
  pages,
  pageCount,
}) {
  return (
    <div className="pagination_wrapper">
      <Button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="page_btn"
      >
        <ArrowLeft />
      </Button>
      {pageCount < 10 &&
        pages.map((val, index) => {
          return (
            <Button
              key={index}
              value={val}
              onClick={() => gotoPage(index)}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className={
                index === pageIndex
                  ? "page_btn !bg-[rgba(223,208,242)]"
                  : "page_btn"
              }
            >
              {val}
            </Button>
          );
        })}
      {pageCount >= 10 && (
        <>
          <Button
            varient="outlined"
            onClick={() => gotoPage(0)}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className={
              0 === pageIndex ? "page_btn !bg-[rgba(223,208,242)]" : "page_btn"
            }
          >
            {1}
          </Button>
          <Button
            onClick={() => gotoPage(1)}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className={
              1 === pageIndex ? "page_btn !bg-[rgba(223,208,242)]" : "page_btn"
            }
          >
            {2}
          </Button>
          <button className="page_btn">{"..."}</button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className={
              pageCount - 1 === pageIndex
                ? "page_btn !bg-[rgba(223,208,242)]"
                : "page_btn"
            }
          >
            {pageCount}
          </Button>
        </>
      )}
      <Button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        className="page_btn"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}

export default Pagination;
