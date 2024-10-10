'use client';

import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSidebar } from "@/components/ui/sidebarcontext";

interface Paciente {
  id: number;
  nomeCompleto: string;
  codigo: string;
  cidade: string;
  status: string;
  telefone: string;
  avatarColor: string;
  cep: string;
  endereco: string;
  bairro: string;
  estado: string;
}

// Função para formatar o telefone
const formatTelefone = (telefone: string) => {
  const cleanedValue = telefone.replace(/\D/g, '');

  if (cleanedValue.length <= 10) {
    return `+55 (${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 6)}-${cleanedValue.slice(6)}`;
  } else {
    return `+55 (${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7)}`;
  }
};

export default function TabelaPacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [menuAberto, setMenuAberto] = useState<{ [key: number]: boolean }>({});
  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);
  const { isOpen } = useSidebar();
  const tableWidth = isOpen ? "w-[1000px]" : "w-[1138px]";

  // Função para buscar os pacientes cadastrados do backend
  const fetchPacientes = async () => {
    try {
      const response = await fetch('https://back-apsplus-production.up.railway.app/patients'); // Verifique a rota correta da sua API
      if (response.ok) {
        const data = await response.json();
        const pacientesComCodigo = data.map((paciente: any, index: number) => ({
          id: paciente.id,
          nomeCompleto: paciente.nomeCompleto,
          codigo: `#PC${(index + 1).toString().padStart(3, '0')}`,
          cidade: paciente.cidade,
          status: "Ativo", // Ajuste de acordo com a resposta da sua API
          telefone: paciente.telefone,
          avatarColor: "bg-gray-300", // Você pode ajustar essa cor conforme necessidade
          cep: paciente.cep,
          endereco: paciente.endereco,
          bairro: paciente.bairro,
          estado: paciente.estado,
        }));
        setPacientes(pacientesComCodigo);
      } else {
        console.error("Erro ao buscar os pacientes.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Função para excluir o paciente
  const excluirPaciente = async (id: number) => {
    try {
      const response = await fetch(`https://back-apsplus-production.up.railway.app/patients/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPacientes((prev) => prev.filter((paciente) => paciente.id !== id));
        toast.success("Paciente excluído com sucesso.", {
          icon: false,
          style: {
            background: '#22C55E',
            color: '#FFF',
            borderRadius: '5px',
            padding: '5px 10px',
            fontWeight: 'bold',
            fontSize: '15px',
            marginTop: '10px',
          }
        });
      } else {
        toast.error("Erro ao excluir o paciente.");
      }
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
      toast.error("Erro ao excluir o paciente.");
    }
  };

  // useEffect para buscar os pacientes quando o componente carrega
  useEffect(() => {
    fetchPacientes();
  }, []);

  const toggleMenu = (index: number) => {
    setMenuAberto((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const exibirPaciente = (paciente: Paciente) => {
    setPacienteSelecionado(paciente);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPacienteSelecionado(null);
  };

  return (
    <div className={`rounded-xl ${tableWidth} h-[450px] bg-white ml-5 overflow-y-auto shadow`}>
      <ToastContainer /> {/* Toast container para exibir os toasts */}
      <div className="py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold mb-4 ml-3">
            Pacientes - Total de {pacientes.length} pacientes cadastrados.
          </h2>
          <button
            onClick={fetchPacientes} // Chama a função para recarregar os dados
            className="flex mb-3 mr-5 items-center font-semibold justify-center border-[1.5px] border-[#C6C8CA] bg-white text-black text-xs px-3 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <i className="bi bi-arrow-clockwise mr-2"></i> {/* Ícone de recarregar do Bootstrap Icons */}
            Recarregar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">NOME</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Código</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Cep</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Cidade</th>
                <th className="text-left p-3 font-medium uppercase text-xs mr-4 text-[#8492A6]">Telefone</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Ações</th>
              </tr>
            </thead>
            <tbody className="font-regular text-sm">
              {pacientes.map((paciente, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3 flex items-center space-x-3">
                    <span className={`inline-block h-8 w-8 rounded-full ${paciente.avatarColor}`}></span>
                    <span className="font-semibold">{paciente.nomeCompleto}</span>
                  </td>
                  <td className="p-3">{paciente.codigo}</td>
                  <td className="p-3">{paciente.cep}</td>
                  <td className="p-3">{paciente.cidade}</td>
                  <td className="p-3">{formatTelefone(paciente.telefone)}</td>
                  <td className="p-3 relative">
                    <button
                      className="bg-white font-semibold text-xs text-black border-[1.5px] border-[#C6C8CA] px-3 py-1 rounded-lg"
                      onClick={() => toggleMenu(index)}
                    >
                      Ver Mais
                    </button>

                    {menuAberto[index] && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <ul>
                          <li
                            className="px-4 py-2 text-sm text-red-500 hover:bg-red-100 cursor-pointer"
                            onClick={() => excluirPaciente(paciente.id)}
                          >
                            Excluir
                          </li>
                          <li
                            className="px-4 py-2 text-sm text-yellow-500 hover:bg-yellow-100 cursor-pointer"
                            onClick={() => alert('Inativar paciente')}
                          >
                            Inativar
                          </li>
                          <li
                            className="px-4 py-2 text-sm text-blue-500 hover:bg-blue-100 cursor-pointer"
                            onClick={() => exibirPaciente(paciente)}
                          >
                            Exibir
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-500 mt-3 ml-3">
          Mostrando {pacientes.length} itens de {pacientes.length} resultados encontrados.
        </div>
      </div>

      {modalAberto && pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-[70%] md:max-w-[700px] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Detalhes do Paciente</h2>
            <p><strong>Nome Completo:</strong> {pacienteSelecionado.nomeCompleto}</p>
            <p><strong>Telefone:</strong> {formatTelefone(pacienteSelecionado.telefone)}</p>
            <p><strong>CEP:</strong> {pacienteSelecionado.cep}</p>
            <p><strong>Endereço:</strong> {pacienteSelecionado.endereco}, {pacienteSelecionado.bairro}</p>
            <p><strong>Cidade:</strong> {pacienteSelecionado.cidade}</p>
            <p><strong>Estado:</strong> {pacienteSelecionado.estado}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={fecharModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
