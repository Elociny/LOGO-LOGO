import { api } from "./api";

export type FormaPagamento = "CARTAO" | "PIX" | "BOLETO";

export interface ComprarRequestDTO {
    clienteId: number;
    produtosIds: number[]; 
    formaPagamento: FormaPagamento;
    cartaoId?: number | null;
}

export interface ComprarResponseDTO {
    id: number;
    valorTotal: number;
    status: string;
}

export async function salvarCompra(dados: ComprarRequestDTO): Promise<ComprarResponseDTO> {
    const response = await api.post("/compras", dados);
    return response.data;
}