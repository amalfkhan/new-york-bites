import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalRestaurants, restaurantsPerPage, setCurrPage, newSearch }) => {
  return (
    <div>
      <ReactPaginate
        pageCount = { (Math.ceil(totalRestaurants / restaurantsPerPage)) }
        pageRangeDisplayed = {10}
        marginPagesDisplayed = {1}
        onPageChange = {({ selected }) => { newSearch = false; setCurrPage(selected + 1) }}
      />
    </div>
  );

}

export default Pagination;
