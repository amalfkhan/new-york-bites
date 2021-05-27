// component to display correct number of pages available based on total restaurant count
// updates current page on change so new data is fetched from the database

import { Pagination as MuiPagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    margin: "60px 0px",
  },
});

const Pagination = ({
  totalRestaurants,
  restaurantsPerPage,
  setCurrPage,
  newSearch,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <MuiPagination
        count={Math.ceil(totalRestaurants / restaurantsPerPage)}
        color="secondary"
        siblingCount={2}
        onChange={(event, page) => {
          newSearch = false;
          setCurrPage(page);
        }}
      />
    </div>
  );
};

export default Pagination;
