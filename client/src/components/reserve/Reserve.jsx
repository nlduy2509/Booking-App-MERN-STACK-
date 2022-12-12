import "./Reserve.scss";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Alert, Backdrop, Card, Grid, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import FormatPrice from "../Format/Format";
// ----------------------------------------------------------------------

export default function Reservation(props) {
  const { open, setOpen, dataReserve, setOpenModal } = props;
  const [total, setTotal] = useState("");
  const [check, setCheck] = useState(false);
  // const [dateFromTo, setDateFromTo] = useState([]);
  const navigate = useNavigate();

  const handleClickConfirm = async () => {
    const body = {
      idUser:dataReserve[4]._id,
      nameReservator: dataReserve[4].fullName,
      phoneReservator: dataReserve[4].phone,
      mailReservator: dataReserve[4].email,
      idHotel: dataReserve[0]._id,
      nameHotel: dataReserve[0].name,
      address: dataReserve[0].address,
      idRoom: dataReserve[1]._id,
      nameRoom: dataReserve[1].title,
      price: dataReserve[1].price,
      dateCheckIn: moment(dataReserve[3][0].startDate).format(),
      dateCheckOut: moment(dataReserve[3][0].endDate).format(),
      idNumberRoom: dataReserve[2]._id,
      numberRoom: dataReserve[2].number,
      status:{ id: 1, name: "Chờ xác nhận" }
    };
    console.log("body",body);
    try {
      const res = await axios.post(
        `/reservations/create/${dataReserve[4]._id}`,
        body
      );
      if (res.status === 200) {
        // try {
        //   await axios.put(`/rooms/availability/${dataReserve[2]._id}`,{
        //     dates:dateFromTo
        //   })
        // } catch (error) {
        //   return error
        // }
        setCheck(true);
        setTimeout(() => {
          setOpen(false);
          setOpenModal(false);
        }, 2000);
      }
    } catch (error) {
      return error;
    }
  };
  console.log("dataReserve",dataReserve);
  useEffect(() => {
    const dateIn = moment(dataReserve[3][0].startDate).format("D");
    const MonthIn = moment(dataReserve[3][0].startDate).format("M");
    const dateOut = moment(dataReserve[3][0].endDate).format("D");
    const MonthOut = moment(dataReserve[3][0].endDate).format("M");
    const Year = moment(dataReserve[3][0].endDate).format("YYYY");


    if (MonthOut > MonthIn) {
      setTotal(FormatPrice(dataReserve[1].price * (dateOut + 30 - dateIn + 1)));
      // setTotal(`${dataReserve[1].price * (dateOut + 30 - dateIn + 1)}.000 VNĐ`);
    } else {
      // const DFT = [];
      // for (let i = parseInt(dateIn); i <= parseInt(dateOut); i++) {
      //   DFT.push(`${i}/${MonthIn}/${Year}`);
      // }
      // setDateFromTo(DFT);
      setTotal(FormatPrice(dataReserve[1].price * (dateOut - dateIn + 1)));
      // setTotal(`${dataReserve[1].price * (dateOut - dateIn + 1)}.000 VNĐ`);
    }
  }, []);
   console.log("dateFromTo",dataReserve[4]);
  return (
    <Modal
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
      open={open}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Card
        sx={{
          position: "absolute",
          width: "75vw",
          height: "75vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="new">
          <div className="newContainer">
            <div className="top">
              <h1>Tạo mới đặt chỗ</h1>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="rClose"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="bottom">
              <div className="right">
                <form>
                  <div className="formInput">
                    <label>Tên</label>
                    <input
                      disabled="true"
                      type="input"
                      value={dataReserve[4].fullName}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="formInput">
                    <label>Số điện thoại</label>
                    <input
                      disabled= {dataReserve[4].phone===""?false:true}
                      required="true"
                      type="input"
                      value={dataReserve[4].phone}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="formInput">
                    <label>Email</label>
                    <input
                      disabled="true"
                      type="input"
                      value={dataReserve[4].email}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="formInput">
                    <label>Khách sạn</label>
                    <input
                      disabled="true"
                      type="text"
                      value={dataReserve[0].name}
                    />
                  </div>
                  <div className="formInput">
                    <label>Tên Phòng</label>
                    <input
                      disabled="true"
                      type="Text"
                      value={dataReserve[1].title}
                    />
                  </div>
                  <div className="formInput">
                    <label>Số phòng</label>
                    <input
                      disabled="true"
                      type="text"
                      value={dataReserve[2].number}
                    />
                  </div>
                  <div className="formInput">
                    <label>Địa chỉ</label>
                    <input
                      disabled="true"
                      type="text"
                      value={dataReserve[0].address}
                    />
                  </div>
                  <div className="formInput">
                    <label>Ngày vào</label>
                    <input
                      disabled="true"
                      type="text"
                      value={moment(dataReserve[3][0].startDate).format(
                        "DD/MM/YYYY"
                      )}
                    />
                  </div>
                  <div className="formInput">
                    <label>Ngày ra</label>
                    <input
                      disabled="true"
                      type="text"
                      value={moment(dataReserve[3][0].endDate).format(
                        "DD/MM/YYYY"
                      )}
                    />
                  </div>
                  <div className="formInput">
                    <label>Giá phòng</label>
                    <input
                      disabled="true"
                      type="text"
                      value={FormatPrice(dataReserve[1].price)}
                      // value={`${dataReserve[1].price}.000 VNĐ`}
                    />
                  </div>
                  <div className="formInput">
                    <h3>Tổng tiền: {total}</h3>
                  </div>
                </form>
                <div style={{display:'flex',justifyContent:'flex-end', margin:"0 8px 8px 0"}}>
                  
                <button className="buttonCF" onClick={handleClickConfirm}>Xác nhận</button>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
        {check && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={check}
            autoHideDuration={1000}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              Bạn đã đặt phòng thành công
            </Alert>
          </Snackbar>
        )}
      </Card>
    </Modal>
  );
}
