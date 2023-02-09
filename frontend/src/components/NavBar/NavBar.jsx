import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <div
          className="justify-content-around"
          style={{ justifyContent: "space-between", alignItems: "end"}}>        
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Skydive Tracker    </b>
          </Link>
          <Link to="/log" style={{ textDecoration: "none", color: "navy" }}>
            <b>View Jumps    </b>
          </Link>
          <Link to="/jumps" style={{ textDecoration: "none", color: "white" }}>
            <b>Log New Jump    </b>
          </Link>
          <Link
            to="/weather" style={{ textDecoration: "none", color: "darkblue" }}>                      
            <b>View Weather    </b>
          </Link>
          <Link to="/map" style={{ textDecoration: "none", color: "white" }}>
            <b>DZ's Nearby    </b>
          </Link>
          <Link
            to="/directions" style={{ textDecoration: "none", color: "navy" }}>       
            <b>Add Images/Videos</b>
          </Link>
        </div>
        <li>
          {user ? (
            <button className="btn" onClick={logoutUser}>
              Logout
            </button>
          ) : (
            <button className="btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
