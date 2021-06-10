import classes from "./SearchForm.module.css";
import PropTypes from 'prop-types';

export const SearchForm = ({ handleSearch }) => {
  return (
    <form className={classes.searchForm}>
      <div>
        <input
          type="search"
          placeholder="Live search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </form>
  );
};

SearchForm.propTypes = {
  handleSearch: PropTypes.func.isRequired
}