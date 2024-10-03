'use client';

import { useState } from "react"; // Importa useState
import { useSidebar } from "@/components/ui/sidebarcontext"; // Importa o contexto do Sidebar
import TabelaFuncionario from "./tabela-funcionario"; "@/components/admin/tabela-funcionario"; // Importa a tabela de Clínicas


interface Clinica {
  nome: string;
  codigo: string;
  cidade: string;
  status: string;
  telefone: string;
  avatarColor: string;
}

export default function TabelaClinica() {
  const [mostrarClinicas, setMostrarClinicas] = useState(false); // Estado para alternar entre as tabelas
  const clinicas: Clinica[] = [
    {
      nome: "Clinica 02",
      codigo: "#CL001",
      cidade: "São Paulo",
      status: "Ativo",
      telefone: "+55 (11) 98014-1941",
      avatarColor: "bg-gray-300",
    },
    {
      nome: "Clinica 02",
      codigo: "#CL002",
      cidade: "Rio Branco",
      status: "Inativo",
      telefone: "+55 (11) 98014-1941",
      avatarColor: "bg-orange-300",
    },
    {
      nome: "Clinica 03",
      codigo: "#CL003",
      cidade: "Rio Branco",
      status: "Inativo",
      telefone: "+55 (11) 98014-1941",
      avatarColor: "bg-orange-300",
    },
    {
      nome: "Clinica 04",
      codigo: "#CL004",
      cidade: "Rio Branco",
      status: "Inativo",
      telefone: "+55 (11) 98014-1941",
      avatarColor: "bg-orange-300",
    },
  ];

  const { isOpen } = useSidebar(); // Acessa o estado do sidebar pelo contexto
  const tableWidth = isOpen ? "w-[1000px]" : "w-[1138px]"; // Ajuste da largura com base no estado do sidebar

  // Função para alternar entre tabelas
  const handleMostrarClinicas = () => {
    setMostrarClinicas(true);
  };

  if (mostrarClinicas) {
    return <TabelaFuncionario/>;
  }

  return (
    <div className={`rounded-xl ${tableWidth} h-[300px] bg-white ml-5 overflow-y-auto shadow`}>
      <div className="py-4">
        <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold mb-4 ml-3">
          Clinicas - Total de {clinicas.length} clinicas cadastrados.
        </h2>
        <button
            onClick={handleMostrarClinicas} // Alterna para a tabela de clínicas ao clicar
            className="font-semibold mb-4 mr-10 text-xs text-black border-[1.5px] border-[#C6C8CA] px-3 py-1 rounded-lg"
          >
            Visualizar Funcionários
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">NOME</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Código</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">CIDADE</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Status</th>
                <th className="text-left p-3 font-medium uppercase text-xs mr-4 text-[#8492A6]">Telefone</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Ações</th>
              </tr>
            </thead>
            <tbody className="font-regular text-sm">
              {clinicas.map((clinicas, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3 flex items-center space-x-3">
                    <span className={`inline-block h-8 w-8 rounded-full ${clinicas.avatarColor}`}></span>
                    <span className="font-semibold">{clinicas.nome}</span>
                  </td>
                  <td className="p-3">{clinicas.codigo}</td>
                  <td className="p-3">{clinicas.cidade}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-[6px] rounded-md text-xs font-medium ${
                        clinicas.status === "Ativo" ? "bg-[#4AAE8C] text-white" : "bg-[#F16063] text-white"
                      }`}
                    >
                      {clinicas.status}
                    </span>
                  </td>
                  <td className="p-3">{clinicas.telefone}</td>
                  <td className="p-3">
                    <button className="bg-white font-semibold text-xs text-black border-[1.5px] border-[#C6C8CA] px-3 py-1 rounded-lg">
                      Ver Mais
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-500 mt-3 ml-3">
          Mostrando {clinicas.length} itens de {clinicas.length} resultados encontrados.
        </div>
      </div>
    </div>
  );
}
