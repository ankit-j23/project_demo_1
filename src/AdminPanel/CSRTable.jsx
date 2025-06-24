import React, { useState, useEffect } from "react";
import "./CSRTable.scss";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import view_icon from "../assets/view_icon.png";
import axios from "axios";
const mockData = [
  {
    id: 1,
    name: "Michael Davis",
    interactions: 3,
    ssnUnmasked: 7,
    avgTime: "8.9 min",
    details: [
      {
        applicationId: "1143",
        applicationDate: "07 - 05 - 2025",
        notes: "Dummy note A",
      },
      {
        applicationId: "2001",
        applicationDate: "07 - 01 - 2025",
        notes: "Details for Sophia",
      },
      {
        applicationId: "3044",
        applicationDate: "07 - 03 - 2025",
        notes: "Notes from Olivia’s case",
      },
      {
        applicationId: "3044",
        applicationDate: "07 - 03 - 2025",
        notes: "Notes from Olivia’s case",
      },
    ],
  },
  {
    id: 2,
    name: "Sophia Johnson",
    interactions: 7,
    ssnUnmasked: 3,
    avgTime: "6.4 min",
    details: [
      {
        applicationId: "2001",
        applicationDate: "07 - 01 - 2025",
        notes: "Details for Sophia",
      },
      {
        applicationId: "3044",
        applicationDate: "07 - 03 - 2025",
        notes: "Notes from Olivia’s case",
      },
      {
        applicationId: "3044",
        applicationDate: "07 - 03 - 2025",
        notes: "Notes from Olivia’s case",
      },
      {
        applicationId: "3044",
        applicationDate: "07 - 03 - 2025",
        notes: "Notes from Olivia’s case",
      },
      {
        applicationId: "3044",
        applicationDate: "07 - 03 - 2025",
        notes: "Notes from Olivia’s case",
      },
    ],
  },
  {
    id: 3,
    name: "Liam Martinez",
    interactions: 9,
    ssnUnmasked: 1,
    avgTime: "9.3 min",
    details: [],
  },
  {
    id: 4,
    name: "Olivia Brown",
    interactions: 4,
    ssnUnmasked: 2,
    avgTime: "7.2 min",
    details: [
      {
        applicationId: "3044",
        applicationDate: "07 - 03 - 2025",
        notes: "Notes from Olivia’s case",
      },
    ],
  },
  {
    id: 5,
    name: "William Garcia",
    interactions: 5,
    ssnUnmasked: 6,
    avgTime: "5.6 min",
    details: [],
  },
];

const CSRTable = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [openNotes, setOpenNotes] = useState(false);
  const [selectedNote, setSelectedNote] = useState("");

  useEffect(() => {
    axios
      .get("/api/csr-data")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch data", err);
      });
  }, []);

  const handleViewNotes = (note) => {
    setSelectedNote(note);
    setOpenNotes(true);
  };
  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };


  // replace this with data when doing api call bhaiya
    const filteredData = mockData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // <div className="csr-table-wrapper">
    <div className="csr-table">
      <div className="csr-header-row">
        <div className="csr-header">Sl No</div>
        <div className="csr-header">CSR</div>
        <div className="csr-header">Interactions</div>
        <div className="csr-header">SSNs Unmasked</div>
        <div className="csr-header">Average Time</div>
        <div className="csr-header">Actions</div>
      </div>

      {filteredData.map((item, index) => (
        <div key={item.id} className="csr-main-row">
          <div className="csr-row-wrapper">
            <div className="csr-row">
              <div className="csr-cell">{`0${index + 1}`}</div>
              <div className="csr-cell">{item.name}</div>
              <div className="csr-cell">
                <div className="bar-container blue">
                  <div
                    className="bar-fill"
                    style={{ width: `${(item.interactions / 10) * 40}px` }}
                  ></div>
                </div>
                <span>{item.interactions}</span>
              </div>
              <div className="csr-cell">
                <div className="bar-container orange">
                  <div
                    className="bar-fill"
                    style={{ width: `${(item.ssnUnmasked / 10) * 40}px` }}
                  ></div>
                </div>
                <span>{item.ssnUnmasked}</span>
              </div>
              <div className="csr-cell">{item.avgTime}</div>
              <div
                className="csr-cell action"
                onClick={() => toggleRow(item.id)}
              >
                <span>View Details</span>
                {expandedRow === item.id ? <ExpandLess /> : <ExpandMore />}
              </div>
            </div>
          </div>

          {expandedRow === item.id && item.details.length > 0 && (
            <div className="sub-table">
              <div className="sub-header-row">
                <div className="sub-header">Application ID</div>
                <div className="sub-header">Application Date</div>
                <div className="sub-header">Notes</div>
              </div>
              {item.details.map((detail, i) => (
                <div key={i} className="sub-data-row">
                  <div className="sub-cell">{detail.applicationId}</div>
                  <div className="sub-cell">{detail.applicationDate}</div>
                  <div className="sub-cell-3">{detail.notes}</div>
                  <img
                    src={view_icon}
                    alt="view_icon"
                    className="view-icon"
                    onClick={() => handleViewNotes(detail.notes)}
                  />
                  {/* <div className="sub-cell"></div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {openNotes && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <span>Notes</span>
              <CloseIcon
                className="close-icon"
                onClick={() => setOpenNotes(false)}
              />
            </div>
            <div className="dialog-content">{selectedNote}</div>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default CSRTable;
