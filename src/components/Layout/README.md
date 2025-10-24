# Componente `Layout`

O `Layout` é o componente responsável por estruturar todas as páginas da aplicação. Ele garante que cada página tenha Header, Footer e um espaço central para o conteúdo (`children`), sem precisar repetir código em cada página. Além disso, agora suporta um `theme` que altera o estilo do layout (por exemplo, cores de fundo e texto).

# Estrutura do componente 
```.
Layout/
├── Layout.tsx          → Estrutura da página e props
├── Layout.module.css
```

## `Layout.tsx`
```.
import type { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

import style from "./Layout.module.css"

type Theme = "light" | "dark"

interface LayoutProps {
  children: ReactNode;
  theme: Theme
}

export function Layout({ children, theme }: LayoutProps) {
    return (
        <>
            <Header />
            <main className={`px-100 children ${style[theme]}`}>
                {children}
            </main>
            <Footer />
        </>
    )
}
```

### Explicação:

**1. Props:**
* `children`: todo conteúdo JSX que será renderizado dentro do `<main>` do layout.

**2. Estrutura:**
* `<Header />` no topo da página.
* `<main>` contém o conteúdo principal.
* `children`: todo conteúdo JSX que será renderizado dentro do `<main>` do layout.
* `theme`: define o tema do layout (`light` ou `dark`).
* `<Footer />` no rodapé.

**3. Classes globais aplicadas:**
* `px-100`: padding horizontal de 100px.
* `mg-top`: margin superior e inferior de 2rem.
* `children`: organiza o conteúdo em coluna com gap: 2rem.

**4. Sem CSS próprio:**
* O Layout usa apenas estilos globais definidos no `global.css`.
* Isso mantém o componente simples e reutilizável em qualquer página.
    
    
# Como usar o Layout

O Layout deve envolver o conteúdo de cada página:
```.
import { Layout } from "../../components/Layout/Layout";

export function Home() {
  return (
    <Layout theme="light>
      <h1>Bem-vindo à LOGO-LOGO!</h1>
      <p>Confira nossas categorias de roupas e acessórios.</p>
    </Layout>
  );
}
```
    
* Todo o conteúdo passado para `<Layout>` é renderizado dentro do `<main>`.
* `Header` e `Footer` são incluídos automaticamente, garantindo consistência entre páginas.

## Boas práticas

1. Sempre use o `Layout` em páginas completas, não em pequenos componentes.
2. Mantenha o conteúdo dentro de `children`.
3. `Header` e `Footer` não precisam ser importados separadamente em cada página — o `Layout` já cuida disso.