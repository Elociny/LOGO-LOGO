import type { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <div className={`px-100`}>
                {children}
            </div>
            <Footer />
        </>
    )
}