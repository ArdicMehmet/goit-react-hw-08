import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { Search } from "lucide-react";
import { setNameFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const currentFilter = useSelector(selectNameFilter);
  const [searchTerm, setSearchTerm] = useState(currentFilter || "");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSearchTerm(value);
    dispatch(setNameFilter(value));
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          İsme göre kişi ara
        </h4>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => handleChange(event.currentTarget.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-150 ease-in-out sm:text-sm"
            placeholder="Kişi ara..."
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
