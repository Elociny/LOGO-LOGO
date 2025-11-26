import { useEffect } from "react";
import style from "./Modal.module.css";

type ModalType = "success" | "error" | "warning";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: ModalType;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, type, title, children }: ModalProps) {
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const iconMap = {
        success: "bi-check-circle-fill",
        error: "bi-x-circle-fill",
        warning: "bi-exclamation-triangle-fill"
    };

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                
                <button className={style.closeButton} onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>

                <div className={style.header}>
                    <i className={`bi ${iconMap[type]} ${style.icon} ${style[type]}`}></i>
                    <h2 className={style.title}>{title}</h2>
                </div>

                <div className={style.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}