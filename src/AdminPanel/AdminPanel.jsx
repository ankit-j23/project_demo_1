import React from "react";
import "./AdminPanel.scss";
import PanelHeader from "./PanelHeader";
import Dashboard from "./Dashboard";
import CSRTable from "./CSRTable";
function AdminPanel() {
  return (
    <div className="admin-panel">
      <PanelHeader />
      <Dashboard />
      <CSRTable />
    </div>
  );
}

export default AdminPanel;
