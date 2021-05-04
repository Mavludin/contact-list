import { useState } from "react";
import { useSelector } from "react-redux";
import { selectContactList } from "../store/reducer";

export const useSearch = () => {

  // Setting a flag and a new array for the searched data
  const contactList = useSelector(selectContactList);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedData, setSearchedData] = useState([]);

  // Search function
  const handleSearch = (string) => {
    if (string.length) {
      const tempArray = contactList.filter((item) => {
        for (let key in item) {
          if (
            item[key].toString().toLowerCase().includes(string.toLowerCase())
          ) {
            return item;
          }
        }
        return false;
      });

      setSearchedData(tempArray);
      setIsSearching(true);
    } else setIsSearching(false);
  };

  return {
    isSearching,
    searchedData,
    handleSearch
  }

}