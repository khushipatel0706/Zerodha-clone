import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL, FRONTEND_URL } from "../config";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .post(`${API_URL}/verify`, {}, { withCredentials: true })
      .then(({ data }) => {
        if (data.status) {
          setUsername(data.user);
        } else {
          window.location.href = `${FRONTEND_URL}/login`;
        }
      })
      .catch(() => {
        window.location.href = `${FRONTEND_URL}/login`;
      });
  }, []);

  const handleMenuClick = (index) => setSelectedMenu(index);
  const handleProfileClick = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
    window.location.href = `${FRONTEND_URL}/`;
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src={process.env.PUBLIC_URL + "/logo.svg"} style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />

        <div style={{ position: "relative" }}>
          <div className="profile" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
            <div className="avatar">
              {username ? username.slice(0, 2).toUpperCase() : "ZU"}
            </div>
            <p className="username">{username || "Loading..."}</p>
          </div>

          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "8px",
                minWidth: "140px",
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                padding: "10px 14px",
                zIndex: 1000,
              }}
            >
              <a
                href={`${FRONTEND_URL}/`}
                style={{ display: "block", textDecoration: "none", color: "#444", marginBottom: "10px" }}
              >
                Home
              </a>
              <button
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  padding: "6px 10px",
                  background: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;