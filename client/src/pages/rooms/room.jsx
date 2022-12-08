import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Grid, Stack, Box, Paper, Chip } from "@mui/material";
import BedIcon from '@mui/icons-material/Bed';

import Snackbar from "@mui/material/Snackbar";
import { AuthContext } from "../../context/AuthContext";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PeopleIcon from '@mui/icons-material/People';

import "./room.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { margin } from "@mui/system";

import { BrowserRouter, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Reservation from "../../components/reserve/Reserve";
import CheckIcon from '@mui/icons-material/Check';

import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RoomCard = (props) => {
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState([]);
  const [numberRoom, setNumberRoom] = useState("");
  const [dataReserve, setDataReserve] = useState([]);
  const { data, dataHotel, dates } = props;

  const navigate = useNavigate();

  const handleOnclickReserve = (data) => {
    if (!user) {
      navigate("/login");
    } else {
      setOpenModal(true);
      setRoom(data);
    }
  };
  const handleChange = (event) => {
    setNumberRoom(event.target.value);
  };

  const handleClick = () => {
    if (numberRoom.length === 0) {
      console.log("Chưa có phòng");
    } else {
      const newDataReserve = [dataHotel];
      newDataReserve.push(room);
      newDataReserve.push(numberRoom);
      newDataReserve.push(dates);
      newDataReserve.push(user);
      setDataReserve(newDataReserve);
      setOpen(true);
    }
  };
  const handleClickClose = () => {
    setOpenModal(false);
    setNumberRoom([]);
  };
  console.log("aaa",numberRoom);
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      spacing={1}
    >
      {data.map((e) => (
        <>
          <Box sx={{ flexGrow: 1, backgroundColor : "#BABABA"}}>
            <h2 style={{marginBottom : "5px"}} >{e.title}</h2>
            <Grid container spacing={0}>
           <Grid item xs={4} mb={4}>
            <Card sx={{ width: 300, margin: "0 16px"  }}>
              <CardMedia
                component="img"
                height="140"
                src={e.photos[0]}
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{mb : "5px"}}>
                  Diện tích phòng: <b>{e.distance} m2</b>
                </Typography>
                <Typography variant="body" color="text.secondary">
                  {e.featured.map(i=>(<Stack direction="row" spacing={2} marginBottom = "3px"><Chip icon={<CheckIcon color="success"></CheckIcon>} sx={{backgroundColor : "pink"}} label={i.name} ></Chip></Stack>))}
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent: "center"
            }} onClick={() => handleOnclickReserve(e)}>
                  <Button
                    sx={{
                      justifyContent:"center",
                      bgcolor: "orange",
                      color:"black",
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
            <Card sx={{ width: 655.2, margin: "0 16px" }}>
              <CardMedia
                component="img"
                height="140"
                src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1"
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">     
                    <BedIcon></BedIcon>
                    <span>{e.numberBed} giường</span>     
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <PeopleIcon></PeopleIcon>
                  Tối đa {e.numberAdult} người lớn, {e.numberChild} trẻ em
                </Typography>
                <Typography variant="body" color="text.secondary">
                  {e.roomPolicy?.map(i=>(<Stack direction="row" spacing={2} marginBottom = "3px"><Chip icon={<VerifiedUserIcon color="success"></VerifiedUserIcon>} sx={{backgroundColor : "pink"}} label={i.name} ></Chip></Stack>))}
                </Typography>
                <Typography variant="body" color="text.secondary">
                  Giá : {e.price}.000 VNĐ
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent: "center"
            }} onClick={() => handleOnclickReserve(e)}>
                  <Button
                    sx={{
                      justifyContent:"center",
                      bgcolor: "orange",
                      color:"black",
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
    </Stack>
  );
};
export default RoomCard;
