import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { NotFound } from "./Pages/NotFound/NotFound";
import { ListProducts } from './Pages/ListProducts/ListProducts';
import { Register } from "./Pages/Register/Register";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import { ChangePassword } from "./Pages/ChangePassword/ChangePassword";
import { Maintenance } from "./Pages/Maintenance/Maintenance";

import { Tracking } from "./Pages/Tracking/Tracking";
import { Configuration } from "./Pages/Configuration/Configuration";
import { AddAddress } from "./Pages/AddAddress/AddAddress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductDetails } from "./Pages/ProductDetails/ProductDetails";
import { Cart } from "./Pages/Cart/Cart";

const queryClient = new QueryClient()

export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/listagem-de-produtos/:categoria" element={<ListProducts />}></Route>
          <Route path="/carrinho" element={<Cart />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/changePassword" element={<ChangePassword />}></Route>
          <Route path="/maintenance" element={<Maintenance />}></Route>
          <Route path="/rastreio" element={<Tracking />}></Route>
          <Route path="/configuracoes" element={<Configuration />}></Route>
          <Route path="/configuracoes/adicionar-endereco" element={<AddAddress />}></Route>
          <Route path="/detalhes-do-produto/:id" element={<ProductDetails />}></Route>
          <Route path="/busca" element={<ListProducts />}></Route>

          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
