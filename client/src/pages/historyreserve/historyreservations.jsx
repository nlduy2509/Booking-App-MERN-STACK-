import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./historyreserve.css";
import { AuthContext } from "../../context/AuthContext";

const Historyreservations = ({columns}) =>{
    const { user } = useContext(AuthContext);
    const [List, setList] = useState([]);


    // const fetchData = async () => {
    //     const response = await axios.get(`/reservations/${user._id}`,{});
    //     console.log("data", response.data);
    //     setList(response.data)
    //     console.log("List", List)
    // };
          
    useEffect(()=>{
      const fetchData = async () => {
        const response = await axios.get(`/reservations/${user._id}`,{});
        console.log("data", response.data);
        setList(response.data)
        console.log("List", List)
    };
      fetchData(); 
     
    },[])

    return(
        <div>
        <h1>history</h1>
        <DataGrid
            className="datagrid"
            rows={List}
            columns={columns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row._id}
        />
        </div>
    )
}

export default Historyreservations