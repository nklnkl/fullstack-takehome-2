import React from "react";
import {CiSearch} from "react-icons/ci";
import {
  SearchBarClassName,
  SearchBarIconClassName,
  SearchBarInputClassName,
} from "./style";

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({className}) => {
  return <div className={`${SearchBarClassName} ${className}`}>
    <CiSearch className={SearchBarIconClassName}/>
    <input type="text" placeholder="Search" className={SearchBarInputClassName}/>
  </div>
};

export default SearchBar;
