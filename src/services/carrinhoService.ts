import { api } from "./api";

export interface CarrinhoItemDTO {
    id: number;
    produtoId: number;
    nomeProduto: string;
    imageUrl: string;
    preco: number;
    cor: string;
    tamanho: string;
    quantidade: number;
}

export interface CarrinhoResponseDTO {
    id: number;
    clienteId: number;
    itens: CarrinhoItemDTO[];
}

export async function listarCarrinho(clienteId: number): Promise<CarrinhoResponseDTO> {
    const response = await api.get(`/clientes/${clienteId}/carrinho`);
    return response.data;
}

export async function adicionarAoCarrinho(clienteId: number, produtoId: number, quantidade: number): Promise<CarrinhoResponseDTO> {
    const response = await api.post(`/clientes/${clienteId}/carrinho/itens`, {
        produtoId,
        quantidade
    });
    return response.data;
}

export async function atualizarQuantidade(clienteId: number, itemId: number, novaQuantidade: number): Promise<CarrinhoResponseDTO> {
    const response = await api.put(`/clientes/${clienteId}/carrinho/itens/${itemId}`, {
        quantidade: novaQuantidade
    });
    return response.data;
}

export async function removerItem(clienteId: number, itemId: number): Promise<CarrinhoResponseDTO> {
    const response = await api.delete(`/clientes/${clienteId}/carrinho/itens/${itemId}`);
    return response.data;
}

export async function limparCarrinhoCompleto(clienteId: number): Promise<void> {
    await api.delete(`/clientes/${clienteId}/carrinho`);
}