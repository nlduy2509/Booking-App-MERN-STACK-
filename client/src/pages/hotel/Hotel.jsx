import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState , useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import RoomCard from "../rooms/room.jsx"

const Hotel = () => {
  
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [data, setData] = useState([]);
  const [dates,setDates]= useState(location.state.dates)
  
  console.log("location",location);
  //const {data, loading, error} = useFetch(`/hotels/find/${id}`)

  useEffect(()=>{
    const fetchDataRooms = async()=>{
      try {
        const response = await axios.get(`/hotels/room/${id}`, {
        });
        setRooms(response.data)
      } catch (e) {
        throw new Error();
      }
    }
    const fetchDataHotel = async()=>{
      try {
        const response = await axios.get(`/hotels/find/${id}`, {
        });
        setData(response.data)
      } catch (e) {
        throw new Error();
      }
    }
    fetchDataRooms() 
    fetchDataHotel() 

  },[id])


  // const {dates, options} = useContext(SearchContext)

  // const {user } = useContext(AuthContext);

  // const navigate = useNavigate()

  // const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  // function dayDifference(date1, date2) {
  //   const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  //   const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  //   return diffDays;
  // }

  // const days = dayDifference(dates[0].endDate, dates[0].startDate)


  // const handleClick = () =>{
  //   if (user) {
  //     setOpenModal(true);
  //   } else {
  //     navigate("/login");
  //   }
  // }

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

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {(
          <div className="hotelContainer">
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
                  src={data.photos[slideNumber]}
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
          
          <div className="hotelWrapper">
            <h1 className="hotelTitle"><h2>Khách sạn : {data.name}</h2></h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            {/* roomCard */}
            <RoomCard data={rooms} dataHotel={data} dates={dates}/>
            <br/>
            <span className="hotelDistance">
              Địa điểm tuyệt vời – {data.distance}m đến trung tâm thành phố
            </span>
            <span className="hotelPriceHighlight">
              Thuê ngay với giá {data.cheapestPrice}.000 VND đã bao gồm thuế và phí di chuyển
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
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
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
            </div>
          </div>
          
          <MailList />
          <Footer />
        </div>
      )}
      </div>
  );
};

export default Hotel;
