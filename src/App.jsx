import "./App.css";
import DashBoard from "./Components/DashBoard";
import NavBar from "./Components/NavBar";
import { BrowserRouter , Routes , Route } from'react-router-dom'
import RoleSelectPage from "./Pages/RoleSelectPage";
import { useState } from "react";
import AdminPanel from "./AdminPanel/AdminPanel";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";


function App() {
  const [showNav , setShowNav] = useState(false);
  return (
    <BrowserRouter>
    <div className={`bg-[#EEF1F8] min-h-screen ${showNav ? "p-2" : ""}`}>
      {showNav ? <NavBar /> : ""}
      <Routes>
        <Route path="/csrdashboard" element={<DashBoard />}></Route>
        <Route path="/admindashboard" element={<AdminPanel />}></Route>
        {/* <Route path="/" element={<RoleSelectPage setShowNav={setShowNav}/>}></Route> */}
        <Route path="/" element={<AdminLogin />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
