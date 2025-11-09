import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { NotFound } from "./Pages/NotFound/NotFound";
import { Feminino }from './Pages/Feminino/Feminino';
import Product from './Pages/Product/Product';
import { Register } from "./Pages/Register/Register";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import { ChangePassword } from "./Pages/ChangePassword/ChangePassword";
import { Maintenance } from "./Pages/Maintenance/Maintenance";
import { Cart } from "./Pages/Cart/Cart";

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/feminino" element={<Feminino />}></Route>
        <Route path="/produto/:id" element={<Product />}></Route>
        <Route path="/carrinho" element={<Cart />}></Route>
        <Route path= "/register" element={<Register />}></Route>
        <Route path= "/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path= "/changePassword" element={<ChangePassword />}></Route>
        <Route path= "/maintenance" element={<Maintenance />}></Route>
        
                
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
