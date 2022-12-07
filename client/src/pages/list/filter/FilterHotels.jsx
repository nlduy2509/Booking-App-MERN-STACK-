import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect } from "react";
import { useState } from "react";

const FilterHotels = (props) => {
  const {
    allHotel,
    setAllHotel,
    checkedRating,
    setCheckedRating,
    checkedFeatured,
    setCheckedFeatured,
    setHotelsFilter
  } = props;

  const featuredHotel = [
    {
      key: "gym",
      name: "Phòng tập Gym",
      _id: "638ee526c3685b6adde702dd",
    },
    {
      key: "tttd",
      name: "Trung tâm thể dục",
      _id: "638ee526c3685b6adde702de",
    },
    {
      key: "spa",
      name: "Chăm sóc sức khoẻ và spa",
      _id: "638ee526c3685b6adde702df",
    },
    {
      key: "xonghoi",
      name: "Xông hơi",
      _id: "638ee526c3685b6adde702e0",
    },
    {
      key: "hoboi",
      name: "Hồ bơi ngoài trời",
      _id: "638ee526c3685b6adde702e1",
    },
    {
      key: "giaitri",
      name: "Khu vực giải trí và trò chơi",
      _id: "638ee526c3685b6adde702e2",
    },
  ];

  const handleToggle = (value) => () => {
    const newData = allHotel.filter(e=>e.rating === value)
    let newChecked;
    if (checkedRating.length === 0) {
      newChecked = [value];
    } else {
      if (checkedRating[0] === value) {
        newChecked = [];
      } else {
        newChecked = [value];
      }
    }
    setHotelsFilter(newData)
    setCheckedRating(newChecked);
  };

  const handleCheckedFeature = (value) => () => {
    console.log("value",value)
    console.log("checkedFea", checkedFeatured)
    let data = []

    for (let index = 0; index < allHotel.length; index++) {
      let array = []
      let featured = allHotel[index].featured.filter(i=>i.key===value.key)
      console.log("first",featured)
      if (JSON.stringify(featured)!==JSON.stringify(array)) {
        const newData = allHotel.filter(e=>e._id===allHotel[index]._id)
        data = data.concat(newData)
        console.log("data",data)
        setHotelsFilter(data)
        featured= []
      }
    }
    let newChecked;
    let check;
    let count;
    if (checkedFeatured.length === 0) {
      check = false;
    } else {
      count = checkedFeatured.filter((e) => e._id === value._id).length;
      if (count > 0) {      
        check = true;
      } else {  
        check = false;
      }
    }
    if (check) {
      newChecked = checkedFeatured.filter((e) => e._id !== value._id);
    } else {
      newChecked = checkedFeatured.concat(value);
    }
    setCheckedFeatured(newChecked);
    console.log("newchecked",newChecked)
    console.log("checked", checkedFeatured)
  };

  // console.log("dataHotel", allHotel);
  return (
    <>
      <h3>Xếp hạng sao</h3>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {[1, 2, 3, 4, 5].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checkedRating[0] === value}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "black" }}
                  id={labelId}
                  secondary={`${value} sao`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <h3>Tiện ích</h3>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {featuredHotel.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value._id} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleCheckedFeature(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={
                      checkedFeatured.filter((e) => e._id === value._id)
                        .length > 0
                    }
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "black" }}
                  id={labelId}
                  secondary={`${value.name}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default FilterHotels;
