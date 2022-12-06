import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

import FilterHotels from "./filter/FilterHotels";
import { useEffect } from "react";
import axios from "axios";

const ListData = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const [allHotel,setAllHotel]=useState([])

  // const { data, loading, error, reFetch } = useFetch(
  //   `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  // );

  useEffect(()=>{
    const fetchData=async()=>{
      const res = await axios.get(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
      setAllHotel(res.data)
    }
    fetchData()
  },[])

  console.log("allHotels",allHotel);
  

  const handleClick = () => {
    // reFetch();
  };

  const [checkedRating, setCheckedRating] = useState([]);
  const [checkedFeatured, setCheckedFeatured] = useState([]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="list">
            <div className="listSearch">
              <h1 className="lsTitle">Tìm kiếm</h1>
              <div className="lsItem">
                <label>Tên địa điểm</label>
                <input placeholder={destination} type="text" />
              </div>
              <div className="lsItem">
                <label>Ngày nhận-trả phòng</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  dates[0].startDate,
                  "dd/MM/yyyy"
                )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                )}
              </div>
              <div className="lsItem">
                <label>Tùy chọn</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Giá thấp nhất <small>một đêm</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Giá cao nhất <small>một đêm</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Người lớn</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.adult}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Trẻ em</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      placeholder={options.children}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Phòng</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.room}
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>Tìm kiếm</button>
            </div>
            <div className="filter">
              <h2 style={{ marginBottom: "8px" }}>Chọn lọc theo: </h2>
              <FilterHotels
                allHotel={allHotel}
                setAllHotel={setAllHotel}
                checkedRating={checkedRating}
                setCheckedRating={setCheckedRating}
                checkedFeatured={checkedFeatured}
                setCheckedFeatured={setCheckedFeatured}
              />
            </div>
          </div>

          <div className="listResult">
            <h2>Danh sách các khách sạn phù hợp</h2>
            <br />
                {allHotel.map((item) => (
                  <SearchItem dates={dates} item={item} key={item._id} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListData;
