import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

import { useEffect } from "react";
import axios from "axios";
import FilterHotel from "./filter/FilterHotel";

const ListData = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const [allHotel,setAllHotel]=useState([])
  const [hotelsFilter,setHotelsFilter]=useState([])
  
  const [checkedRating, setCheckedRating] = useState([]);
  const [checkedFeatured, setCheckedFeatured] = useState([]);
  const [hotelsFilterRating, setHotelFilterRating] = useState([])
  const [hotelsFilterFeatured, setHotelFilterFeatured] = useState([])

  // const { data, loading, error, reFetch } = useFetch(
  //   `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  // );

  useLayoutEffect(()=>{
    const fetchData=async()=>{
      const res = await axios.get(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
      setAllHotel(res.data)
    }
    fetchData()
  },[])

  const handleClick = () => {
    // reFetch();
  };
  const array_is_unique = (arrayA, arrayB) =>{
    let array = []
    for (let index = 0; index < arrayA.length; index++) {
        for (let items = 0; items < arrayB.length; items++) {
            if(arrayA[index]._id === arrayB[items]._id){
                array = array.concat(arrayA[index])
                break
            }
        }
    }
    setHotelsFilter(array)
  }
  useEffect(()=>{
    array_is_unique(hotelsFilterRating,hotelsFilterFeatured)
  },[checkedFeatured,checkedRating])
 



  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="list">
            <div className="listSearch">
              Sắp xếp kết quả
            </div>
             
            <div className="filter">
              <h2 style={{ marginBottom: "8px" }}>Chọn lọc theo: </h2>
              <FilterHotel
                allHotel={allHotel}
                checkedRating={checkedRating}
                setCheckedRating={setCheckedRating}
                checkedFeatured={checkedFeatured}
                setCheckedFeatured={setCheckedFeatured}
                setHotelsFilter={setHotelsFilter}
                hotelsFilter={hotelsFilter}
                hotelsFilterRating={hotelsFilterRating}
                setHotelFilterRating={setHotelFilterRating}
                hotelsFilterFeatured={hotelsFilterFeatured}
                setHotelFilterFeatured={setHotelFilterFeatured}
              />
            </div>
          </div>

          <div className="listResult">
            <h2>Danh sách các khách sạn phù hợp</h2>
            <br />
            {
              checkedRating.length===0 && checkedFeatured.length===0?allHotel.map((item) => {
                console.log("step one")
                return(<SearchItem dates={dates} item={item} key={item._id} />)
              }      
              ):(
              (checkedRating.length>0 && checkedFeatured.length>0) ? 
                  hotelsFilter.map((item)=>{
                  console.log("step-two")
                  return(<SearchItem dates={dates} item={item} key={item._id} />)
                  }
              ):(checkedRating.length>0? hotelsFilterRating.map((item)=>{
                console.log("step-three")
                return(<SearchItem dates={dates} item={item} key={item._id} />)
              }):hotelsFilterFeatured.map((item)=>{
                console.log("step-four")
                return(<SearchItem dates={dates} item={item} key={item._id} />)
              }))
              )
            }
                
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListData;
