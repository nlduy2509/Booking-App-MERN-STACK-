import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GoogleLogin } from "react-google-login";
import {gapi} from "gapi-script"
import "./login.css";
import { useEffect } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const clientId = "1096214248116-lrau2l7t9cfclog2j7mlkgloiqvdtpp3.apps.googleusercontent.com"
  useEffect(()=>{
    const initClient = () => {
      gapi.client.init({
      clientId: clientId,
      scope: ''
    });
 };
 gapi.load('client:auth2', initClient);
  },[])

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClicklg = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate(-1);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  const handleOnSuccess=async(res)=>{
    console.log("res",res);
    const response = await axios.put("http://localhost:8800/api/users/google",{
      token:res.tokenId,
      username:res.profileObj.email
    })
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details });
    console.log("response.data.details",response.data.details)
    navigate(-1);
  }

  return (
    <div className="login">
      <h1>CHÀO MỪNG BẠN ĐẾN VỚI BOOKING APP </h1>
      <span className="login-text">ĐĂNG NHẬP</span>
      <div className="lContainer">
        <input
          type="text"
          placeholder="Tên tài khoản"
          id="username"
          onChange={handleChange}
          className="tInput"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          id="password"
          onChange={handleChange}
          className="tInput"
        />
        <button disabled={loading} onClick={handleClicklg} className="lButton">
          Đăng nhập
        </button >
        <div>
          {/* ==============Login GG============== */}
          <GoogleLogin
          style={{width:"500px",}}
            clientId={clientId}
            buttonText="Đăng nhập với tài khoản Google"
            uxMode="popup"
            onSuccess={(res) => handleOnSuccess(res)
            }
            onFailure={(res) => {
              console.log("FAILURE: ", res);
            }}
            cookiePolicy="single_host_origin"
            // isSignedIn={true}
          />
          {/* <img
            onClick={handleOnlickGoogle}
            style={{
              height: "30px",
              width: "30px",
              margin: "16px",
              cursor: "pointer",
            }}
            src="https://theme.hstatic.net/200000118173/1000809265/14/icon-gg__login.png?v=283"
          /> */}
        </div>
        <span>
          Bạn chưa có tài khoản? <a href="/register"> Đăng ký ngay</a>{" "}
        </span>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
