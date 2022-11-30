import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {

  const {user } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleClickLogin = () =>{
    navigate("/login")
  }

  const handleClickRegister = () =>{
    navigate("/register")
  }

  const handleClickLogout = () =>{
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">Booking App</span>
        </Link>
        {user ? (
        <div>
          <span>{user.username}</span>
          <button onClick={handleClickLogout}>Logout</button>
        </div>
          )  : (
        <div className="navItems">
          <button className="navButton" onClick={handleClickRegister}>Register</button>
          <button className="navButton" onClick={handleClickLogin}>Login</button>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar