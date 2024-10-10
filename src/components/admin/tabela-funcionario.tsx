'use client';

import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSidebar } from "@/components/ui/sidebarcontext";
import TabelaClinica from "@/components/admin/tabela-clinica";

interface Funcionario {
  id: number;
  nome: string;
  codigo: string;
  profissao: string;
  status: string;
  telefone: string;
  avatarColor: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  bairro: string;
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

export default function TabelaFuncionario() {
  const [mostrarClinicas, setMostrarClinicas] = useState(false);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [menuAberto, setMenuAberto] = useState<{ [key: number]: boolean }>({});
  const [modalAberto, setModalAberto] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<Funcionario | null>(null);
  const { isOpen } = useSidebar();
  const tableWidth = isOpen ? "w-[1000px]" : "w-[1138px]";

  // Função para buscar os funcionários cadastrados do backend
  const fetchFuncionarios = async () => {
    try {
      const response = await fetch('http://localhost:3001/employees');
      if (response.ok) {
        const data = await response.json();
        const funcionariosComCodigo = data.map((funcionario: any, index: number) => ({
          id: funcionario.id,
          nome: funcionario.fullName,
          codigo: `#FC${(index + 1).toString().padStart(3, '0')}`,
          profissao: "Médico",
          status: "Ativo",
          telefone: funcionario.phone,
          avatarColor: "bg-gray-300",
          cep: funcionario.cep,
          endereco: funcionario.address,
          cidade: funcionario.city,
          estado: funcionario.state,
          bairro: funcionario.neighborhood,
        }));
        setFuncionarios(funcionariosComCodigo);
      } else {
        console.error("Erro ao buscar os funcionários.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Função para excluir o funcionário
  const excluirFuncionario = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/employees/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFuncionarios((prev) => prev.filter((funcionario) => funcionario.id !== id));
        // Exibe o toast de sucesso
        toast.success("Funcionário excluído com sucesso.", {
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
        // Exibe o toast de erro
        toast.error("Erro ao excluir o funcionário.");
      }
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      toast.error("Erro ao excluir o funcionário.");
    }
  };

  // useEffect para buscar os funcionários quando o componente carrega
  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const handleMostrarClinicas = () => {
    setMostrarClinicas(true);
  };

  const toggleMenu = (index: number) => {
    setMenuAberto((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const exibirFuncionario = (funcionario: Funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setFuncionarioSelecionado(null);
  };

  if (mostrarClinicas) {
    return <TabelaClinica />;
  }

  return (
    <div className={`rounded-xl ${tableWidth} h-[300px] bg-white ml-5 overflow-y-auto shadow`}>
      <ToastContainer /> {/* Toast container para exibir os toasts */}
      <div className="py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold mb-4 ml-3">
            Funcionários - Total de {funcionarios.length} funcionários cadastrados.
          </h2>
          <div className="flex space-x-4 mb-3 mr-3">
            {/* Botão de Recarregar */}
            <button
              onClick={fetchFuncionarios} // Chama a função para recarregar os dados
              className="flex items-center font-semibold justify-center border-[1.5px] border-[#C6C8CA] bg-white text-black text-xs px-3 py-1 rounded-lg hover:bg-gray-300 transition"
            >
              <i className="bi bi-arrow-clockwise mr-2"></i> {/* Ícone de recarregar do Bootstrap Icons */}
              Recarregar
            </button>
            {/* Botão de Mostrar Clínicas */}
            <button
              onClick={handleMostrarClinicas}
              className="font-semibold text-xs text-black border-[1.5px] border-[#C6C8CA] px-3 py-1 rounded-lg"
            >
              Visualizar Clínicas
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">NOME</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Código</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Profissão</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Status</th>
                <th className="text-left p-3 font-medium uppercase text-xs mr-4 text-[#8492A6]">Telefone</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Ações</th>
              </tr>
            </thead>
            <tbody className="font-regular text-sm">
              {funcionarios.map((funcionario, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3 flex items-center space-x-3">
                    <span className={`inline-block h-8 w-8 rounded-full ${funcionario.avatarColor}`}></span>
                    <span className="font-semibold">{funcionario.nome}</span>
                  </td>
                  <td className="p-3">{funcionario.codigo}</td>
                  <td className="p-3">{funcionario.profissao}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-[6px] rounded-md text-xs font-medium ${
                        funcionario.status === "Ativo" ? "bg-[#4AAE8C] text-white" : "bg-[#F16063] text-white"
                      }`}
                    >
                      {funcionario.status}
                    </span>
                  </td>
                  <td className="p-3">{formatTelefone(funcionario.telefone)}</td>
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
                            onClick={() => excluirFuncionario(funcionario.id)}
                          >
                            Excluir
                          </li>
                          <li
                            className="px-4 py-2 text-sm text-yellow-500 hover:bg-yellow-100 cursor-pointer"
                            onClick={() => alert('Inativar funcionário')}
                          >
                            Inativar
                          </li>
                          <li
                            className="px-4 py-2 text-sm text-blue-500 hover:bg-blue-100 cursor-pointer"
                            onClick={() => exibirFuncionario(funcionario)}
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
          Mostrando {funcionarios.length} itens de {funcionarios.length} resultados encontrados.
        </div>
      </div>

      {modalAberto && funcionarioSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-[70%] md:max-w-[700px] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Detalhes do Funcionário</h2>
            <p><strong>Nome:</strong> {funcionarioSelecionado.nome}</p>
            <p><strong>Profissão:</strong> {funcionarioSelecionado.profissao}</p>
            <p><strong>Telefone:</strong> {formatTelefone(funcionarioSelecionado.telefone)}</p>
            <p><strong>CEP:</strong> {funcionarioSelecionado.cep}</p>
            <p><strong>Endereço:</strong> {funcionarioSelecionado.endereco}, {funcionarioSelecionado.bairro}</p>
            <p><strong>Cidade:</strong> {funcionarioSelecionado.cidade}</p>
            <p><strong>Estado:</strong> {funcionarioSelecionado.estado}</p>
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
