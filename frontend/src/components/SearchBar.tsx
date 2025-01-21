import React from "react";
import {CiSearch} from "react-icons/ci";

const SearchBarClassName = "flex flex-row items-center bg-vest-border rounded space-x-2";
const SearchBarIconClassName = "text-vest-grey w-6 h-6";
const SearchBarInputClassName = "flex-1 bg-transparent outline-none px-2 text-white text-sm";

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
