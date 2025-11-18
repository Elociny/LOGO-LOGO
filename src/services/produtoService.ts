import type { ProductAPI } from './../types/ProductAPI';
import { api } from "./api";

export async function listarProdutos(): Promise<ProductAPI[]> {
  const response = await api.get<ProductAPI[]>("/produtos");
  return response.data;
}
