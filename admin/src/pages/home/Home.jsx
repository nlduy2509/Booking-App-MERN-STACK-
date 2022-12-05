import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

import { useEffect, useState } from "react";
import axios from "axios";


const Home = () => {
  const [reservations,setReservations] = useState([])


  useEffect(()=>{
    const fetchData = async()=>{
      const res =  await axios.get('/reservations')
      setReservations(res.data)
    }
    fetchData()
    
  },[])
  console.log("res",reservations);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget reservations={reservations} type="reservations" />
          <Widget reservations={reservations} type="waiting" />
          <Widget reservations={reservations} type="confirm" />
          <Widget reservations={reservations} type="cancel" />
        </div>
        <div className="charts">
          {/* <Featured /> */}
          <Chart reservations={reservations} title="Doanh thu 6 tháng gần đây" aspect={4 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Danh sách các đơn đặt phòng gần đây</div>
          <Table reservations={reservations} />
        </div>
      </div>
    </div>
  );
};

export default Home;
