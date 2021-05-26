import ReactPaginate from "react-paginate";
import { Pagination as muiPagination} from '@material-ui/lab';

const Pagination = ({ totalRestaurants, restaurantsPerPage, setCurrPage, newSearch }) => {
  return (
    <div>
      {/* <ReactPaginate
        pageCount = { (Math.ceil(totalRestaurants / restaurantsPerPage)) }
        pageRangeDisplayed = {10}
        marginPagesDisplayed = {1}
        onPageChange = {({ selected }) => { newSearch = false; setCurrPage(selected + 1) }}
      /> */}
      <muiPagination 
        count = { (Math.ceil(totalRestaurants / restaurantsPerPage)) }
        color = "secondary"
        siblingCount={2}
      />
    </div>
  );

}

export default Pagination;
