import classes from "./SearchForm.module.css";

export const SearchForm = ({ handleSearch }) => {
  return (
    <form action="" className={classes.searchForm}>
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
