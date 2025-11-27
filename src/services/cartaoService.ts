import { api } from "./api";

export type TipoCartao = "CREDITO" | "DEBITO";
export type BandeiraCartao = "VISA" | "MASTERCARD" | "ELO" | "AMEX" | "HIPERCARD" | "OUTRO";

export interface CartaoRequestDTO {
    numero: string;     
    nomeTitular: string;
    validade: string;    
    cvv: string;
    tipo: TipoCartao;
    bandeira: BandeiraCartao;
    clienteId: number;
}

export interface CartaoResponseDTO {
    id: number;
    numeroMascarado: string; 
    nomeTitular: string;
    validade: string;
    tipo: TipoCartao;
    bandeira: BandeiraCartao;
    clienteId: number;
}

export async function cadastrarCartao(dados: CartaoRequestDTO): Promise<CartaoResponseDTO> {
    const response = await api.post("/cartoes", dados);
    return response.data;
}

export async function atualizarCartao(id: number, dados: CartaoRequestDTO): Promise<CartaoResponseDTO> {
    const response = await api.put(`/cartoes/${id}`, dados);
    return response.data;
}

export async function listarCartoes(clienteId: number): Promise<CartaoResponseDTO[]> {
    const response = await api.get(`/cartoes/cliente/${clienteId}`);
    return response.data;
}

export async function excluirCartao(id: number): Promise<void> {
    await api.delete(`/cartoes/${id}`);
}