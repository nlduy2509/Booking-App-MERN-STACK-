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
  Snackbar,
  Alert,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const { state } = useLocation();
  const { user } = useContext(AuthContext);

  const path = location.pathname.split("/")[1];
  const [rePage, setRePage] = useState(false);
  const [List, setList] = useState();
  const [status, setStatus] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [dateFromTo, setDateFromTo] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const actions = [
    { id: 1, name: "Chờ xác nhận" },
    { id: 2, name: "Đã xác nhận" },
    { id: 3, name: "Huỷ" },
    { id: 4, name: "Đã trả phòng" },
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
        }
        if (path === "reservations") {
          if(state==="waiting"){
            const newData = response.data.filter(e=>e.status.id===1)
            newData.reverse()
            setList(newData);
          }else if(state==="confirm"){
            const newData = response.data.filter(e=>e.status.id===2)
            newData.reverse()
            setList(newData);
          }
          else if(state==="cancel"){
            const newData = response.data.filter(e=>e.status.id===3)
            newData.reverse()
            setList(newData);
          }
          else{
            const newData = response.data.reverse();
            setList(newData);
          }
          setRePage(false);
          setTimeout(() => {
            setOpenSnackbar(false);
          }, 1000);
        } else {
          const newData = response.data
            newData.reverse()
            setList(newData);
        }
      } catch (e) {
        throw new Error();
      }
    };
    fetchData();
  }, [path, rePage]);

  // useEffect(()=>{

  //   console.log("row",rowData);
  // },[rowData])

  console.log("state", state);

  //==============Confirm Status================
  const handleCofirm = async () => {
    const dateIn = moment(rowData.dateCheckIn).format("D");
    const MonthIn = moment(rowData.dateCheckIn).format("M");
    const dateOut = moment(rowData.dateCheckOut).format("D");
    const MonthOut = moment(rowData.dateCheckOut).format("M");
    const Year = moment(rowData.dateCheckIn).format("YYYY");
    const DFT = [];

    if (MonthOut > MonthIn) {
      for (let i = parseInt(dateIn); i <= (parseInt(dateOut)+30); i++) {
        if(i>30){
          if(i-30>=10){
            if(MonthOut>=10){
              DFT.push(`${Year}-${MonthOut}-${i-30}T14:00:00`);
            }else{
              DFT.push(`${Year}-0${MonthOut}-${i-30}T14:00:00`);
            }
          }else{
            if(MonthOut>=10){
              DFT.push(`${Year}-${MonthOut}-0${i-30}T14:00:00`);
            }else{
              DFT.push(`${Year}-0${MonthOut}-0${i-30}T14:00:00`);
            }
          }
        }else{
          if(MonthIn>=10){
            DFT.push(`${Year}-${MonthIn}-${i}T14:00:00`);          
          }else{
            DFT.push(`${Year}-0${MonthIn}-${i}T14:00:00`);
          }
        }
      }
    } else {
      for (let i = parseInt(dateIn); i <= parseInt(dateOut); i++) {
        if(i>=10){
          if(MonthIn>=10){

            DFT.push(`${Year}-${MonthIn}-${i}T14:00:00`);
          }else{
            DFT.push(`${Year}-0${MonthIn}-${i}T14:00:00`);

          }
        }else{
          if(MonthIn>=10){

            DFT.push(`${Year}-${MonthIn}-0${i}T14:00:00`);
          }else{
            DFT.push(`${Year}-0${MonthIn}-0${i}T14:00:00`);

          }
        }
      }
    }

    const body = {
      status: actions.find((e) => e.id === status),
    };
    const id = rowData._id;

    const idNumberRoom = rowData.idNumberRoom;

    try {
      const res = await axios.put(`/${path}/${id}`, body);
      if (status === 1) {
        await axios.put("/rooms/roomcancel/", {
          id: idNumberRoom,
          numberRoom: rowData.numberRoom,
          dates: DFT.map((e) => moment(e).format()),
        });
      }
      if (status === 2) {
        await axios.put(`/rooms/availability/${idNumberRoom}`, {
          dates: DFT,
        });
      }
      if (status === 3) {
        await axios.put("/rooms/roomcancel/", {
          id: idNumberRoom,
          numberRoom: rowData.numberRoom,
          dates: DFT.map((e) => moment(e).format()),
        });
      }
      if (status === 4) {
        await axios.put("/rooms/roomcancel/", {
          id: idNumberRoom,
          numberRoom: rowData.numberRoom,
          dates: DFT.map((e) => moment(e).format()),
        });
      }
      if (res.data.success) {
        setOpenSnackbar(true);
        setTimeout(() => {
          setModalStatus(false);
        }, 1000);
        setRePage(true);
      }
    } catch (error) {
      return error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(List.filter((item) => item._id !== id));
    } catch (err) {}
  };

  console.log("rowData", rowData);

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
        // checkboxSelection
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
                  sx={{ width: "250px" }}
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
                <div
                  onClick={() => handleCofirm()}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    margin: "0 32px 32px 0",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "orange",
                      height: "40px",
                      width: "100px",
                      cursor: "pointer",
                    }}
                  >
                    Cập nhật
                  </button>
                </div>
              </Grid>
            </Grid>
            {openSnackbar && (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openSnackbar}
                autoHideDuration={1000}
              >
                <Alert severity="success" sx={{ width: "100%" }}>
                  Cập nhật thành công
                </Alert>
              </Snackbar>
            )}
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default Datatable;
