import { useState } from "react";
import style from "./Input.module.css";

type InputType = "text" | "password";
type IconType = "bi bi-envelope" | "bi bi-eye" | "bi bi-eye-slash" | "bi bi-person";
type ThemeType = "light" | "dark";

interface InputProps {
  id: string;
  label: string;
  type: InputType;
  placeholder: string;
  icon: IconType;
  theme: ThemeType;
}

export function Input({
  id,
  label,
  type,
  placeholder,
  icon,
  theme,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  let iconClass: IconType = icon;

  if (icon === "bi bi-eye") {
    iconClass = showPassword ? "bi bi-eye-slash" : "bi bi-eye";
  }

  const handleTogglePassword = () => {
    if (type === "password" && icon === "bi bi-eye") {
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
          disabled={icon !== "bi bi-eye"}
        >
          <i className={iconClass}></i>
        </button>
      </div>
    </div>
  );
}
