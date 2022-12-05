import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Reserve from "./components/reserve/Reserve.jsx";
import { userHistory } from "./datatablesoure";
import Historyreservations from "./pages/historyreserve/historyreservations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/reservations" element={<Historyreservations columns = {userHistory}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
