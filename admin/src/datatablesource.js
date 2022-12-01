import moment from "moment"
export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const reserveColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "nameReservator",
    headerName: "Tên khách hàng",
    width: 200,
  },
  {
    field: "nameRoom",
    headerName: "Tên phòng",
    width: 200,
  },
  {
    field: "numberRoom",
    headerName: "Số phòng",
    width: 100,
  },
  {
    field: "dateCheckIn",
    headerName: "Từ ngày",
    valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY"),
    width: 150,
  },
  {
    field: "dateCheckOut",
    headerName: "Đến ngày",
    valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY"),
    width: 150,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 100,
  },
  {
    field: "phoneReservator",
    headerName: "Số điện thoại",
    width: 150,
  },
  {
    field: "",
    headerName: "Thành tiền",
    width: 150,
    renderCell: (params) => {

      const dateIn = moment(params.row.dateCheckIn).format("DD")
      const MonthIn = moment(params.row.dateCheckIn).format("MM")
      const dateOut = moment(params.row.dateCheckOut).format("DD")
      const MonthOut = moment(params.row.dateCheckOut).format("MM")
      if(MonthOut>MonthIn){
        return (
          `${params.row.price * dateOut+30-dateIn||0}.000 VNĐ`
        );
      }else{
        return (
          `${params.row.price * dateOut-dateIn+1||0}.000 VNĐ`
        );
      }
      
    },
  },
];
