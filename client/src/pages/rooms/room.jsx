import * as React from 'react';
import {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

import "../../components/reserve/Reserve.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { margin } from '@mui/system';

const RoomCard=(props)=> {
  const [openModal, setOpenModal] = useState(false);
  const [room,setRoom]= useState([])
  const [age, setAge] = useState('');
  const {data}= props

  const handleOnclickReserve=(data)=>{
    setOpenModal(true)
    setRoom(data)
  }
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClick = async () => {
    
  };
  return (
    <Stack direction="row" spacing={3}>
      {
          data.map((e)=>(
    <Card sx={{ width: 300 }} >
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
        <Typography variant="body" color="text.secondary">
          Giá : {e.price}.000 VNĐ
        </Typography>
      </CardContent>
      <CardActions onClick={()=>handleOnclickReserve(e)}>
        <Button size="small">Reserve now!</Button>
      </CardActions>
    </Card>
          ))
        }

    {openModal && <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpenModal(false)}
        />
        <span>Chọn phòng bạn muốn: </span>
        
        <div className="rroom" key={room._id}>
            <div className="rroomInfo">
              <div className="rTitle">{room.title}</div>
              <div className="rMax">
                Max people: <b>{room.maxPeople}</b>
              </div>
              <div className="rPrice">{room.price}</div>
            </div>
            <div className="rSelectRooms">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Phòng</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {room.roomNumbers.map((e,i)=>(
            (<MenuItem key={i} value={i}>
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
          Reserve Now!
        </button>
      </div>
    </div>}
    </Stack> 
    );
}
export default RoomCard