import React, { useState } from "react";
import "./AdminPanel.scss";
import PanelHeader from "./PanelHeader";
import Dashboard from "./Dashboard";
import CSRTable from "./CSRTable";

function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="admin-panel">
      <PanelHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Dashboard />
      <CSRTable searchQuery={searchQuery} />
    </div>
  );
}

export default AdminPanel;
