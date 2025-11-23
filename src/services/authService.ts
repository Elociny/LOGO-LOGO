import { api } from "./api";

export interface CarrinhoItem {
    id: number;
    produtoId: number;
    produtoNome: string;
    quantidade: number;
}

export interface Carrinho {
    id: number;
    clienteId: number;
    itens: CarrinhoItem[];
}

export interface CadastroDTO {
    nome: string
    email: string
    senha: string
}

export interface LoginDTO {
    email: string;
    senha: string;
}

export interface UserLogged {
    id: number;
    nome: string;
    email: string;
    carrinho?: Carrinho; 
}

export async function login(dados: LoginDTO): Promise<UserLogged> {
    const response = await api.post<UserLogged>("/clientes/login", dados);
    return response.data;
}

export async function cadastrar(dados: CadastroDTO): Promise<UserLogged> {
    const response = await api.post<UserLogged>("/clientes/cadastrar", dados)

    return response.data
    
}