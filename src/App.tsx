import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { NotFound } from "./Pages/NotFound/NotFound";
import { Maintenance } from "./Pages/Maintenance/Maintenance";
import { Register } from "./Pages/Register/Register";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import { ChangePassword } from "./Pages/ChangePassword/ChangePassword";

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/manutencao" element={<Maintenance />}></Route>
        <Route path="/cadastro" element={<Register />}></Route>
        <Route path="/esqueceu-senha" element={<ForgotPassword />}></Route>
        <Route path="/redefinir-senha" element={<ChangePassword />}></Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}