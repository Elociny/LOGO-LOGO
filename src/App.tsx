import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { NotFound } from "./Pages/NotFound/NotFound";
import { Feminino }from './Pages/Feminino/Feminino';
import { Carrinho } from "./Pages/Carrinho/Carrinho";
import Product from './Pages/Product/Product';

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/feminino" element={<Feminino />}></Route>
        <Route path="/produto/:id" element={<Product />}></Route>
        <Route path="/carrinho" element={<Carrinho />}></Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
