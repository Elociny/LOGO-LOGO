import React, { useState } from 'react';
import styles from './FormInput.module.css';

interface FormInputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: string;
  id?: string;
  label?: string;
  theme?: 'light' | 'dark';
}

export function FormInput({ 
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  className = '',
  icon,
  id,
  label,
  theme = 'light'
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`${styles.inputGroup} ${styles[theme]} ${className}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      
      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          className={styles.formInput}
          /* Adicione padding condicional */
          style={{ 
            paddingRight: type === 'password' ? '3rem' : '2.5rem',
            paddingLeft: '1rem'
          }}
        />
        
        {/* Ícone principal - só mostra se NÃO for password */}
        {icon && type !== 'password' && (
          <i className={`${icon} ${styles.icon}`}></i>
        )}
        
        {/* Ícone de password - só mostra se FOR password */}
        {type === 'password' && (
          <button 
            type="button" 
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility}
          >
            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
          </button>
        )}
      </div>
    </div>
  );
}