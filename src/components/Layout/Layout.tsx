import type { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

import style from "./Layout.module.css"

type Theme = "light" | "dark"

interface LayoutProps {
  children: ReactNode;
  theme: Theme
  pageTitle?:string;
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