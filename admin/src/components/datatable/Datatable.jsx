import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Datatable = ({columns}) => {
  const location = useLocation()
  const path = location.pathname.split("/")[1]
  const [List, setList] = useState();

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await axios.get(`/${path}`, {
        });
        setList(response.data)
      } catch (e) {
        throw new Error();
      }
    }
    fetchData()
    

  },[path])

  const handleDelete = async (id) => {
    try{
      await axios.delete(`/${path}/${id}`)
      setList(List.filter((item) => item._id !== id));
    }
    catch(err){}
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];


  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={List}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
