import { api } from "./api";

export interface AvaliacaoRequestDTO {
    clienteId: number;
    produtoId: number;
    nota: number; 
    titulo: string;
    descricao: string;
}

export interface AvaliacaoResponseDTO {
    id: number;
    clienteId: number;
    nomeCliente: string;
    imagemCliente: string | null;
    nota: number;
    titulo: string;
    descricao: string;
    dataAvaliacao: string; 
}

export async function listarAvaliacoes(produtoId: number): Promise<AvaliacaoResponseDTO[]> {
    const response = await api.get(`/avaliacoes/produto/${produtoId}`);
    return response.data;
}

export async function criarAvaliacao(dados: AvaliacaoRequestDTO): Promise<AvaliacaoResponseDTO> {
    const response = await api.post("/avaliacoes", dados);
    return response.data;
}

export async function atualizarAvaliacao(id: number, dados: AvaliacaoRequestDTO): Promise<AvaliacaoResponseDTO> {
    const response = await api.put(`/avaliacoes/${id}`, dados);
    return response.data;
}