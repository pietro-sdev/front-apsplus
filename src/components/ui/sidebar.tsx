'use client';
import "bootstrap-icons/font/bootstrap-icons.css"; // Certifique-se de importar o CSS dos ícones
import { useRouter, usePathname } from "next/navigation"; // Para redirecionamento e detecção da rota atual
import { useSidebar } from "./sidebarcontext"; // Importar o hook para obter o estado do sidebar
import { Logo } from "./logo"; // Supondo que o logo seja um componente importado
import { useEffect } from "react"; // Adicionado useEffect para manipulação do localStorage

export default function Sidebar() {
  const router = useRouter(); // Inicializa o hook useRouter
  const pathname = usePathname(); // Para obter a rota atual
  const { isOpen, toggleSidebar } = useSidebar(); // Obter o estado e a função para alternar o sidebar

  const handleLogout = () => {
    // Verificar se estamos no lado do cliente
    if (typeof window !== "undefined") {
      // Remove o token JWT do localStorage
      localStorage.removeItem("token");
    }

    // Redireciona para a página de login
    router.push("/login");
  };

  const handleLinkClick = (path: string) => {
    router.push(path); // Redireciona para a página correspondente
  };

  useEffect(() => {
    // Verificar se estamos no lado do cliente antes de manipular localStorage
    if (typeof window !== "undefined") {
      // Pode-se adicionar manipulações do localStorage ou outras verificações aqui
    }
  }, []);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } flex flex-col h-screen bg-white border-r-[1.5px] border-[#C6C8CA] overflow-y-auto transition-all duration-300 ease-in-out`}
    >
      {/* Botão de fechar/abrir o sidebar */}
      <div className={`flex ${isOpen ? "justify-end" : "justify-center"} p-4`}>
        <button onClick={toggleSidebar}>
          <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"} text-gray-900 text-3xl`}></i>
        </button>
      </div>

      {/* Logotipo */}
      <div className={`flex items-center justify-center h-20 mb-7 -mt-5 ${isOpen ? "block" : "hidden"}`}>
        <Logo size={160} /> {/* Logotipo */}
      </div>

      {/* Menu principal */}
      <div className="mx-4 flex-grow">
        <div className="flex flex-col p-4 space-y-6 font-semibold text-md">

            <a 
            onClick={() => handleLinkClick("/dashboard/agenda")}
            className={`flex ${isOpen ? "items-center space-x-4" : "justify-center"} cursor-pointer ${
                pathname === "/dashboard/agenda" ? "text-azulAps" : "text-gray-600"
            }`}>
            <i
                className={`bi bi-calendar3 ${isOpen ? "w-5 h-5" : "text-2xl"} font-bold ${
                pathname === "/dashboard/agenda" ? "text-azulAps" : "text-[#A0AEC0]"
                }`}
            ></i>
            {isOpen && <span className="flex items-center">Agenda</span>}
            </a>

          <a 
            onClick={() => handleLinkClick("/dashboard/coordenacao")}
            className={`flex ${isOpen ? "items-center space-x-4" : "justify-center"} cursor-pointer ${
              pathname === "/dashboard/coordenacao" ? "text-azulAps" : "text-gray-600"
            }`}>
            <i
                className={`bi bi-bar-chart-line ${isOpen ? "w-5 h-5" : "text-2xl"} ${
                pathname === "/dashboard/coordenacao" ? "text-azulAps":"text-[#A0AEC0]"
                }`}
            ></i>
            {isOpen && <span>Coordenação</span>}
          </a>

          <a 
            onClick={() => handleLinkClick("/dashboard/pacientes")}
            className={`flex ${isOpen ? "items-center space-x-4" : "justify-center"} cursor-pointer ${
              pathname === "/dashboard/pacientes" ? "text-azulAps" : "text-gray-600"
            }`}>
            <i
                className={`bi bi-person-bounding-box ${isOpen ? "w-5 h-5" : "text-2xl"} ${
                pathname === "/dashboard/pacientes" ? "text-azulAps":"text-[#A0AEC0]"
                }`}
            ></i>
            {isOpen && (
              <>
                <span>Pacientes</span>
              </>
            )}
          </a>

          <a 
            onClick={() => handleLinkClick("/dashboard/admin")}
            className={`flex ${isOpen ? "items-center space-x-4" : "justify-center"} cursor-pointer ${
              pathname === "/dashboard/admin" ? "text-azulAps" : "text-gray-600"
            }`}>
            <i
                className={`bi bi-briefcase ${isOpen ? "w-5 h-5" : "text-2xl"} ${
                pathname === "/dashboard/admin" ? "text-azulAps":"text-[#A0AEC0]"
                }`}
            ></i>
            {isOpen && <span>Administração</span>}
          </a>

          <a 
            onClick={() => handleLinkClick("/dashboard/gestao")}
            className={`flex ${isOpen ? "items-center space-x-4" : "justify-center"} cursor-pointer ${
              pathname === "/dashboard/gestao" ? "text-azulAps" : "text-gray-600"
            }`}>
            <i
                className={`bi bi-people ${isOpen ? "w-5 h-5" : "text-2xl"} ${
                pathname === "/dashboard/gestao" ? "text-azulAps":"text-[#A0AEC0]"
                }`}
            ></i>
            {isOpen && <span>Gestão</span>}
          </a>
        </div>

        <div className="w-full border-t-[1.2px] border-[#C6C8CA] my-7"></div>

        {/* Conversas */}
        {isOpen && (
          <div className="p-3">
            <div className="flex gap-2 items-center mb-7">
              <span className="text-gray-500 font-semibold text-sm">CONVERSAS</span>
              <span className="text-white font-medium bg-azulAps py-[0.5px] px-2 rounded-lg text-xs cursor-pointer">Novo Chat</span>
            </div>

            <div className="space-y-4">
              {/* Exemplo de conversa */}
              <a href="#" className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">LE</div>
                <div>
                  <span className="text-gray-800">Leandro</span>
                  <span className="block text-xs text-gray-500">Administração</span>
                </div>
                <i className="bi bi-chat w-5 h-5 text-gray-400 ml-auto"></i>
              </a>
            </div>
          </div>
        )}

        {/* Configurações */}
        <div className="p-4 space-y-6 mt-10 mb-7 font-semibold text-md">
          <a href="#" className="flex items-center space-x-2 text-gray-600">
            <i className="bi bi-gear w-5 h-5 text-[#A0AEC0]"></i>
            {isOpen && <span>Configuração</span>}
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600">
            <i className="bi bi-person-circle w-5 h-5 text-[#A0AEC0]"></i>
            {isOpen && <span>Sua Conta</span>}
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right w-5 h-5 text-[#A0AEC0]"></i>
            {isOpen && <span>Sair</span>}
          </a>
        </div>
      </div>
    </div>
  );
}
