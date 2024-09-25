'use client'
import { useState } from "react";

type Props = {
  placeholder: string;
  icon?: string; // Nome da classe do ícone do Bootstrap
  type: string;
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputWithIcon({
  placeholder,
  icon = "",
  type,
  value,
  onChange,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <input
        type={isPasswordVisible && type === "password" ? "text" : type} // Alterar o tipo de input com base na visibilidade
        placeholder={placeholder}
        className="appearance-none font-medium rounded-lg block w-full px-4 py-3 pr-12 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={onChange} // Chamando onChange se for passado
      />
      {type === "password" && (
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={togglePasswordVisibility} // Alterna a visibilidade ao clicar no ícone
        >
          <i
            className={`bi ${isPasswordVisible ? "bi-eye-slash" : "bi-eye"} text-azulAps text-2xl`}
          ></i>
        </div>
      )}
    </div>
  );
}
