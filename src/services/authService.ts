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
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
}

export interface LoginDTO {
    email: string;
    senha: string;
}

export interface UserLogged {
    id: number;
    nome: string;
    email: string;
    telefone?: string;
    imageUrl?: string;
    carrinho?: Carrinho; 
}

export interface AtualizarClienteDTO {
    nome: string;
    email: string;
    telefone: string;
    imageUrl: string;
}

export interface AtualizarClienteDados {
    nome: string;
    email: string;
    telefone: string;
}

export async function login(dados: LoginDTO): Promise<UserLogged> {
    const response = await api.post<UserLogged>("/clientes/login", dados);
    return response.data;
}

export async function cadastrar(dados: CadastroDTO): Promise<UserLogged> {
    const response = await api.post<UserLogged>("/clientes/cadastrar", dados);
    return response.data;
}

export async function alterarSenha(email: string, novaSenha: string): Promise<string> {
    const response = await api.put("/clientes/alterar-senha", {
        email: email,
        novaSenha: novaSenha
    });
    return response.data;
}

export async function buscarClientePorId(id: number): Promise<UserLogged> {
    const response = await api.get<UserLogged>(`/clientes/${id}`);
    return response.data;
}

export async function atualizarCliente(
    id: number, 
    dados: AtualizarClienteDados, 
    arquivoImagem?: File
): Promise<UserLogged> {
    
    const formData = new FormData();
    formData.append("nome", dados.nome);
    formData.append("email", dados.email);
    formData.append("telefone", dados.telefone);

    if (arquivoImagem) {
        formData.append("imagem", arquivoImagem);
    }
    
    const response = await api.put<UserLogged>(`/clientes/${id}`, formData);
    return response.data;
}