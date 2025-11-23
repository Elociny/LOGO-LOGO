import { Input } from "../../components/Input/Input"
import { Layout } from "../../components/Layout/Layout"
import style from "./Configuration.module.css"
import FotoPerfil from "../../assets/images/foto-de-perfil.svg"
import { Button } from "../../components/Button/Button"
import { Address } from "../../components/Address/Address"
import { useNavigate } from "react-router-dom" // 1. Import necessário
import { useEffect, useState } from "react"

type EnderecoData = {
    logradouro: string
    numero: number
    bairro: string
    cidade: string
    estado: string
    cep: string
    complemento?: string
}

export function Configuration() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("Usuário");
    const [email, setEmail] = useState("email@exemplo.com");

    const telefone = "+55 (11) 9 7048-7095"
    const enderecos: EnderecoData[] = [
        {
            logradouro: "Rua das Flores",
            numero: 123,
            bairro: "Centro",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01001-000",
            complemento: "Apto 45",
        },
        {
            logradouro: "Av. Paulista",
            numero: 1500,
            bairro: "Bela Vista",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01310-200",
            complemento: "Apartamento 94 torre E"
        },
    ]

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario_logado");
        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo);
            setNome(dados.nome);
            setEmail(dados.email);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("usuario_logado");

        navigate("/login");
    };

    return (
        <Layout>
            <div className={`${style.configuration}`}>
                <h2>Informações pessoais</h2>

                <section className={`row ${style.secao}`}>
                    <img src={FotoPerfil} alt="Foto de perfil" className={`${style.fotoPerfil}`} />

                    <div className={`${style.perfil}`}>
                        <div className={`row ${style.inputs}`}>
                            <Input id="nome" label="Nome" placeholder="Seu nome completo" type="text" value={nome} enable={true} />
                            <Input id="telefone" label="Telefone" placeholder="Seu número de telefone" type="text" value={telefone} enable={true} />
                            <Button border="arredondada" color="cinza" size="small" text="alterar dados" theme="light" />
                        </div>

                        <Input id="email" label="Email" placeholder="Seu endereço de email" type="text" value={email} enable={false} />

                        <div className={`row ${style.inputs}`}>
                            <Input id="nome" label="Senha" placeholder="Seu nome completo" type="password" value="********" enable={true} />
                            <Button border="arredondada" color="laranja" size="small" text="alterar senha" theme="light" navegation="/changePassword" />
                        </div>
                    </div>
                </section>

                <h2>Endereços salvos </h2>

                <section className={`${style.enderecos}`}>
                    {enderecos.map((end, index) => (
                        <div className={`row ${style.enderecoCompleto}`} key={index}>
                            <div className={`row ${style.group}`}>
                                <button>
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                                <Address
                                    nome={nome}
                                    telefone={telefone}
                                    {...end}
                                />
                            </div>

                            <Button border="arredondada" color="transparente" size="small" text="editar dados" theme="light" />
                        </div>
                    ))}

                    <Button border="quadrada" color="laranja" size="big" text="adicionar novo endereço" theme="light" navegation="adicionar-endereco" />
                </section>

                <Button border="arredondada" color="branco" size="big" text="sair da logologo" theme="light" onClick={handleLogout} />
            </div>
        </Layout>
    )
}