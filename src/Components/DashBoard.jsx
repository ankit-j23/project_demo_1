// Dashboard.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import NavBar from "./NavBar";
import { Calendar, Calendar1, CalendarDays, Search } from "lucide-react";
import UserDetails from "./UserDetails";
import UserInfo from "./UserInfo";
import { DatePicker, Space } from "antd";

const DashBoard = () => {
  const now = new Date(Date.now());
  const year = String(now.getFullYear()).slice(2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;

  // State management
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination state - updated to match API response
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  
  // Search debouncing
  const [searchTimeout, setSearchTimeout] = useState(null);
  const searchInputRef = useRef(null);
  
  // Scroll container ref for infinite scroll
  const scrollContainerRef = useRef(null);
  
  const pageSize = 20; // You can adjust this as needed

  // Fetch applications from API with custom payload
  const fetchApplicationsWithPayload = async (payload, isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);
    
    try {
      const response = await fetch("http://172.28.164.11/Customers/GetCustomers", {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        const newApplications = data.data || [];
        
        if (isLoadMore) {
          // Append new data for infinite scroll
          setApplications(prev => [...prev, ...newApplications]);
        } else {
          // Replace data for new search/filter
          setApplications(newApplications);
        }
        
        // Update pagination state using API response
        setCurrentPage(data.pageIndex || payload.pageIndex);
        setTotalPages(data.totalPages || 0);
        setTotalCount(data.totalCount || 0);
        setHasNextPage(data.hasNextPage || false);
        setHasPreviousPage(data.hasPreviousPage || false);
        
      } else {
        if (!isLoadMore) {
          setApplications([]);
          setTotalCount(0);
          setTotalPages(0);
        }
        setError(data.message || "Failed to fetch data");
        setHasNextPage(false);
      }
    } catch (err) {
      console.error("API Error:", err); // Debug log
      setError("Network error: " + err.message);
      if (!isLoadMore) {
        setApplications([]);
        setTotalCount(0);
        setTotalPages(0);
      }
      setHasNextPage(false);
    }
    
    if (isLoadMore) {
      setLoadingMore(false);
    } else {
      setLoading(false);
    }
  };

  // Fetch applications from API
  const fetchApplications = async (pageIndex = 1, isLoadMore = false) => {
    const payload = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      searchString: searchQuery.trim(),
      fromDate: startDate ? startDate.format("YYYY-MM-DD") : null,
      toDate: endDate ? endDate.format("YYYY-MM-DD") : null,
    };
    
    await fetchApplicationsWithPayload(payload, isLoadMore);
  };

  // Debounced search function
  const debouncedSearch = useCallback((query, sDate, eDate) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      // Reset to page 1 for new search
      setCurrentPage(1);
      // Create payload with current values
      const payload = {
        pageIndex: 1,
        pageSize: pageSize,
        searchString: query.trim(),
        fromDate: sDate ? sDate.format("YYYY-MM-DD") : null,
        toDate: eDate ? eDate.format("YYYY-MM-DD") : null,
      };
      fetchApplicationsWithPayload(payload, false);
    }, 500); // 500ms delay
    
    setSearchTimeout(timeout);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value, startDate, endDate);
  };

  // Effect for date changes (immediate execution, no debouncing)
  useEffect(() => {
    // Only execute if component has been initialized (not on first mount)
    if (startDate !== null || endDate !== null) {
      // Reset to page 1 when dates change
      setCurrentPage(1);
      fetchApplications(1, false);
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [startDate, endDate]); // Only trigger on date changes

  // Initial load
  useEffect(() => {
    fetchApplications(1, false);
  }, []);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || loadingMore || !hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    
    // Trigger load more when user is near bottom (100px before end)
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const nextPage = currentPage + 1;
      
      // Create payload with current filter values for load more
      const payload = {
        pageIndex: nextPage,
        pageSize: pageSize,
        searchString: searchQuery.trim(),
        fromDate: startDate ? startDate.format("YYYY-MM-DD") : null,
        toDate: endDate ? endDate.format("YYYY-MM-DD") : null,
      };
      
      fetchApplicationsWithPayload(payload, true);
    }
  }, [currentPage, hasNextPage, loadingMore, searchQuery, startDate, endDate]);

  // Add scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Handle manual search button click
  const handleSearch = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setCurrentPage(1);
    fetchApplications(1, false);
  };

  // Handle clear filters
  const handleClear = () => {
    // Clear all search timeout first
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      setSearchTimeout(null);
    }
    
    // Reset all state to original
    setSearchQuery("");
    setStartDate(null);
    setEndDate(null);
    setSelectedUser(null);
    setShowUserPanel(false);
    setCurrentPage(1);
    setApplications([]);
    setError(null);
    
    // Clear the search input
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    
    // Fetch original data immediately with empty payload
    const originalPayload = {
      pageIndex: 1,
      pageSize: pageSize,
      searchString: "",
      fromDate: null,
      toDate: null,
    };
    
    fetchApplicationsWithPayload(originalPayload, false);
  };

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowUserPanel(true);
  };

  // Disable end dates before start date
  const disabledEndDate = (current) => {
    if (!startDate) return false;
    return current && current < startDate.startOf('day');
  };

  // Helper function to get current results info
  const getCurrentResultsInfo = () => {
    if (totalCount === 0) return '';
    
    const currentlyLoaded = applications.length;
    const totalResults = totalCount;
    
    if (hasNextPage) {
      return `(${currentlyLoaded}+ of ${totalResults} results)`;
    } else {
      return `(${currentlyLoaded} of ${totalResults} results)`;
    }
  };

  return (
  <div className="p-2">
      <NavBar />
    <div className="flex flex-col py-2 px-2 min-[445px]:px-5 bg-white mt-3.5 rounded-sm w-full">
      {/* Header Section */}
      <div className="flex max-md:flex-col max-md:gap-2 md:justify-between pb-1.5 dashboard-header border-b border-[#E6E6E6] w-full md:gap-2 lg:gap-10 xl:gap-14 2xl:gap-0">
        
        {/* Left Section - Title and Search */}
        <div className="flex max-[490px]:flex-col max-md:gap-2 max-lg:gap-2 min-[486px]:justify-between w-full md:w-[70%]">
          <div className="flex flex-col gap-0.5 min-w-[150px] max-[489px]:w-full max-[490px]:ml-1">
            <h2 className="text-[#2E3192] text-sm sm:text-md md:text-sm lg:text-lg font-semibold">
              Application Dashboard
            </h2>
            <p className="text-[11px] text-black/60">
              View and manage applications {getCurrentResultsInfo()}
              {totalPages > 0 && (
                <span className="ml-1">• Page {currentPage} of {totalPages}</span>
              )}
            </p>
          </div>
          
          <div className="flex max-[489px]:justify-between items-center gap-2 max-md:w-full">
            <div className="flex items-center relative lg:text-[13px] max-[489px]:w-[95%] max-md:w-[95%] max-[900px]:w-[170px] min-[905px]:w-[260px] xl:w-[350px] 2xl:w-[400px]">
              <Search className="absolute left-0 text-black/60 max-[905px]:size-4 min-[905px]:size-5 ml-1.5" />
              <input
                ref={searchInputRef}
                className="text-[12px] min-[905px]:text-[12px] max-[900px]:pl-7 min-[900px]:pl-10 py-[8.8px] bg-[#EEF1F8] rounded-sm text-xs focus:outline focus:outline-[#2E3192] w-full"
                type="text"
                id="search"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              className="flex items-center bg-[#2E3192] text-white text-xs px-5 py-[8.8px] md:py-[7px] lg:py-[8.8px] rounded-sm cursor-pointer hover:bg-[#2E3192]/90 transition-colors disabled:opacity-50"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Right Section - Date Pickers */}
        <div className="flex gap-2 items-center max-md:w-full">
          <div className="flex items-center relative max-md:w-[43.1%]">
            <DatePicker
              className="max-md:w-full max-[905px]:w-[110px]"
              style={{ borderRadius: "3px", background: "#EEF1F8" }}
              placeholder="Start Date"
              value={startDate}
              onChange={(date) => {
                setStartDate(date);
                // Clear end date if it's before the new start date
                if (endDate && date && endDate < date) {
                  setEndDate(null);
                }
              }}
              suffixIcon={<CalendarDays className="text-[#1C1D54] size-4 md:size-4 lg:size-5" />}
            />
          </div>
          <div className="flex items-center relative max-md:w-[43.1%]">
            <DatePicker
              className="max-md:w-full max-[905px]:w-[110px]"
              style={{ borderRadius: "3px", background: "#EEF1F8" }}
              placeholder="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              disabledDate={disabledEndDate}
              suffixIcon={<CalendarDays className="text-[#1C1D54] size-4 md:size-4 lg:size-5" />}
            />
          </div>
          <button 
            className="bg-[#2E3192] py-[8.8px] text-xs px-[25px] md:px-5 rounded-sm text-white cursor-pointer hover:bg-[#2E3192]/90 transition-colors"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-4">
        {/* Applications List */}
        <div className={`${!showUserPanel ? "w-full" : "w-1/2"} min-[445px]:pr-2 pb-2 bg-[#EEF1F8] rounded-md mt-4`}>
          <div 
            ref={scrollContainerRef}
            className="dashboard-body flex flex-col gap-3 h-[547px] overflow-y-auto bg-[#EEF1F8] min-[445px]:mt-3 rounded-md min-[445px]:px-3"
          >
            {loading && applications.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-[#2E3192] rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-[#2E3192] rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <p className="mt-4 text-sm font-medium">Loading applications...</p>
                <p className="mt-1 text-xs text-gray-400">Please wait while we fetch your data</p>
              </div>
            )}
            {error && applications.length === 0 && (
              <div className="flex items-center justify-center h-full text-red-500">
                <p>{error}</p>
              </div>
            )}
            {!loading && !error && applications.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>No applications found matching your criteria.</p>
              </div>
            )}
            
            {/* Applications List */}
            {applications.map((user) => (
              <UserDetails
                key={user.id}
                user={user}
                formattedDate={formattedDate}
                setShowUserPanel={setShowUserPanel}
                onUserSelect={handleUserSelect}
              />
            ))}
            
            {/* Load More Indicator */}
            {loadingMore && (
              <div className="flex flex-col items-center justify-center py-6 text-gray-500 bg-white/50 rounded-lg mx-2 border border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#2E3192] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#2E3192] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-[#2E3192] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <p className="mt-3 text-sm font-medium">Loading more applications...</p>
                <div className="mt-2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#2E3192] to-blue-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
            
            {/* End of Results Indicator */}
            {!hasNextPage && applications.length > 0 && (
              <div className="flex items-center justify-center py-4 text-gray-400 text-sm">
                <p>You've reached the end of the results</p>
              </div>
            )}

            {/* Show pagination info when there are results */}
            {applications.length > 0 && !loading && (
              <div className="flex items-center justify-center py-2 text-gray-500 text-xs">
                <p>
                  Showing {applications.length} of {totalCount} results
                  {hasNextPage && " • Scroll down for more"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* User Details Panel */}
        <div className={`${showUserPanel ? "inline" : "hidden"} overflow-y-auto hidden h-[567px] bg-[#EEF1F8] max-[900px]:mt-0 mt-4 min-[900px]:rounded-md max-sm:px-2 max-md:px-12 max-[900px]:px-24 min-[900px]:px-4 py-3 w-1/2 max-[900px]:fixed max-[900px]:inset-0 max-[900px]:min-h-screen max-[900px]:bg-black/65 backdrop-blur-lg max-[900px]:items-center max-[900px]:justify-center max-[900px]:my-2 max-[900px]:w-full`}>
          {selectedUser && (
            <UserInfo
              setShowUserPanel={setShowUserPanel}
              showUserPanel={showUserPanel}
              user={selectedUser}
            />
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashBoard;