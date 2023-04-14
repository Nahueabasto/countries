import React from "react";
import "./Pagination.css";

export default function Paginado({ countriesPerPage, allCountries, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries.length / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <span key={number} className="pagination-number" onClick={() => paginate(number)}>
          {number}
        </span>
        ))}
      </ul>
    </nav>
  );
}
