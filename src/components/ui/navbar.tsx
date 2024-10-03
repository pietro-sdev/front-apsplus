'use client';
import { useState } from 'react';
import Modal from '@/components/admin/modalAddFunc'; // Importa o componente Modal que vamos criar

type Props = {
  h1: string;
};

export default function Navbar({ h1 }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  // Função para abrir o modal
  const handleAddFuncionarioClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-white py-6 px-6 rounded-md shadow-sm">
        <h1 className="text-lg font-semibold select-text">{h1}</h1>
        <div className="flex space-x-4">
          <button className="border border-gray-300 text-gray-900 text-xs px-5 py-2 rounded-lg font-medium flex items-center gap-x-2">
            <i className="bi bi-pencil-square text-gray-900"></i> Download
          </button>
          <button className="bg-azulAps text-white text-xs px-3 py-2 rounded-lg font-medium gap-x-2">
            <i className="bi bi-plus-lg text-white"></i> Adicionar Clínica
          </button>
          <button
            onClick={handleAddFuncionarioClick} // Abre o modal ao clicar
            className="bg-azulAps text-white text-xs px-3 py-2 rounded-lg font-medium gap-x-2"
          >
            <i className="bi bi-plus-lg text-white"></i> Adicionar Funcionário
          </button>
        </div>
      </nav>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Fecha o modal
        />
      )}
    </>
  );
}
