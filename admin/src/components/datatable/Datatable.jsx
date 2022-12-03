import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  MenuItem,
  Select,
  Modal,
  Backdrop,
  Card,
  Grid,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const path = location.pathname.split("/")[1];
  const [rePage,setRePage]=useState(false)
  const [List, setList] = useState();
  const [status, setStatus] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const [rowData, setRowData] = useState();

  const actions = [
    { id: 1, name: "Chờ xác nhận" },
    { id: 2, name: "Đã xác nhận" },
    { id: 3, name: "Đã nhận phòng" },
    { id: 4, name: "Huỷ" },
  ];

  const handleChangeStatus = (e) => {
    setRowData(e);
    setModalStatus(true);
  };
  const handleCloseModal = () => {
    setModalStatus(false);
    setStatus("");
  };
  const handleOnchangeSelectOption = (e) => {
    setStatus(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/${path}`, {});
        if (path === "users") {
          const newData = response.data?.filter((e) => e._id !== user._id);
          setList(newData);
        } else {
          setRePage(false)
          setList(response.data);
        }
      } catch (e) {
        throw new Error();
      }
    };
    fetchData();
  }, [path,rePage]);

  const handleCofirm=async()=>{
    const body = {
      status: actions.find(e=>e.id===status)
    } 
    const id= rowData._id
    try {
      const res = await axios.put(`/${path}/${id}`,body)
      if(res.data.success){
        setModalStatus(false)
        setRePage(true)
      }
    } catch (error) {
      return error
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(List.filter((item) => item._id !== id));
    } catch (err) {}
  };

  console.log("row",rowData);

  const statusColumn = [
    {
      field: "action",
      headerName: "",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleChangeStatus(params.row)}
            >
              Thay đổi trạng thái
            </div>
          </div>
        );
      },
    },
    // {
    //   field: "status",
    //   headerName: "Trạng thái",
    //   width: 200,
    //   renderCell: (params) => {
    //     return (
    //       <div>
    //          <Select sx={{width:'180px'}}
    //                 labelId="demo-controlled-open-select-label"
    //                 value={status}
    //                 id="demo-controlled-open-select"
    //                 onChange={handleChangeStatus}
    //               >
    //                 {action.map((e, i) => (
    //                   <MenuItem key={i} value={e}>
    //                     {e.name}
    //                   </MenuItem>
    //                 ))}
    //               </Select>
    //       </div>
    //     );
    //   },
    // },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link> */}
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
        columns={
          path === "reservations"
            ? columns.concat(statusColumn)
            : columns.concat(actionColumn)
        }
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
      {modalStatus && (
        <Modal
          aria-labelledby="edit-modal-title"
          aria-describedby="edit-modal-description"
          open={modalStatus}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Card
            sx={{
              position: "absolute",
              width: "48vw",
              height: "40vh",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              onClick={() => handleCloseModal()}
              style={{
                display: "flex",
                justifyContent: "end",
                margin: "16px",
                cursor: "pointer",
              }}
              className="rContainer"
            >
              <CancelIcon sx={{ width: "30px", height: "30px" }} />
            </div>
            <Grid container>
              <Grid item xs={12} sx={{ ml: "32px", fontWeight: "600" }}>
                <TextField
                  color="error"
                  sx={{ mb: 4, mr: 4, width: "250px" }}
                  id="outlined-disabled"
                  label="Tên khách hàng"
                  defaultValue={rowData.nameReservator}
                />
                <TextField
                color="error"
                  sx={{ mb: 4, mr: 4, width: "250px" }}
                  id="outlined-disabled"
                  label="Số điện thoại"
                  defaultValue={rowData.phoneReservator}
                />
                <Select
                color="success"
                  sx={{ width: "250px"}}
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  placeholder="Chọn trạng thái"
                  value={status.id}
                  defaultValue={rowData.status.id}
                  onChange={handleOnchangeSelectOption}
                >
                  {actions.map((e, i) => (
                    <MenuItem key={i} value={e.id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sx={{ ml: "32px" }}>
                <TextField
                color="error"
                  sx={{ mb: 4, mr: 4, width: "250px" }}
                  id="outlined-disabled"
                  label="Tên phòng"
                  defaultValue={rowData.nameRoom}
                />

                <TextField
                color="error"
                  sx={{ mb: 4, mr: 4, width: "250px" }}
                  id="outlined-disabled"
                  label="Số phòng"
                  defaultValue={rowData.numberRoom}
                />
              </Grid>
              <Grid item xs={12} sx={{ ml: "32px" }}>
                <TextField
                color="error"
                  sx={{ mr: 4, width: "250px" }}
                  id="outlined-disabled"
                  label="Ngày nhận phòng"
                  defaultValue={moment(rowData.dateCheckIn).format(
                    "DD/MM/YYYY"
                  )}
                />
                <TextField
                color="error"
                  sx={{ mr: 4, width: "250px" }}
                  id="outlined-disabled"
                  label="Ngày trả phòng"
                  defaultValue={moment(rowData.dateCheckOut).format(
                    "DD/MM/YYYY"
                  )}
                />
                <div onClick={()=>handleCofirm()}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  margin: "0 32px 32px 0",
                }}
              >
                <button style={{backgroundColor: "orange",height: "40px", width: "100px",cursor:"pointer" }}>
                  Cập nhật
                </button>
              </div>
              </Grid>
              
            </Grid>
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default Datatable;
