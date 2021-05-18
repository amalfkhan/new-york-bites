import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';

const Pagination = ({ totalRestaurants, restaurantsPerPage, setCurrPage }) => {
  return (
    <div>
      <ReactPaginate
        pageCount = { (Math.ceil(totalRestaurants / restaurantsPerPage)) }
        pageRangeDisplayed = {5}
        marginPagesDisplayed = {1}
        onPageChange = {({ selected }) => { setCurrPage(selected + 1) }}
      />
    </div>
  );

}

export default Pagination;
