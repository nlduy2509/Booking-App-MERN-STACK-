import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const {user } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleClick = () =>{
    setOpen(!open)
  }

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
  const handleClickViewHist=()=>{
    navigate("/myreserve")
  }
  const handleClickViewProfile=()=>{
    navigate("/profile")
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">BOOKING</span>
        </Link>
        {user ? (
        <>
          <div className={open?`select1`:`select2`}>
              <button className="button" onClick={handleClickViewProfile}>Thông tin tài khoản</button>
              <button className="button" onClick={handleClickViewHist}>Lịch sử đặt phòng</button>
          </div>
          <div className="user">
            <span onClick={handleClick}>{user.fullName}</span>
            <img onClick={handleClick} src={user.img||"https://www.starylaw.com/assets/Uploads/male-avatar-profile-picture-silhouette-light-vector-4684579__FillMaxWzM4NCwzMTRd.jpg"} alt="" className="img-user"></img>
            <button onClick={handleClickLogout} className="navButton" >Đăng xuất</button>
          </div> 
        </>
        
          )  : (
        <div className="navItems">
          <button className="navButton" onClick={handleClickRegister}>Đăng ký</button>
          <button className="navButton" onClick={handleClickLogin}>Đăng nhập</button>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar