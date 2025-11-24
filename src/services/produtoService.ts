import type { ProductAPI } from './../types/ProductAPI';
import { api } from "./api";

export async function listarProdutos(): Promise<ProductAPI[]> {
  const response = await api.get<ProductAPI[]>("/produtos");
  return response.data;
}

export async function buscarProdutoPorId(id: number) {
  const response = await api.get<ProductAPI>(`/produtos/${id}`)

  return response.data
}

export async function buscarProdutosPorNome(termo: string): Promise<ProductAPI[]> {
  const response = await api.get('/produtos/buscar', {
    params: { nome: termo } 
  });
  return response.data;
}
