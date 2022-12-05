import moment from "moment"
export const userColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "fullName",
    headerName: "Họ và tên",
    width: 250,
  },
  {
    field: "User",
    headerName: "Tên đăng nhập",
    width: 300,
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
    headerName: "Mail",
    width: 300,
  },

  // {
  //   field: "country",
  //   headerName: "Country",
  //   width: 100,
  // },
  {
    field: "city",
    headerName: "Nơi ở",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Điện thoại",
    width: 200,
  },
];

export const hotelColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Tên",
    width: 200,
  },
  // {
  //   field: "type",
  //   headerName: "Loại",
  //   width: 100,
  // },
  {
    field: "title",
    headerName: "Mô tả",
    width: 500,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 400,
  },
  {
    field: "city",
    headerName: "Vị trí",
    width: 200,
  },
];

export const roomColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Tên phòng",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 400,
  },
  {
    field: "price",
    headerName: "Giá",
    valueFormatter:params=>
    {return params.value+".000 VNĐ"},
    width: 150,
  },
  {
    field: "maxPeople",
    headerName: "Tối đa",
    width: 100,
  },
];

export const reserveColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "nameReservator",
    headerName: "Khách hàng",
    width: 200,
  },
  {
    field: "nameHotel",
    headerName: "Khách sạn",
    width: 200,
  },
  {
    field: "nameRoom",
    headerName: "Phòng",
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
  // {
  //   field: "price",
  //   headerName: "Giá",
  //   valueFormatter:params=>
  //   {return params.value+".000 VNĐ"},
  //   width: 150,
  // },
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

      const dateIn = moment(params.row.dateCheckIn).format("D")
      const MonthIn = moment(params.row.dateCheckIn).format("M")
      const dateOut = moment(params.row.dateCheckOut).format("D")
      const MonthOut = moment(params.row.dateCheckOut).format("M")
      if(MonthOut>MonthIn){
        return (
          `${params.row.price * ((parseInt(dateOut)+30-parseInt(dateIn)+1))||0}.000 VNĐ`
        );
      }else{
        return (
          `${params.row.price * (parseInt(dateOut)-parseInt(dateIn)+1)||0}.000 VNĐ`
        );
      }
      
    },
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 150,
    renderCell:(params)=>{
      return params.value?.name
    }
  },
];
