import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

const  FilterHotels = ({alllHotel,setAllHotel,checkedRating,setCheckedRating,checkedFeatured,setCheckedFeatured}) =>{
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
          name: "khu vực giải trí và trò chơi",
          _id: "638ee526c3685b6adde702e2",
        },
      ];

      const handleToggle = (value) => () => {
        const currentIndex = checkedRating.indexOf(value);
        const newChecked = [checkedRating];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setCheckedRating(newChecked);
      };

      console.log("checkedRating",checkedRating);
    
      
    
    
      const handleCheckedFeature = (value) => () => {
        let newChecked;
        let check;
        let count
        if(checkedFeatured.length===0){
          check = false
        }else{
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
          newChecked = checkedFeatured.concat(value)
        }
        setCheckedFeatured(newChecked);
      };
    
      console.log("checkedFeatured",checkedFeatured);
    return(
        <>
            <h3>Xếp hạng sao</h3>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {[0, 1, 2, 3, 4].map((value) => {
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
                            checked={checkedRating.indexOf(value) !== -1}
                            // tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: "black" }}
                          id={labelId}
                          secondary={`${value + 1} sao`}
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
                            checked={checkedFeatured.filter(
                              (e) => e._id === value._id
                            ).length>0}
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
    )
    
}

export default FilterHotels