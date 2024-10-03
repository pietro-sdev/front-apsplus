'use client';

import { useState, useEffect } from "react"; // Importa useEffect para buscar dados quando o componente carrega
import { useSidebar } from "@/components/ui/sidebarcontext"; // Importa o contexto do Sidebar
import TabelaClinica from "@/components/admin/tabela-clinica"; // Importa a tabela de Clínicas

interface Funcionario {
  id: number; // Adicione o ID para referenciar no backend
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
  const cleanedValue = telefone.replace(/\D/g, ''); // Remove qualquer caractere não numérico

  if (cleanedValue.length <= 10) {
    return `+55 (${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 6)}-${cleanedValue.slice(6)}`;
  } else {
    return `+55 (${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7)}`; // Formato para celular com 9 dígitos
  }
};

export default function TabelaFuncionario() {
  const [mostrarClinicas, setMostrarClinicas] = useState(false); // Estado para alternar entre as tabelas
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]); // Estado para armazenar funcionários dinâmicos
  const [menuAberto, setMenuAberto] = useState<{ [key: number]: boolean }>({}); // Estado para controlar o menu de opções
  const [modalAberto, setModalAberto] = useState(false); // Estado para controlar a visibilidade do modal
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<Funcionario | null>(null); // Armazena o funcionário selecionado para exibição
  const { isOpen } = useSidebar(); // Acessa o estado do sidebar pelo contexto
  const tableWidth = isOpen ? "w-[1000px]" : "w-[1138px]"; // Ajuste da largura com base no estado do sidebar

  // Função para buscar os funcionários cadastrados do backend
  const fetchFuncionarios = async () => {
    try {
      const response = await fetch('https://back-apsplus-production.up.railway.app/employees'); // Ajuste a URL conforme sua rota do backend
      if (response.ok) {
        const data = await response.json();
        // Adiciona o código dinâmico e cor para cada funcionário
        const funcionariosComCodigo = data.map((funcionario: any, index: number) => ({
          id: funcionario.id,
          nome: funcionario.fullName,
          codigo: `#FC${(index + 1).toString().padStart(3, '0')}`, // Gera o código no formato FC001, FC002...
          profissao: "Médico", // Setando a profissão como Médico
          status: "Ativo", // Setando status como Ativo por padrão
          telefone: funcionario.phone,
          avatarColor: "bg-gray-300", // Cor padrão do avatar
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
      const response = await fetch(`https://back-apsplus-production.up.railway.app/employees/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove o funcionário do estado
        setFuncionarios((prev) => prev.filter((funcionario) => funcionario.id !== id));
        alert('Funcionário excluído com sucesso');
      } else {
        alert('Erro ao excluir o funcionário');
      }
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      alert('Erro ao excluir o funcionário');
    }
  };

  // useEffect para buscar os funcionários quando o componente carrega
  useEffect(() => {
    fetchFuncionarios();
  }, []);

  // Função para alternar entre tabelas
  const handleMostrarClinicas = () => {
    setMostrarClinicas(true);
  };

  // Função para abrir/fechar o menu de opções de um funcionário
  const toggleMenu = (index: number) => {
    setMenuAberto((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Função para abrir o modal e exibir os dados do funcionário selecionado
  const exibirFuncionario = (funcionario: Funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setModalAberto(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalAberto(false);
    setFuncionarioSelecionado(null);
  };

  // Renderiza a tabela de clínicas se o estado for verdadeiro
  if (mostrarClinicas) {
    return <TabelaClinica />;
  }

  return (
    <div className={`rounded-xl ${tableWidth} h-[300px] bg-white ml-5 overflow-y-auto shadow`}>
      <div className="py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold mb-4 ml-3">
            Funcionários - Total de {funcionarios.length} funcionários cadastrados.
          </h2>
          <button
            onClick={handleMostrarClinicas} // Alterna para a tabela de clínicas ao clicar
            className="font-semibold mb-4 mr-10 text-xs text-black border-[1.5px] border-[#C6C8CA] px-3 py-1 rounded-lg"
          >
            Visualizar Clínicas
          </button>
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
                  <td className="p-3">{formatTelefone(funcionario.telefone)}</td> {/* Aplica a formatação ao telefone */}
                  <td className="p-3 relative">
                    <button
                      className="bg-white font-semibold text-xs text-black border-[1.5px] border-[#C6C8CA] px-3 py-1 rounded-lg"
                      onClick={() => toggleMenu(index)}
                    >
                      Ver Mais
                    </button>

                    {/* Caixinha com opções */}
                    {menuAberto[index] && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <ul>
                          <li
                            className="px-4 py-2 text-sm text-red-500 hover:bg-red-100 cursor-pointer"
                            onClick={() => excluirFuncionario(funcionario.id)} // Chama a função de exclusão
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
                            onClick={() => exibirFuncionario(funcionario)} // Abre o modal para exibir o funcionário
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

      {/* Modal para exibir os detalhes do funcionário */}
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
