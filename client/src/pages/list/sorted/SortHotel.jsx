import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const SortHotel = (props) => {
  const {
    checkedSorting,
    setCheckedSorting,
    allHotel,
    checkedRating,
    checkedFeatured,
    hotelsFilter,
    hotelsFilterRating,
    hotelsFilterFeatured,
  } = props;

  const asc = (a,b) => a.minPrice-b.minPrice

  const sorting = (array) =>{
    array.sort(asc)
  }

  const handleToggle = (value) => () => {

    let newChecked;
    if(checkedSorting.length===0){
        newChecked = [value]
    }
    else{
        if(checkedSorting[0]===value){
            newChecked = []
        }
        else{
            newChecked = [value]
        }
    }
    setCheckedSorting(newChecked)

    if(value === "tăng dần"){
        if(checkedRating.length === 0 && checkedFeatured.length === 0){
            sorting(allHotel)
        }
        else{
            if(checkedRating.length > 0 && checkedFeatured.length > 0){
                sorting(hotelsFilter)
            }
            else{
                if(checkedRating.length > 0){
                    sorting(hotelsFilterRating)
                }
                else{
                    sorting(hotelsFilterFeatured)
                }
            }
        }
    }
    else{
        if(checkedRating.length === 0 && checkedFeatured.length === 0){
            sorting(allHotel)
            allHotel.reverse()
        }
        else{
            if(checkedRating.length > 0 && checkedFeatured.length > 0){
                sorting(hotelsFilter)
                hotelsFilter.reverse()
            }
            else{
                if(checkedRating.length > 0){
                    sorting(hotelsFilterRating)
                    hotelsFilterRating.reverse()
                }
                else{
                    sorting(hotelsFilterFeatured)
                    hotelsFilterFeatured.reverse()
                }
            }
            
        }
    }
  };
  
 
  return (
    <>
      <h3>Sắp xếp kết quả:</h3>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
        //   bgcolor: "background.paper",
        }}
      >
        {["tăng dần","giảm dần"].map((value) => {
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
                    checked={checkedSorting[0] === value}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "black" }}
                  id={labelId}
                  secondary={`Giá ${value}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default SortHotel;
