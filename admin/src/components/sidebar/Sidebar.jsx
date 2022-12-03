import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";

const Sidebar = () => {
  const [status,setStatus]=useState(window.location.pathname)
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate()
  const handleClick =()=>{
    localStorage.clear()
    navigate("/login")
  }
  useEffect(()=>{
    setStatus(window.location.pathname)
  },[window.location.pathname])
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">BOOKING</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Màn hình chính</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
        </Link>
          
          <p className="title">Quản Lý</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li style={{backgroundColor:`${status==="/users"?"orange":"white"}`}}>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li style={{backgroundColor:`${status==="/hotels"?"orange":"white"}`}}>
              <StoreIcon className="icon" />
              <span>Hotel</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li style={{backgroundColor:`${status==="/rooms"?"orange":"white"}`}}>
              <CreditCardIcon className="icon" />
              <span>Room</span>
            </li>
          </Link>
          <Link to="/reservations" style={{ textDecoration: "none" }}>
            <li style={{backgroundColor:`${status==="/reservations"?"orange":"white"}`}}>
              <LocalShippingIcon className="icon" />
              <span>Reservation</span>
            </li>
          </Link>
          
          
          <p className="title">Cá nhân</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleClick}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
