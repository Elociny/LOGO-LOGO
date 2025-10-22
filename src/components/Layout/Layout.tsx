import type { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

type LayoutProps = {
  children: ReactNode;
  pageTitle?: string;        // opcional
  className?: string;        // para estilos específicos da página
};

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <main className={`px-100 mg-top children`}>
                {children}
            </main>
            <Footer />
        </>
    )
export function Layout({ children, pageTitle, className }: LayoutProps) {
  return (
    <>
      <Header />
      <main className={`px-100 ${className || ""}`} role="main" aria-label={pageTitle || "Main content"}>
        {pageTitle && <h1 style={{ display: "none" }}>{pageTitle}</h1> /* visível p/ SEO se quiser */}
        {children}
      </main>
      <Footer />
    </>
  );
}