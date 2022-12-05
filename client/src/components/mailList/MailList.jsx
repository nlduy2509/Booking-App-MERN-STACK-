import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./mailList.css"

const MailList = () => {
  const {user } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleClick = () =>{
    navigate("/login")
  }

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Tận hưởng với nhiều ưu đãi siêu khủng!</span>
      {user?(
        ""
      ):(<button onClick={handleClick}>Đăng nhập</button>)}
    </div>
  )
}

export default MailList