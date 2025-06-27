import React from "react";
import "./AdminLogin.scss";
import gbanklogo from "../../../src/assets/gbanklogo.png";
import microsoftLogo from "../../../src/assets/microsoftLogo.png";
import login_frame from "../../../src/assets/login_frame.png";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
    const navigate = useNavigate()
    return (
        <div className="admin-login-container" style={{backgroundImage: `url(${login_frame})`}}>
            {/* <img src={login_frame} alt="login_frame" /> */}
            <div className="login-content md:max-w-[440px]">
                <div className="login-content-inside">
                    <img src={gbanklogo} alt="G Bank Logo" className="login-bank-logo" />
                    <p className="text-black/50 font-semibold">Login to continue</p>
                    <button onClick={() => navigate('/csrdashboard')} className="signin-button" style={{ cursor: 'pointer' }}>
                        <img
                            src={microsoftLogo}
                            alt="microsoftLogo"
                            className="microsoft-logo"
                            
                        />
                        Sign in with Microsoft
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
