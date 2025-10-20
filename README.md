# LOGOLOGO

# 📁 Estrutura do projeto

```
src/
│
├── assets/
│   └── images/
│       ├── icons/           → ícones SVG usados nos botões de categorias
│       ├── carrossel item 1.svg
│       ├── banner1.svg
│       └── banner2.svg
│
├── components/
│   ├── Button/              → componente de botão reutilizável
│   │   ├── Button.tsx
│   │   └── Button.module.css
│   │
│   ├── Category/            → componente de categorias (ícone + texto)
│   │   ├── Category.tsx
│   │   └── Category.module.css
│   │
│   ├── Carousel/            → componente do carrossel
│   │   ├── Carousel.tsx
│   │   └── Carousel.module.css
│   │
│   ├── Layout/              → estrutura base da página (Header + Footer + conteúdo)
│   │   ├── Layout.tsx
│   │   └── Layout.module.css
│   │
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── Header.module.css
│   │
│   └── Footer/
│       ├── Footer.tsx
│       └── Footer.module.css
│
├── Pages/
│   ├── Home/
│   │   ├── Home.tsx
│   │   └── Home.module.css
│   │
│   ├── Login/
│   │   ├── Login.tsx
│   │   └── Login.module.css
│   │
│   └── NotFound/
│       ├── NotFound.tsx
│       └── NotFound.module.css
│
├── styles/
│   └── global.css           → estilos e variáveis globais
│
├── App.tsx                  → define as rotas principais
└── main.tsx                 → ponto de entrada do React
```

# 🎨 Estilos globais (`global.css`)

Esse arquivo define:

* Cores principais: `--laranja`, `--cinza`, `--branco`, etc.
* Fontes globais
* Reset de CSS (`margin: 0`, `padding: 0`, `box-sizing: border-box`)
* Importado no `main.tsx`, o `global.css` é aplicado em toda a aplicação.

Você pode usar as variáveis em qualquer módulo CSS:

```
color: var(--laranja);
background: var(--cinza);
```

# 🛠 Estrutura de Componentes

Todas os componentes ficam em `src/componets/`

Cada componente tem que estar dentro de uma pasta de mesmo nome iniciado com a letra maiuscula, dentro da pasta tem que ter:

* Um arquivo `.tsx` → responsável pelo código React (estrutura e lógica);
* Um arquivo `.module.css` → para os estilos locais desse componente.

```
└── Button/                       --> Pasta        
      ├── Button.tsx              --> Componente react(HTML)
      └── Button.module.css       --> Modulo css
```

## 💡 Componentes Globais

Alguns componentes são usados em várias páginas do projeto e podem ser considerados **globais**.

Estes componentes possuem documentação própria, pois suas props e estilos afetam várias partes da aplicação.

Atualmente, os componentes globais são:

*  **`Button`** → Botão reutilizável com tamanhos, cores, bordas e temas configuráveis.
  [Veja a documentação completa](./src/components/Button/README.md)

* **`Layout`** → Estrutura base de todas as páginas, contendo Header, Footer e área principal para conteúdo.
  [Veja a documentação completa](./src/components/Layout/README.md)


# ✨ Como estilizar uma tag com classes

No React, quando usamos **CSS Modules**, as classes são importadas como um objeto `style` (ou qualquer nome que você definir).

Assim, para aplicar uma classe CSS, usamos a sintaxe de chaves `{}` dentro do atributo `className`.

Exemplo prático:

```
import style from "./Product.module.css"

export function Product() {
  return (
    <div className={style.card}>
      <h3 className={style.title}>Camiseta LogoLogo</h3>
      <p className={style.price}>R$ 59,90</p>
    </div>
  )
}

```
E no `Product.module.css`:
```
.card {
  background: var(--branco);
  border-radius: 1rem;
  padding: 1rem;
}

.title {
  color: var(--laranja);
  font-weight: bold;
}

.price {
  color: var(--cinza);
}
```
Para adicionar várias classes dinamicamente, você pode usar template strings:
```
<button className={`${style.botao} ${style.grande}`}>Comprar</button>
```
Se quiser adicionar algum estilo global para o componente é só colocar o nome do estilo sem o tamplate string:
```
<button className={`estiloGlobal ${style.botao} ${style.grande}`}>Comprar</button>
```

# 📄 Estrutura de Páginas

Todas as páginas ficam em `src/Pages/`

Cada pasta representa uma página e contém:
* Um arquivo `.tsx` com o conteúdo;
* Um arquivo `.module.css` com o estilo da página.

As páginas sempre são carregadas dentro do componente Layout, que inclui o Header e o Footer obrigatóriamente.

```
import { Layout } from "../../components/Layout/Layout";

export function Home() {
  return (
    <Layout>
      <h1>Bem-vindo!</h1>
    </Layout>
  )
}
```

# 🌐 Sistema de rotas(`App.tsx`)

O React Router controla as páginas que aparecem no navegador.

Veja o exemplo atual:

```
import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { NotFound } from "./Pages/NotFound/NotFound";

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
```

Para adicionar uma nova página:

* Crie uma nova pasta em `Pages/` (ex: `Sobre`);
* Crie o arquivo Sobre.tsx;
* Adicione uma nova rota:

```
<Route path="/sobre" element={<Sobre />} />
```

# ⚡ Criando novos componentes

Para criar um novo componente:

1. Crie uma pasta com o nome do componente em `PascalCase` dentro de `components/`;
2. Crie dois arquivos: `Componente.tsx` e `Componente.module.css`;
3. Importe e use onde quiser:

```
import { Componente } from "../../components/Componente/Componente"
```

# 🔗 Link do projeto

{%preview https://github.com/Elociny/LOGO-LOGO %}

# 📥 Como clonar e rodar o projeto localmente

1. Abra o terminal e vá até a pasta onde quer salvar o projeto
```
cd ~/Documentos/projetos
```

2. Clone o repositório do GitHub
```
git clone https://github.com/Elociny/LOGO-LOGO.git
```

3. Entre na pasta do projeto
```
cd LOGO-LOGO
```

3. Instale as dependências
```
npm install
```

4. Rode o servidor local
```
npm run dev
```

5. Acesse no navegador
```
http://localhost:5173/
```

* Dica: Se algo der erro, verifique se o Node.js está instalado (`node -v`).

# 🤝 Como contribuir com o projeto no GitHub

1. Atualize a branch principal e a dev
```
git checkout main
git pull
git checkout dev
git pull
```

2. Crie sua branch pessoal
```git checkout -b seu-nome-dev
git push -u origin seu-nome-dev
```
3. Faça suas alterações

* Trabalhe somente na sua branch pessoal.
* Adicione e commite suas alterações:

```
git add .
git commit -m "Implementa componente X"
git push origin seu-nome-dev
```

4. Atualize sua branch com a dev

* Antes de continuar trabalhando, sincronize com o que já foi feito no grupo:
```
git checkout dev
git pull
git checkout seu-nome-dev
git merge dev
```
* Se houver conflitos, resolva-os, faça commit e envie novamente:
```git add .
git commit -m "Resolve conflitos com dev"
git push origin seu-nome-dev
```

5. Integrando suas alterações na dev

Quando sua funcionalidade estiver pronta:
```
git checkout dev
git pull
git merge seu-nome-dev
git push origin dev
```

## ⚠️ Regras importantes

* Nunca trabalhe direto na main.
* Faça commits pequenos e com mensagens claras.
* Sempre atualize sua branch com a dev antes de merge.
* Use Pull Requests se quiser revisão de código.

# 🧰 Extensões úteis do VS Code

Essas extensões tornam o desenvolvimento mais rápido e organizado:

| Extensão                                       | Descrição                                            |
| ---------------------------------------------- | ---------------------------------------------------- 
| 🎨 **Prettier - Code Formatter**               | Formata o código automaticamente                     |
| 💅 **Material Icon Theme** | Melhora a visualização da árvore de arquivos         |
| ⚡ **Auto Rename Tag**                          | Renomeia automaticamente a tag de fechamento         |
| 🌈 **Color Highlight**                         | Mostra visualmente as cores em CSS                   |