import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import chart from "../assets/chart.png"; // Assuming you have a chart image
import documentText from "../assets/documentText.png"; // Assuming you have a document icon
import clock from "../assets/clock.png"; // Assuming you have a clock icon
import security from "../assets/security.png"; // Assuming you have a clock icon
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
const data = [
  { day: "Monday", interactions: 80 },
  { day: "Tuesday", interactions: 150 },
  { day: "Wednesday", interactions: 120 },
  { day: "Thursday", interactions: 50 },
  { day: "Friday", interactions: 160 },
];

const Dashboard = () => {
  const [showGraph, setShowGraph] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 599);
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 599);
    };

    // Set initially
    handleResize();

    // Listen to window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      setShowGraph(false);
    };
  }, []);
  useEffect(() => {
    // Fetch left summary
    axios
      .get("/api/dashboard/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Error fetching summary", err));

    // Fetch right graph data
    axios
      .get("/api/dashboard/daily-interactions")
      .then((res) => setChartData(res.data))
      .catch((err) => console.error("Error fetching chart data", err));
  }, []);
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        {isMobileView && (
          <div className="show-btn-container">
            <p className="header-1">Experian Instant Credit Form</p>
            <button
              className="show-btn"
              onClick={() => setShowGraph(!showGraph)}
            >
              {showGraph ? "Hide Graph" : "Show Graph"}
            </button>
          </div>
        )}
        {!isMobileView && (
          <p className="header-1">Experian Instant Credit Form</p>
        )}
        <p className="header-2">
          monitor custom service represented activity and data access
        </p>

        <hr className="horizontal-line" />
      </div>
      <div className="dashboard">
        {!showGraph && (
          <div className="left">
            <div className="box">
              <div className="box-header">
                <p className="box-header-text-1">Total Interactions</p>
                <div className="icon-container">
                  <img src={chart} alt="chart-icon" className="icon" />
                </div>
              </div>
              <div className="box-header-2">
                <p className="box-header-text-2">50</p>
              </div>
            </div>
            <div className="box">
              <div className="box-header">
                <p className="box-header-text-1">Application Accessed</p>
                <div className="icon-container">
                  <img
                    src={documentText}
                    alt="documentText-icon"
                    className="icon"
                  />
                </div>
              </div>
              <div className="box-header-2">
                <p className="box-header-text-2">05</p>
              </div>
            </div>
            <div className="box">
              <div className="box-header">
                <p className="box-header-text-1">SSNs Unmasked</p>
                <div className="icon-container">
                  <img src={security} alt="security-icon" className="icon" />
                </div>
              </div>
              <div className="box-header-2">
                <p className="box-header-text-2">17</p>
              </div>
            </div>
            <div className="box">
              <div className="box-header">
                <p className="box-header-text-1">Average interaction time</p>
                <div className="icon-container">
                  <img src={clock} alt="clock-icon" className="icon" />
                </div>
              </div>
              <div className="box-header-timer">
                <p className="box-header-text-timer-1">
                  6.2 <span className="box-header-text-timer-2">min</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {!isMobileView && (
          <div className="right">
            <div className="chart-header">
              <p className="interactions">Daily Interactions</p>
              <div className="chart-header-right">
                <div className="interaction-box"></div>
                <p className="interactions-2">Daily Interactions</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <CartesianGrid
                  strokeDasharray="3 3" // Makes lines dotted
                  vertical={false} // Disable vertical lines
                />
                <Line type="monotone" dataKey="interactions" stroke="#2e3192" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        {isMobileView && showGraph && (
          <div className="right rotated-graph-wrapper">
            <div className="chart-header-mobile">
              <p className="interactions-mobile">Daily Interactions</p>
              <div className="chart-header-right-mobile">
                <div className="interaction-box-mobile"></div>
                <p className="interactions-2-mobile">Daily Interactions</p>
              </div>
            </div>

            <div className="rotated-chart-container">
              <ResponsiveContainer width={500} height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Line
                    type="monotone"
                    dataKey="interactions"
                    stroke="#2e3192"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
