import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";

const Widget = ({ type, reservations }) => {
  const navigate =  useNavigate()
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "reservations":
      data = {
        path:"reservations",
        type:"reservations",
        title: "Tất cả đơn đã đặt",
        count:`${reservations.length||0}`,
        link: "Xem tất cả đơn đặt hàng",
        icon: (
          <LocalHotelIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "waiting":
      data = {
        path:"reservations",
        type:"waiting",
        title: "Đơn chờ xác nhận",
        count:`${reservations.filter(e=>e.status.id===1).length||0}`,
        link: "Xem các đơn chờ xác nhận",
        icon: (
          <HourglassTopIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "rgb(243, 239, 17)",
            }}
          />
        ),
      };
      break;
    case "confirm":
      data = {
        path:"reservations",
        type:"confirm",
        title: "Đơn đã xác nhận",
        count:`${reservations.filter(e=>e.status.id===2).length||0}`,
        link: "Xem các đơn đã xác nhận",
        icon: (
          <CheckIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "cancel":
      data = {
        path:"reservations",
        type:"cancel",
        title: "Đơn đã huỷ",
        count:`${reservations.filter(e=>e.status.id===3).length||0}`,
        link: "Xem các đơn đã huỷ",
        icon: (
          <DeleteForeverIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  const handleClickLink=(value)=>{
    navigate(`/${value.path}`,{state:value.type})
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          Tổng đơn: <span className="count">{data.count}</span>
        </span>
        <span onClick={()=>handleClickLink(data)} className="link">{data.link}</span>
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
