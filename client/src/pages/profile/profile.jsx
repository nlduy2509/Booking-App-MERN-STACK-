import axios from "axios";
import "./profile.scss";
import { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Profile = () =>{
    const { user } = useContext(AuthContext);
    const [List, setList] = useState([]);
    const [rePage,setRePage]= useState(false)
    const [check,setCheck]=useState(false)
    const [open,setOpen]=useState(true)
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    // const fetchData = async () => {
    //     const response = await axios.get(`/reservations/${user._id}`,{});
    //     console.log("data", response.data);
    //     setList(response.data)
    //     console.log("List", List)
    // };

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };

    const handle = () =>{
        setOpen(!open)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/de1k60feg/image/upload",
            data
          );
          console.log(uploadRes.data)
          const { url } = uploadRes.data;
    
          const updateUser = {
            ...info,
            img: url,
          };
    
          await axios.put(`/users/${user._id}`, updateUser);
          alert("Successfully")
        } catch (err) {
          console.log(err);
        }
      };
          
    useEffect(()=>{
      const fetchData = async () => {
        const response = await axios.get(`/users/${user._id}`,{});
        setList(response.data)
        console.log("data", response.data)
        setRePage(false)
        setCheck(false)
      };
      fetchData(); 
     
    },[user,rePage])
    console.log("List", List.username)

    return(
        <>
        <Navbar/>
        <div className="tool">

        <h2 className="title"> Thông tin tài khoản của bạn</h2>
        <div className="t1">

        <button onClick={handle}>Chỉnh sửa</button>
        <button onClick={handleUpdate}>Cập nhập</button>
        </div>
        </div>
       
        <div className="bottom">
            <div className="b1">
                <div className="left">
                <img
                src={
                    file
                    ? URL.createObjectURL(file)
                    : (List.img? List.img :"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")
                }
                alt=""
                />
            </div>
            <div className="formInput">
                    <label htmlFor="file">
                    Ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                    />
                </div>

            </div>
           <div className="b2">
                <label>Tên tài khoản</label>
                <input  id="username" onChange={handleChange} placeholder={List.username} disabled={open}></input>
                <label>Tên đầy đủ</label>
                <input  id="fullName" onChange={handleChange} placeholder={List.fullName} disabled={open}></input>
                <label>Email</label>
                <input  id="email" onChange={handleChange} placeholder={List.email} disabled={open}></input>
                <label>Quốc tịch</label>
                <input  id="country" onChange={handleChange} placeholder={List.country} disabled={open}></input>
                <label>Số điện thoại</label>
                <input  id="phone" onChange={handleChange} placeholder={List.phone} disabled={open}></input>
           </div>
        </div>
        </>
       
        
    )
}

export default Profile