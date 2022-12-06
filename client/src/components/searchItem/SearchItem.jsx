import { Link, useNavigate } from "react-router-dom";
// import Rating from '@mui/material/Rating';
import {Rating,Box,Stack,Chip} from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi';
import "./searchItem.css";

const SearchItem = ({ item , dates}) => {
  const navigate= useNavigate()
  const handleClickSeeAvai=()=>{
    navigate(`/hotels/${item._id}`,{state:{dates}})
  }
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >

        <Rating name="read-only" value={item.rating} readOnly />
    </Box>
        
        <span className="siDistance">{item.distance}km đến trung tâm thành phố</span>
        <ul>
          {item.featured.map((e)=>(
            <li key={e._id}>{e.name}</li>
            ))}
        </ul>

        <Stack direction="row" spacing={1}>
      <Chip sx={{backgroundColor:'pink'}} icon={<WifiIcon/>} label="Wifi free" />
      <Chip label="Chip Outlined" variant="outlined" />
    </Stack>
            
        {/* <span className="siFeatures">{item.desc}</span> */}
        <span className="siCancelOp">Hủy phòng miễn phí </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          {/* <span>Excellent</span> */}
          {/* <button>{item.rating}</button> */}
          <span className="siTaxiOp">Miễn phí đưa đón</span>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice"> giá chỉ từ: {item.minPrice} VND</span>
          <span className="siTaxOp">Đã bao gồm thuế và phí</span>
          <button style={{width:"180px"}} onClick={()=>handleClickSeeAvai()} className="siCheckButton">Xem chi tiết</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
