import { useState } from "react";
import style from "./Input.module.css";

type InputType = "text" | "password";
type IconType = "bi bi-envelope" | "bi bi-eye";
type ThemeType = "light" | "dark"

interface InputProps {
  id: string;
  label: string;
  type: InputType;
  placeholder: string;
  icon: IconType;
  theme: ThemeType
}

export function Input({ id, label, type, placeholder, icon, theme }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const iconClass =
    icon === "bi bi-envelope"
      ? "bi bi-envelope"
      : showPassword
      ? "bi bi-eye-slash"
      : "bi bi-eye";

  const handleTogglePassword = () => {
    if (type === "password") {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className={`column ${style.box} ${style[theme]}`}>
      <label htmlFor={id}>{label}</label>

      <div className={`row ${style.input}`}>
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={handleTogglePassword}
          disabled={type !== "password" && icon === "bi bi-envelope"}
        >
          <i className={iconClass}></i>
        </button>
      </div>
    </div>
  );
}
