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

const FilterHotel = (props) => {
  const {
    allHotel,
    setAllHotel,
    checkedRating,
    setCheckedRating,
    checkedFeatured,
    setCheckedFeatured,
    setHotelsFilter,
    hotelsFilter,
    hotelsFilterRating,
    setHotelFilterRating,
    hotelsFilterFeatured,
    setHotelFilterFeatured
  } = props;

  const [oldData, setOldData] = useState([])
 
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
    if(checkedRating.length===0){
        newChecked = [value]
        setHotelFilterRating(newData)
    }
    else{
        if(checkedRating[0]===value){
            newChecked = []
            setHotelFilterRating(allHotel)
        }
        else{
            newChecked = [value]
            setHotelFilterRating(newData)
        }
    }
    setCheckedRating(newChecked)
  };
  
  
  const handleCheckedFeature = (value) => () => {
    let newChecked;
    let check;
    let count;
    let data = [];

    if(checkedFeatured.length===0){
        for (let index = 0; index < allHotel.length; index++) {
            let array = []
            let featured = allHotel[index].featured.filter(i=>i.key===value.key)
            console.log("featured",featured)
            if (JSON.stringify(featured)!==JSON.stringify(array)) {
              const newData = allHotel.filter(e=>e._id===allHotel[index]._id)
              console.log("newData",newData)
              data = data.concat(newData)
              setOldData(data)
              setHotelFilterFeatured(data)
              console.log("data",data)
              featured= []
            }else{
              setHotelFilterFeatured(data)
            }  
        }
    }
    else{
        if(checkedFeatured.some(e=>e._id === value._id)){
            const newFeatured = checkedFeatured.filter(e=>e._id !== value._id)
            console.log("newFeatured-click",newFeatured)
            for (let items = 0; items < allHotel.length; items++) {
                let sum = 0;
                for (let index = 0; index < newFeatured.length; index++) {
                    let array = []
                    let featured = allHotel[items].featured.filter(i=>i.key===newFeatured[index].key)
                    console.log("hotel",allHotel[items])
                    console.log("featured-click",featured)
                    if (JSON.stringify(featured)!==JSON.stringify(array)) {
                      sum = sum + 1
                      if(sum===newFeatured.length){
                        const newData = allHotel.filter(e=>e._id===allHotel[items]._id)
                        console.log("newData-click",newData)
                        data = data.concat(newData)
                        setHotelFilterFeatured(data)
                        console.log("data-click",data)
                        featured= []
                        sum = 0
                      }
                    }else{
                      setHotelFilterFeatured(data)
                    }  
                }
            } 
            setOldData(data)    
        }
        else{
            for (let index = 0; index < oldData.length; index++) {
                let array = []
                let featured = oldData[index].featured.filter(i=>i.key===value.key)
                console.log("featured-2-click",featured)
                if (JSON.stringify(featured)!==JSON.stringify(array)) {
                  const newData = oldData.filter(e=>e._id===oldData[index]._id)
                  console.log("newData-2-click",newData)
                  data = data.concat(newData)
                  setHotelFilterFeatured(data)
                  console.log("data-2-click",data)
                  featured= []
                }else{
                  setHotelFilterFeatured(data)
                }  
            }
            setOldData(data)
        }
        
    }


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

}
 
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

export default FilterHotel;
