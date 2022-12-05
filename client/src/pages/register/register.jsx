import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const {loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", credentials);
      navigate("/login")
    } catch (err) {
      {console.log(err)}
    }
  };

  return (
    <div className="register">
      <h1 className="h1-reg">CHÀO MỪNG ĐẾN VỚI BOOKING APP </h1>
      <div className="register-text">ĐĂNG KÝ</div>
      <div className="lContainer">
        <input
          type="text"
          placeholder="Tên tài khoản"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Tên đầy đủ"
          id="fullName"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Quốc tịch"
          id="country"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="number"
          placeholder="Số điện thoại"
          id="phone"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Đăng ký
        </button>
        <span>Bạn đã có tài khoản? <a href="/login">Đăng nhập ngay</a> </span>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
