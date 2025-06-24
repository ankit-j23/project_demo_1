import React from "react";
import gbanklogo from "../assets/gbanklogo.png";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
import { useState } from "react";
import DateInput from "./DateInput";
import { FaTimes } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import "./PanelHeader.scss";

const names = [
  "Michael Davis",
  "John Smith",
  "Jane Doe",
  "Alice Johnson",
  "Bob Brown",
  "Charlie White",
  "David Black",
  "Emily Green",
  "Frank Blue",
  "Grace Yellow",
];
function PanelHeader() {
  // State for search query and results
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  // State for date pickers
  const now = new Date(Date.now()); // or just new Date()

  const year = String(now.getFullYear()).slice(2); // last two digits
  const month = String(now.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
  const day = String(now.getDate()).padStart(2, "0"); // day of the month

  const formattedDate = `${month}/${day}/${year}`;
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      console.log("Please enter a search query.");
      return;
    }
    const searchedResults = names.filter((name) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (searchedResults.length > 0) {
      console.log("Search results:", searchedResults);
      setSearchedResults(searchedResults);
    } else {
      console.log("No results found for:", searchQuery);
      setSearchedResults([]);
    }
  };

  // Function to handle clear action
  const handleClear = () => {
    setSearchQuery("");
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <div className="header-container">
      {/* Left side: logo, input, search button */}
      {/* for desktop view */}
      <div className="header-content-1 desktop-view">
        <img src={gbanklogo} alt="GBank Logo" className="logo" />
        <div className="search-container">
          <div className="search-wrapper">
            <FaSearch className="icon-search" onClick={() => handleSearch()} />
            <input
              className="search-input"
              type="text"
              placeholder="Search by name"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="search-btn" onClick={() => handleSearch()}>
            Search
          </button>
        </div>
      </div>

      {/* Right side: date pickers, clear, profile */}
      {/* for desktop view */}
      <div className="header-content-2 desktop-view">
        <div className="date-picker-container">
          <DateInput
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <DateInput
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="clear-btn" onClick={() => handleClear()}>
          Clear
        </button>
        <div className="profile">
          <Avatar alt="John Smith" src="" className="avatar" />
          <span className="username">John Smith</span>
        </div>
      </div>

      {/* for tab view left side */}

      <div className="header-content-1-tab tab-view">
        <img src={gbanklogo} alt="GBank Logo" className="logo-tab" />
        <div className="search-container-tab">
          <div className="search-wrapper-tab">
            <FaSearch
              className="icon-search-tab"
              onClick={() => handleSearch()}
            />
            <input
              className="search-input-tab"
              type="text"
              placeholder="Search by name"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="search-btn" onClick={() => handleSearch()}>
            Search
          </button>
        </div>
        <div className="profile-tab">
          <Avatar alt="John Smith" src="" className="avatar-tab" />
          <span className="username">John Smith</span>
        </div>
      </div>
      {/* for tab view right side*/}
      <div className="header-content-2-tab tab-view">
        <div className="date-clear-btn-container">
          <div className="date-picker-container-tab">
            <DateInput
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <DateInput
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button className="clear-btn" onClick={() => handleClear()}>
          Clear
        </button>
      </div>
      {/* for mobile view */}
      <div className="header-content-1-mobile mobile-view">
        <img src={gbanklogo} alt="GBank Logo" className="logo-mobile" />

        <div className="profile-mobile">
          <Avatar alt="John Smith" src="" className="avatar-mobile" />
          <span className="username">John Smith</span>
        </div>
      </div>
      <div className="search-container-mobile mobile-view">
        <div className="search-wrapper-mobile">
          <FaSearch
            className="icon-search-mobile"
            onClick={() => handleSearch()}
          />
          <input
            className="search-input-mobile"
            type="text"
            placeholder="Search by name"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="search-btn-mobile" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
      <div className="header-content-2-mobile mobile-view">
        <div className="date-clear-btn-container-mobile">
          <div className="date-picker-container-mobile">
            <DateInput
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <DateInput
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button className="clear-btn-mobile" onClick={() => handleClear()}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default PanelHeader;
