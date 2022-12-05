import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment, { now } from "moment";


const Chart = ({ aspect, title,reservations }) => {

  const nowMonth = moment().format("M")
  const dataReserveNow = reservations.filter(e=>moment(e.dateCheckIn).format("M")==nowMonth||"")
  const dataReserveNow1 = reservations.filter(e=>moment(e.dateCheckIn).format("M")==(nowMonth-1)||"")
  const dataReserveNow2 = reservations.filter(e=>moment(e.dateCheckIn).format("M")==nowMonth-2||"")
  const dataReserveNow3 = reservations.filter(e=>moment(e.dateCheckIn).format("M")==nowMonth-3||"")
  const dataReserveNow4 = reservations.filter(e=>moment(e.dateCheckIn).format("M")==nowMonth-4||"")
  const dataReserveNow5 = reservations.filter(e=>moment(e.dateCheckIn).format("M")==nowMonth-5||"")
  console.log("dateReserves",dataReserveNow1);

  let TotalNow = 0
  let TotalNow1 = 0
  let TotalNow2 = 0
  let TotalNow3 = 0
  let TotalNow4 = 0
  let TotalNow5 = 0
  for(let i=0; i<=dataReserveNow.length-1;i++){
    const dateIn = moment(dataReserveNow[i].dateCheckIn).format("D")
      const MonthIn = moment(dataReserveNow[i].dateCheckIn).format("M")
      const dateOut = moment(dataReserveNow[i].dateCheckOut).format("D")
      const MonthOut = moment(dataReserveNow[i].dateCheckOut).format("M")
      if(MonthOut>MonthIn){
        TotalNow= TotalNow +( dataReserveNow[i].price * (parseInt(dateOut)+30-parseInt(dateIn)+1))
      }else{
        TotalNow= TotalNow +( dataReserveNow[i].price * (parseInt(dateOut)-parseInt(dateIn)+1))
      }
    // TotalNow = TotalNow + dataReserveNow[i].price
  }

  for(let i=0; i<=dataReserveNow1.length-1;i++){
    const dateIn = moment(dataReserveNow1[i].dateCheckIn).format("D")
      const MonthIn = moment(dataReserveNow1[i].dateCheckIn).format("M")
      const dateOut = moment(dataReserveNow1[i].dateCheckOut).format("D")
      const MonthOut = moment(dataReserveNow1[i].dateCheckOut).format("M")
      if(MonthOut>MonthIn){
        TotalNow1= TotalNow1 +( dataReserveNow1[i].price * (parseInt(dateOut)+30-parseInt(dateIn)+1))
      }else{
        TotalNow1= TotalNow1 +( dataReserveNow1[i].price * (parseInt(dateOut)-parseInt(dateIn)+1))
      }
    // TotalNow1 = TotalNow1 + dataReserveNow1[i].price||0
  }
  for(let i=0; i<=dataReserveNow2.length-1;i++){
    const dateIn = moment(dataReserveNow2[i].dateCheckIn).format("D")
      const MonthIn = moment(dataReserveNow2[i].dateCheckIn).format("M")
      const dateOut = moment(dataReserveNow2[i].dateCheckOut).format("D")
      const MonthOut = moment(dataReserveNow2[i].dateCheckOut).format("M")
      if(MonthOut>MonthIn){
        TotalNow2= TotalNow2 +( dataReserveNow2[i].price * (parseInt(dateOut)+30-parseInt(dateIn)+1))
      }else{
        TotalNow2= TotalNow2 +( dataReserveNow2[i].price * (parseInt(dateOut)-parseInt(dateIn)+1))
      }
    // TotalNow2 = TotalNow2 + dataReserveNow2[i].price
  }
  for(let i=0; i<=dataReserveNow3.length-1;i++){
    const dateIn = moment(dataReserveNow3[i].dateCheckIn).format("D")
      const MonthIn = moment(dataReserveNow3[i].dateCheckIn).format("M")
      const dateOut = moment(dataReserveNow3[i].dateCheckOut).format("D")
      const MonthOut = moment(dataReserveNow3[i].dateCheckOut).format("M")
      if(MonthOut>MonthIn){
        TotalNow3= TotalNow3 +( dataReserveNow3[i].price * (parseInt(dateOut)+30-parseInt(dateIn)+1))
      }else{
        TotalNow3= TotalNow3 +( dataReserveNow3[i].price * (parseInt(dateOut)-parseInt(dateIn)+1))
      }
    // TotalNow3 = TotalNow3 + dataReserveNow3[i].price
  }
  for(let i=0; i<=dataReserveNow4.length-1;i++){
    const dateIn = moment(dataReserveNow4[i].dateCheckIn).format("D")
      const MonthIn = moment(dataReserveNow4[i].dateCheckIn).format("M")
      const dateOut = moment(dataReserveNow4[i].dateCheckOut).format("D")
      const MonthOut = moment(dataReserveNow4[i].dateCheckOut).format("M")

      if(MonthOut>MonthIn){
        TotalNow4= TotalNow4 +( dataReserveNow4[i].price * (parseInt(dateOut)+30-parseInt(dateIn)+1))
        
      }else{
        TotalNow4= TotalNow4 +( dataReserveNow4[i].price * (parseInt(dateOut)-parseInt(dateIn)+1))
      }
    // TotalNow4 = TotalNow4 + dataReserveNow4[i].price
  }
  for(let i=0; i<=dataReserveNow5.length-1;i++){
    const dateIn = moment(dataReserveNow5[i].dateCheckIn).format("D")
      const MonthIn = moment(dataReserveNow5[i].dateCheckIn).format("M")
      const dateOut = moment(dataReserveNow5[i].dateCheckOut).format("D")
      const MonthOut = moment(dataReserveNow5[i].dateCheckOut).format("M")
      if(MonthOut>MonthIn){
        TotalNow5= TotalNow5 +( dataReserveNow5[i].price * (dateOut+30-dateIn+1))
      }else{
        TotalNow5= TotalNow5 +( dataReserveNow5[i].price * (parseInt(dateOut)-parseInt(dateIn)+1))
      }
    // TotalNow5 = TotalNow5 + dataReserveNow5[i].price
  }
const data = [
  { name: `Tháng ${nowMonth-5}`, DoanhThu: TotalNow5 },
  { name: `Tháng ${nowMonth-4}`, DoanhThu: TotalNow4 },
  { name: `Tháng ${nowMonth-3}`, DoanhThu: TotalNow3 },
  { name: `Tháng ${nowMonth-2}`, DoanhThu: TotalNow2 },
  { name: `Tháng ${nowMonth-1}`, DoanhThu: TotalNow1 },
  { name: `Tháng ${nowMonth}`, DoanhThu: TotalNow },

];
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="pink" stopOpacity={0.8} />
              <stop offset="95%" stopColor="pink" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="DoanhThu"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
