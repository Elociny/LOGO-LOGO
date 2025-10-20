# Componente Button

O Button é um componente reutilizável que permite criar botões estilizados de forma consistente em toda a aplicação. Ele suporta tamanhos diferentes, cores variadas, formatos de borda e temas, tornando-o flexível e fácil de manter.

# Estrutura do componente

O componente está dividido em TypeScript e CSS Modules:
```
Button/
├── Button.tsx          → Lógica do componente e props
└── Button.module.css   → Estilos isolados (CSS Modules)
```
* `Button.tsx`
```.
import { NavLink } from "react-router";
import style from "./Button.module.css";

type Size = "small" | "big";
type Color = "laranja" | "cinza" | "transparente" | "branco";
type Border = "quadrada" | "arredondada";
type Theme = "dark" | "light";

interface ButtonProps {
  size: Size;
  color: Color;
  border: Border;
  theme: Theme;
  text: string;
}

export function Button({ size, color, border, theme, text }: ButtonProps) {
  return (
    <NavLink to={text}>
      <button className={`${style[size]} ${style[color]} ${style[border]} ${style[theme]}`}>
        {text}
      </button>
    </NavLink>
  );
}

```
### Explicação:

**1. Props do componente:**
* `size:` define o tamanho do botão (`small` ou `big`).
* `color:` define a cor base do botão (`laranja`, `cinza`, `transparente` ou `branco`).
* `border`: define o formato da borda (`quadrada` ou `arredondada`).
* `theme:` define o tema (`light` ou `dark`), alterando o comportamento do botão dependendo do fundo da página.
* `text:` o texto que aparece no botão e também é usado no `NavLink` para navegar.

**2. Uso do NavLink:**
Permite que o botão funcione como um link de navegação no React Router, apontando para o caminho definido em `text`.

**3. Classes dinâmicas:**
Todas as classes de estilo são aplicadas dinamicamente usando template strings `${style[...]}`. Isso permite combinar várias classes de CSS Modules de forma flexível.

## Button.module.css

O arquivo de estilos está organizado por tamanho, cor, tema e borda.

**Tamanhos:**
```.
.big {
  padding: .6rem 0;
  min-width: 15rem;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: .5s;
}

.small {
  padding: .6rem 0;
  min-width: 9rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: .5s;
}
```
* Define largura mínima e padding.
* Ajusta tamanho da fonte e peso.

## Temas e cores

**Tema Light:**
```.
.light {
    &.laranja {
        background-color: var(--laranja);
        color: var(--branco);

        border: 2px solid var(--laranja);
        
        &:hover {
            border: 2px solid var(--cinza);
            background-color: var(--cinza);
        }
    }

    &.cinza {
        background-color: var(--cinza);
        color: var(--branco);

        border: 2px solid var(--cinza);
        
        &:hover {
            border: 2px solid var(--laranja);
            background-color: var(--laranja);
        }
    }

    &.transparente {
        background-color: transparent;
        border: 2px solid var(--cinza);

        &:hover {
            background-color: var(--cinza);
            color: var(--branco);
        }
    }
}
```

Tema Dark:
```.
.dark {
    &.branco {
        background-color: var(--branco);
        border: 2px solid var(--branco);

        color: var(--cinza);

        &:hover {
            background-color: var(--laranja);
            border-color: var(--laranja);

            color: var(--branco);
        }
    }

    &.laranja {
        background-color: var(--laranja);
        border: 2px solid var(--laranja);

        color: var(--branco);

        &:hover {
            background-color: var(--branco);
            border: 2px solid var(--branco);

            color: var(--cinza);
        }
    }

    &.transparente {
        background-color: transparent;
        border: 2px solid var(--branco);

        color: var(--branco);

        &:hover {
            border-color: var(--laranja);
            color: var(--laranja);
        }
    }
}
```
* Cada tema define comportamento de hover diferente.
* Permite usar o mesmo botão em fundos claros ou escuros sem perder contraste.

## Bordas

```.
.quadrada {
    border-radius: .25rem;
}

.arredondada {
    border-radius: 3rem;
}
```

# Como usar o Button

```.
<Button theme="light" size="big" color="cinza" border="quadrada" text="Cupons" />
<Button theme="dark" size="small" color="laranja" border="arredondada" text="Comprar" />
```
* Sempre combine o tema com o fundo da página.
* Use size e border para ajustar o layout.