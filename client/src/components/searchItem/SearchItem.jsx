import { Link, useNavigate } from "react-router-dom";
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
        <span className="siDistance">{item.distance}m đến trung tâm thành phố</span>
        <span className="siTaxiOp">Miễn phí đưa đón</span>
        <span className="siSubtitle">
          Đầy đủ nội thất
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Hủy miễn phí </span>
        <span className="siCancelOpSubtitle">
        Bạn có thể hủy sau, vì vậy hãy chọn mức giá tuyệt vời ngay hôm nay!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice}.000 VND</span>
          <span className="siTaxOp">Đã bao gồm thuế và phí</span>
          <button onClick={()=>handleClickSeeAvai()} className="siCheckButton">Xem chi tiết</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
