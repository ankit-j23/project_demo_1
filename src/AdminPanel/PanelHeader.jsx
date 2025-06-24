import React from "react";
import gbanklogo from "../assets/gbanklogo.png";
import { FaSearch } from "react-icons/fa";
import { DatePicker } from "antd";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
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
  
  // State for date pickers - using null for initial state like in Dashboard
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    setSearchedResults([]);
  };

  // Disable end dates before start date
  const disabledEndDate = (current) => {
    if (!startDate) return false;
    return current && current < startDate.startOf('day');
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
          <DatePicker
            className="date-picker-input"
            placeholder="Start Date"
            value={startDate}
            onChange={(date) => {
              setStartDate(date);
              // Clear end date if it's before the new start date
              if (endDate && date && endDate < date) {
                setEndDate(null);
              }
            }}
            suffixIcon={<CalendarDays className="calendar-icon" />}
          />
          <DatePicker
            className="date-picker-input"
            placeholder="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            disabledDate={disabledEndDate}
            suffixIcon={<CalendarDays className="calendar-icon" />}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
            <DatePicker
              className="date-picker-input-tab"
              placeholder="Start Date"
              value={startDate}
              onChange={(date) => {
                setStartDate(date);
                // Clear end date if it's before the new start date
                if (endDate && date && endDate < date) {
                  setEndDate(null);
                }
              }}
              suffixIcon={<CalendarDays className="calendar-icon-tab" />}
            />
            <DatePicker
              className="date-picker-input-tab"
              placeholder="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              disabledDate={disabledEndDate}
              suffixIcon={<CalendarDays className="calendar-icon-tab" />}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button className="search-btn-mobile" onClick={() => handleSearch()}>
          Search
        </button>
      </div>

      <div className="header-content-2-mobile mobile-view">
        <div className="date-clear-btn-container-mobile">
          <div className="date-picker-container-mobile">
            <DatePicker
              className="date-picker-input-mobile"
              placeholder="Start Date"
              value={startDate}
              onChange={(date) => {
                setStartDate(date);
                // Clear end date if it's before the new start date
                if (endDate && date && endDate < date) {
                  setEndDate(null);
                }
              }}
              suffixIcon={<CalendarDays className="calendar-icon-mobile" />}
            />
            <DatePicker
              className="date-picker-input-mobile"
              placeholder="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              disabledDate={disabledEndDate}
              suffixIcon={<CalendarDays className="calendar-icon-mobile" />}
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