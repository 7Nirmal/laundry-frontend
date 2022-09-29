import {Navbar} from "./components/navbar/Navbar";
import {Routes,Route} from "react-router-dom";
import { LaundryHome } from './pages/home/Laundryhome';
import { SingleService } from './pages/home/singleservice/Singlepage';
import UserLogin from "./pages/login/Login";
import UserRegister from "./pages/register/Userregister";
import Cart from "./pages/cart/Cart";
import SchedulePickup from "./pages/schedulepickup/Schedulepickup";
import CheckoutPage from "./pages/checkout/Checkout";
import OrderDetails from "./pages/orderdetails/Orderdetails";
import MyLaundry from "./pages/mylaundry/Mylaundry";
import Singleorder from "./pages/singleorder/Singleorder";

export const API = "https://dailylaundry.herokuapp.com";
function App() {
  return (
    <>
      <Navbar/>
     <Routes>
      <Route path="/" element={<LaundryHome/>}/>
      <Route path="/singleService/:id" element={<SingleService/>}/>
      <Route path="/login" element={<UserLogin/>}/>
      <Route path="/register" element={<UserRegister/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/schedulePickup" element={<SchedulePickup/>}/>
      <Route path="/checkout" element={<CheckoutPage/>}/>
      <Route path="/orderSuccess/:id" element={<OrderDetails/>}/>
      <Route path="/myLaundry" element={<MyLaundry/>}/>
      <Route path="/orderDetails/:id" element={<Singleorder/>}/>


     </Routes>
      
    </>
  );
}

export default App;
