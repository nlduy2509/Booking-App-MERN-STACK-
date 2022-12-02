import * as React from 'react';
import {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Stack } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import { AuthContext } from "../../context/AuthContext";

import "./room.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { margin } from '@mui/system';

import { BrowserRouter, useNavigate } from "react-router-dom";
import {useContext} from "react"
import Reservation from '../../components/reserve/Reserve';

const RoomCard=(props)=> {
  const {user} = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [room,setRoom]= useState([])
  const [numberRoom, setNumberRoom] = useState('');
  const [dataReserve,setDataReserve]=useState([])
  const {data,dataHotel,dates}= props

  const navigate = useNavigate()

  const handleOnclickReserve=(data)=>{
    if(!user){
      navigate("/login")
    }else{
      setOpenModal(true)
      setRoom(data)
    }
  }
  const handleChange = (event) => {
    setNumberRoom(event.target.value);
  };

  const handleClick = () => {

    if(numberRoom.length===0){
      console.log("Chưa có phòng")
    }else{
      const newDataReserve = [dataHotel]
      newDataReserve.push(room)
      newDataReserve.push(numberRoom)
      newDataReserve.push(dates)
      newDataReserve.push(user)
      setDataReserve(newDataReserve);
      setOpen(true)
    }
  };
  const handleClickClose= ()=>{
    setOpenModal(false)
    setNumberRoom([])
  }
  return (
    <Stack direction="row" spacing={3}>
      {
          data.map((e)=>(
    <Card sx={{ width: 300 , margin: "0 16px"}} >
      <CardMedia
        component="img"
        height="140"
        src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {e.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {e.desc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Số lượng người tối đa: <b>{e.maxPeople}</b>
        </Typography>
        <Typography variant="body" color="text.secondary">
          Giá : {e.price}.000 VNĐ
        </Typography>
      </CardContent>
      <CardActions onClick={()=>handleOnclickReserve(e)}>
        <Button sx={{bgcolor:"orange"}} size="small">Đặt chỗ</Button>
      </CardActions>
    </Card>
          ))
        }

    {openModal && <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={handleClickClose}
        />
        <span>Chọn phòng bạn muốn: </span>
        
        <div className="rroom" key={room._id}>
            <div className="rroomInfo">
              <div className="rTitle">{room.title}</div>
            </div>
            <div className="rSelectRooms">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Phòng</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={numberRoom}
          label="Phòng số"
          onChange={handleChange}
        >
          {room.roomNumbers.map((e,i)=>(
            (<MenuItem key={i} value={e}>
              {e.number}
              </MenuItem>)
          ))}
        </Select>
      </FormControl>
              {/* {room.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))} */}
            </div>
          </div>
        <button onClick={handleClick} className="rButton">
          Chọn
        </button>
      </div>
    </div>}

    {open && <Reservation dataReserve={dataReserve} open={open} setOpen={setOpen} setOpenModal={setOpenModal}/>}

    { openModal &&  numberRoom.length===0  &&  <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center'}} open={true} autoHideDuration={2000}>
        <Alert  severity="warning" sx={{ width: '100%' }}>
          Vui lòng chọn phòng
        </Alert>
      </Snackbar>}
    </Stack> 
    );
}
export default RoomCard