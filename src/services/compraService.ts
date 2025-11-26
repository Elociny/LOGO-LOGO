import { api } from "./api";

export type FormaPagamento = "CARTAO" | "PIX" | "BOLETO";

export interface ItemCompraDTO {
    id: number;
    nome: string;
    imageUrl: string;
    cor: string;
    tamanho: string;
    preco: number;
}

export interface ComprarRequestDTO {
    clienteId: number;
    produtosIds: number[]; 
    formaPagamento: FormaPagamento;
    cartaoId?: number | null;
}

export interface ComprarResponseDTO {
    id: number;
    clienteId: number;
    itens: ItemCompraDTO[];
    dataCompra: string;
    valorTotal: number;
    status: string;
    formaPagamento: FormaPagamento;
}

export async function listarComprasDoCliente(clienteId: number): Promise<ComprarResponseDTO[]> {
    const response = await api.get(`/compras/cliente/${clienteId}`);
    return response.data;
}

export async function salvarCompra(dados: ComprarRequestDTO): Promise<ComprarResponseDTO> {
    const response = await api.post("/compras", dados);
    return response.data;
}

export async function buscarCompraPorId(id: number): Promise<ComprarResponseDTO> {
    const response = await api.get(`/compras/${id}`);
    return response.data;
}