import React, { useState } from "react";
import "./AdminPanel.scss";
import PanelHeader from "./PanelHeader";
import Dashboard from "./Dashboard";
import CSRTable from "./CSRTable";

function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="admin-panel">
      <PanelHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Dashboard />
      <CSRTable
        searchQuery={searchQuery}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

export default AdminPanel;
