import { api } from "./api";

export interface EnderecoDTO {
    id?: number;
    logradouro: string;
    numero: number;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    clienteId: number;
}

export async function listarEnderecos(clienteId: number): Promise<EnderecoDTO[]> {
    const response = await api.get(`/enderecos/cliente/${clienteId}`);
    return response.data;
}

export async function criarEndereco(dados: EnderecoDTO): Promise<EnderecoDTO> {
    const response = await api.post("/enderecos", dados);
    return response.data;
}

export async function atualizarEndereco(id: number, dados: EnderecoDTO): Promise<EnderecoDTO> {
    const response = await api.put(`/enderecos/${id}`, dados);
    return response.data;
}

export async function excluirEndereco(id: number): Promise<void> {
    await api.delete(`/enderecos/${id}`);
}