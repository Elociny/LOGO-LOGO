import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { NotFound } from "./Pages/NotFound/NotFound";
import { Maintenance } from "./Pages/Maintenance/Maintenance";

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/manutencao" element={<Maintenance />}></Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}