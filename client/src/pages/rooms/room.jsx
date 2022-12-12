import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Grid, Stack, Box, Paper, Chip, Backdrop, Modal } from "@mui/material";

import FormatPrice from "../../components/Format/Format";
import BedIcon from "@mui/icons-material/Bed";

import Snackbar from "@mui/material/Snackbar";
import { AuthContext } from "../../context/AuthContext";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PeopleIcon from "@mui/icons-material/People";

import "./room.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { margin } from "@mui/system";

import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Reservation from "../../components/reserve/Reserve";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from '@mui/icons-material/Cancel';

import { styled } from "@mui/material/styles";
import { useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const RoomCard = (props) => {
  const location = useLocation()
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [openReservation, setOpenReservation] = useState(false);
  const [room, setRoom] = useState([]);
  const [numberRoomFilter, setNumberRoomFilter] = useState([]);
  const [numberRoom, setNumberRoom] = useState("");
  const [dataReserve, setDataReserve] = useState([]);

  const [openDetail, setOpenDetail] = useState(false);
  const [open, setOpen] = useState(false);

  const { data, dataHotel, dates } = props;

  const navigate = useNavigate();

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleOnclickViewDetail = (data) => {
    setDataDetail(data)
    setOpenDetail(true);
    console.log("first",data)
  };
  
  const handleOnclickReverse=(e)=>{
    if (!user) {
      navigate("/login");
    } else {
      setOpenModal(true);
      setCheckDate(true)
      setRoom(e);
      console.log("numberRomm",numberRoom);
    }
  }

  const handleChange = (event) => {
    setNumberRoom(event.target.value);
  };


  const handleClickChoose = () => {
    let numberRoomChoose
    if (!numberRoom) {
      numberRoomChoose =  room.roomNumbers[0]
    } else {
      numberRoomChoose =  room.roomNumbers.find(e=>e._id===numberRoom)
    }
    const newDataReserve = [dataHotel];
      newDataReserve.push(room);
      newDataReserve.push(numberRoomChoose);
      newDataReserve.push(dates);
      newDataReserve.push(user);
      setDataReserve(newDataReserve);
      setOpenReservation(true);
  };
  const handleClickClose = () => {
    setOpenModal(false);
    setNumberRoom([]);
    setRoom([])
    setNumberRoomFilter([])
  };

  const Check =()=>{
    const datesChoose = location.state?.dates
    const dateIn = moment(datesChoose[0].startDate).format("D")
    const dateOut = moment(datesChoose[0].endDate).format('D')  
    const dateRoomUn = room?.roomNumbers
    for(let i of dateRoomUn){
      const data = i
      const check= data.unavailableDates.filter(e=>moment(e).format('D')===dateIn).length>0
      const checkOut= data.unavailableDates.filter(e=>moment(e).format('D')===dateOut).length>0
      if(check || checkOut){
        console.log(Check);
        continue
      }else{
        let newArray = numberRoomFilter
        newArray.push(data)
        setNumberRoomFilter(newArray)
        setCheckDate(false)
      }
    }
  }
  useEffect(()=>{
    if(checkDate){
      Check()
    }
  },[checkDate])
    console.log("room?.roomNumbers",room?.roomNumbers);
    console.log("setNumberRoomFilter",numberRoomFilter);
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      spacing={4}
    >
      {data.map((e) => (
        <>
          <Box key={e._id} sx={{ flexGrow: 1 , border: "3px solid #febb02", borderRadius: "10px",padding: "10px"}}>
            <h2 style={{ marginBottom: "5px" }}>{e.title}</h2>
            <Grid container spacing={0}>
              <Grid item xs={4} mb={4}>
                <Card sx={{ width: 300, margin: "0 16px" ,border: "1px solid #febb02", borderRadius: "10px"}}>
                  <CardMedia
                    component="img"
                    height="140"
                    src={e.photos[0]}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: "5px" }}
                    >
                      Diện tích phòng: <b>{e.distance} m2</b>
                    </Typography>
                    <Typography variant="body" color="text.secondary">
                      {e.featured.map((i) => (
                        <Stack direction="row" spacing={2} marginBottom="3px">
                          <Chip key={i._id}
                            size="small"
                            icon={<CheckIcon color="success" />}
                            sx={{ backgroundColor: "pink" }}
                            label={i.name}
                          ></Chip>
                        </Stack>
                      ))}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ justifyContent: "center" }}
                    >
                    <Button
                      onClick={() => handleOnclickViewDetail(e)}
                      sx={{
                        bgcolor: "orange",
                        color: "black",
                        "&.MuiButtonBase-root": {
                          textTransform: "none",
                        },
                      }}
                      size="small"
                    >
                      Xem chi tiết
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={8} mb={4}>
                <Card sx={{ width: 640, mr: "10px",padding:"10px",border: "1px solid #febb02", borderRadius: "10px" }}>
                  {/* <CardMedia
                    component="img"
                    height="140"
                    src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1"
                    alt="green iguana"
                  /> */}
                  <CardContent sx={{display:"flex", padding:"10px"}}>
                    <Typography variant="body2" color="text.secondary" sx={{mr:"10px",fontWeight:"700"}}>
                      <BedIcon></BedIcon>
                      <span>{e.numberBed} giường</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{fontWeight:"700"}}>
                      <PeopleIcon></PeopleIcon>
                      Tối đa {e.numberAdult} người lớn, {e.numberChild} trẻ em
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="body" color="text.secondary">
                      {e.roomPolicy?.map((i) => (
                        <Stack direction="row" spacing={2} marginBottom="3px">
                          <Chip key={i._id}
                            icon={
                              <VerifiedUserIcon color="success"></VerifiedUserIcon>
                            }
                            sx={{ backgroundColor: "pink" }}
                            label={i.name}
                          ></Chip>
                        </Stack>
                      ))}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="body" color="text.secondary" sx={{fontWeight:"700", fontSize:"120%", color:"orange", display:"flex",flexDirection:"row-reverse"}}>
                      Giá : {FormatPrice(e.price)} / phòng / đêm
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ justifyContent: "center" }}
                      onClick={() => handleOnclickReverse(e)}
                    >
                    <Button
                      sx={{
                        justifyContent: "center",
                        bgcolor: "orange",
                        color: "black",
                        "&.MuiButtonBase-root": {
                          textTransform: "none",
                        },
                      }}
                      size="small"
                    >
                      Đặt ngay
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>     
        </>
      ))}

            {
              openModal && <Modal
              aria-labelledby="edit-modal-title"
              aria-describedby="edit-modal-description"
              open={true}
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Card
                sx={{
                  position: "absolute",
                  width: "20vw",
                  height: "20vh",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div style={{display:"flex", justifyContent:"flex-end", margin:"8px", cursor:"pointer"}}>
                    <CancelIcon onClick={handleClickClose} color="error"/>
                  </div>
                  <h2 className="h2-reverse">Mời chọn phòng:</h2>
                  {/* <Select
                  color="success"
                  sx={{ width: "150px" }}
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  placeholder="Chọn trạng thái"
                  value={numberRoom._id}
                  defaultValue={room.roomNumbers[0]._id}
                  onChange={handleChange}
                >
                  {room.roomNumbers.map((e, i) => (
                    <MenuItem key={i} value={e._id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select> */}
                  <Select
                  sx={{margin:"8px", width:"150px"}}
                native
                value={numberRoom}
                onChange={handleChange}
                defaultValue={room.roomNumbers[0]._id}
                input={<OutlinedInput label="Phòng"/>}
              >
                {room.roomNumbers.map((e)=>(
                  <option value={e._id}>{e.number}</option>
                ))}
              </Select>
                  <button style={{cursor:"pointer"}} onClick={handleClickChoose}>Chọn</button>

              </Card>
              </Modal>
            }

            {
              openReservation && (
                <Reservation open={openReservation} setOpen={setOpenReservation} dataReserve={dataReserve} setOpenModal={setOpenModal}/>
              )
            }

                      
            {
              openDetail && <Modal
              aria-labelledby="edit-modal-title"
              aria-describedby="edit-modal-description"
              open={true}
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Card
                sx={{
                  position: "absolute",
                  width: "90vw",
                  height: "90vh",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
              <Grid container>
                <Grid item xs={9}>
                {open && (
                  <div className="slider">
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="close"
                      onClick={() => setOpen(false)}
                    />
                    <FontAwesomeIcon
                      icon={faCircleArrowLeft}
                      className="arrow"
                      onClick={() => handleMove("l")}
                    />
                    <div className="sliderWrapper">
                      <img
                        src={dataDetail.photos[slideNumber]}
                        alt=""
                        className="sliderImg"
                      />
                    </div>
                      <FontAwesomeIcon
                        icon={faCircleArrowRight}
                        className="arrow"
                        onClick={() => handleMove("r")}
                      />
                  </div>
                )}
                  <div className="hotelImages">
                    {dataDetail.photos?.map((photo, i) => (
                      <div className="hotelImgWrapper" key={i}>
                        <img
                        onClick={() => handleOpen(i)}
                        src={photo}
                        alt=""
                        className="hotelImg"
                        />
                      </div>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div style={{display:"flex", justifyContent:"flex-end", margin:"8px", cursor:"pointer"}}>
                    <CancelIcon onClick={()=>setOpenDetail(false)} color="error"/>
                  </div>
                  <CardContent>
                    <h3>Thông tin phòng</h3>
                    <Typography variant="body" color="text.secondary" sx={{color:"black", display:"flex", flexDirection: "column",marginLeft:"10px"}}>
                      <span>Diện tích : {dataDetail.distance} m2</span>
                      <span>Số người tối đa : {dataDetail.maxPeople}</span>
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <h3>Tiện nghi phòng</h3>
                    <Typography variant="body" color="text.secondary" sx={{color:"black", display:"flex",flexDirection: "column",marginLeft:"10px"}}>
                      {dataDetail.featured.map((e)=>{
                        return(<span>{e.name}</span>)
                      })}
                    </Typography>
                  </CardContent>
                  <CardContent>
                  <h3>Chính sách phòng</h3>
                    <Typography variant="body" color="text.secondary" sx={{color:"black", display:"flex",flexDirection: "column",marginLeft:"10px"}}>
                      {dataDetail.roomPolicy.map((e)=>{
                        return(<span>{e.name}</span>)
                      })}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="body" color="text.secondary" sx={{fontWeight:"700", fontSize:"120%", color:"orange"}}>
                      Giá : {FormatPrice(dataDetail.price)} / phòng / đêm
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>

              </Card>
              </Modal>
            }         
    </Stack>
  );
};
export default RoomCard;
