import axios from "axios";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const fetchData = async () =>{
        setLoading(true)
        try {
            const res = await axios.get("/hotels/countByCity?cities=HCM,DANANG,HANOI,GIALAI")
            setData(res.data)
        } catch (err) {
          return err
        }
        setLoading(false)
    }
    fetchData()
},[])




  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://th.bing.com/th/id/R.3f3aa79e5351feb2e6d36875a0d87cbb?rik=jS%2f1AHrGfioe9A&pid=ImgRaw&r=0"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hồ Chí Minh</h1>
              <h2>{data[0]} Khách sạn</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://www.telegraph.co.uk/content/dam/travel/Spark/Hayes-and-Jarvis/HayesJarvis-da-nang-night-getty-xlarge.jpg?imwidth=1200"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Đà Nẵng</h1>
              <h2>{data[1]} Khách sạn</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://www.roadaffair.com/wp-content/uploads/2019/06/skyline-night-hanoi-vietnam-shutterstock_565108885.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hà Nội</h1>
              <h2>{data[2]} Khách sạn</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://th.bing.com/th/id/R.de9656ffefd21806a280efd483d14c7c?rik=HAKdoFzX1oE%2frw&pid=ImgRaw&r=0"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Gia Lai</h1>
              <h2>{data[2]} Khách sạn</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
