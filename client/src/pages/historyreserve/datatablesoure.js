export const userProfile = [
    // { field: "_id", headerName: "ID", width: 250 },
    {
      field: "fullName",
      headerName: "Họ và tên",
      width: 230,
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
      width: 230,
    },
  
    // {
    //   field: "country",
    //   headerName: "Country",
    //   width: 100,
    // },
    {
      field: "city",
      headerName: "Nơi ở",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Điện thoại",
      width: 100,
    },
  ];

  export const userHistory = [
    {
      field: "nameReservator",
      headerName: "Tên người đặt",
      width: 200,
    },
    {
        field: "phoneReservator",
        headerName: "Số điện thoại",
        width: 0,
      },
    {
      field: "emailReservator",
      headerName: "Email",
      width: 50,
    },
    {
        field: "nameHotel",
        headerName: "Tên khách sạn",
        width: 50,
      },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 50,
    },
    {
      field: "nameRoom",
      headerName: "Tên phòng",
      width: 50,
    },
    {
        field: "numberRoom",
        headerName: "Số phòng",
        width: 50,
    },
    {
        field: "price",
        headerName: "Giá",
        width: 50,
    },   
    {
        field: "dateCheckIn",
        headerName: "Ngày nhận phòng",
        width: 50,
    },
    {
        field: "dateCheckOut",
        headerName: "Ngày trả phòng",
        width: 50,
    },  
  ];