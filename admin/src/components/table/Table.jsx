import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

const List = ({reservations}) => {

  let rows = reservations.map(e=>({
      nameReservator:e.nameReservator,
        nameHotel:e.nameHotel,
        nameRoom:e.nameRoom,
        numberRoom:e.numberRoom,
        dateCheckIn:moment(e.dateCheckIn).format("DD/MM/YYYY"),
        dateCheckOut:moment(e.dateCheckOut).format("DD/MM/YYYY"),
        status:e.status,
        id:e._id         
  }))
  rows=rows.reverse().slice(0,5)

  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tên khách hàng</TableCell>
            <TableCell className="tableCell">Khách sạn</TableCell>
            <TableCell className="tableCell">Tên phòng</TableCell>
            <TableCell className="tableCell">Số Phòng</TableCell>
            <TableCell className="tableCell">Ngày vào</TableCell>
            <TableCell className="tableCell">Ngày ra</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.nameReservator}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {/* <img src={row.img} alt="" className="image" /> */}
                  {row.nameHotel}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.nameRoom}</TableCell>
              <TableCell className="tableCell">{row.numberRoom}</TableCell>
              <TableCell className="tableCell">{row.dateCheckIn}</TableCell>
              <TableCell className="tableCell">{row.dateCheckOut}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status.id===1?"waiting":"Approved"}`}>{row.status.name}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
