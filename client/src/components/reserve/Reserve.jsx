import "./Reserve.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Backdrop,
  Card,
  Grid,
  Modal,
} from '@mui/material';
// ----------------------------------------------------------------------



export default function Reservation(props) {
  const {open,setOpen, dataReserve} = props
  console.log("props",props)

  const handleClick = async (e) => {
    // e.preventDefault(); 
    // const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    // try {
    //   await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
    //   alert("Successfully")
    // } catch (err) {
    //   console.log(err);
    // }
  };
  console.log('aaaa',dataReserve)

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
          position: 'absolute',
          width: '50vw',
          height: '50vh',   
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
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
                    type="input"
                    placeholder="Vui lòng nhập tên.."
                    onChange={()=>{}}
                  />
                </div>
            <div className="formInput">
                  <label>Số điện thoại</label>
                  <input
                  required = "true"
                    type="input"
                    placeholder="Vui lòng nhập số điện thoại"
                    onChange={()=>{}}
                  />
                </div>
            <div className="formInput">
                  <label>Email</label>
                  <input
                    type="input"
                    placeholder="abc@gmail.com"
                    onChange={()=>{}}
                  />
                </div>
            <div className="formInput">
                  <label>Khách sạn</label>
                  <input
                  disabled="true"
                    type="text"
                    placeholder={dataReserve[0].name}
                  />
                </div>
            <div className="formInput">
                  <label>Tên Phòng</label>
                  <input
                  disabled="true"
                    type="Text"
                    placeholder={dataReserve[1].title}
                  />
                </div>
            <div className="formInput">
                  <label>Số phòng</label>
                  <input
                  disabled="true"
                    type="text"
                    placeholder={dataReserve[2].number}
                  />
                </div>
            <div className="formInput">
                  <label>Giá phòng</label>
                  <input
                  disabled="true"
                    type="text"
                    placeholder={`${dataReserve[1].price}.000 VNĐ`}
                  />
                </div>
              
              <button onClick={handleClick}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
      </Card>
    </Modal>
  );
}
