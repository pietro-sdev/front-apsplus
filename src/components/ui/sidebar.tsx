'use client'
import "bootstrap-icons/font/bootstrap-icons.css"; // Certifique-se de importar o CSS dos ícones
import { useState } from "react"; // Para gerenciar o estado aberto/fechado do sidebar
import { useRouter, usePathname } from "next/navigation"; // Para redirecionamento e detecção da rota atual
import { Logo } from "./logo";

export default function Sidebar() {
  const router = useRouter(); // Inicializa o hook useRouter
  const pathname = usePathname(); // Para obter a rota atual
  const [isOpen, setIsOpen] = useState(true); // Estado para controlar se o sidebar está aberto ou fechado

  const handleLogout = () => {
    // Remove o token JWT do localStorage
    localStorage.removeItem("token");

    // Redireciona para a página de login
    router.push("/login");
  };

  const toggleSidebar = () => {
    // Alterna o estado de visibilidade do sidebar
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path: string) => {
    router.push(path); // Navega para a rota
  };

  return (
    <div
      className={`${
        isOpen ? "w-72" : "w-20"
      } flex flex-col h-screen bg-white border-r-[1.5px] border-[#C6C8CA] overflow-y-auto transition-all duration-300 ease-in-out`}>
      
      {/* Botão de fechar/abrir o sidebar */}
      <div className="flex justify-end p-2">
        <button onClick={toggleSidebar}>
          <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"} text-[#A0AEC0] text-2xl`}></i>
        </button>
      </div>

      {/* Logotipo */}
      <div className={`flex items-center justify-center h-20 mb-7 mt-5 ${isOpen ? "block" : "hidden"}`}>
        <Logo size={160} />
      </div>

      {/* Menu principal */}
      <div className="mx-4 flex-grow">
        <div className="flex flex-col p-4 space-y-6 font-semibold text-md">

            <a 
            onClick={() => handleLinkClick("/dashboard/agenda")}
            className={`flex items-center space-x-4 cursor-pointer ${
                pathname === "/dashboard/agenda" ? "text-azulAps" : "text-gray-600"
            }`}>
            <i
                className={`bi bi-calendar3 w-5 h-5 ${
                pathname === "/dashboard/agenda" ? "text-azulAps" : "text-[#A0AEC0]"
                }`}
            ></i>
            {isOpen && <span className="flex items-center">Agenda</span>}
            </a>

          <a 
            onClick={() => handleLinkClick("/dashboard/coordenacao")}
            className={`flex items-center space-x-4 cursor-pointer ${
              pathname === "/dashboard/coordenacao" ? "text-azulAps" : "text-gray-600"
            }`}>
            <i
                className={`bi bi-bar-chart-line w-5 h-5 ${
                pathname === "/dashboard/coordenacao" ? "text-azulAps":"text-[#A0AEC0]"
                }`}
            ></i>
            {isOpen && <span>Coordenação</span>}
          </a>

          <a 
            onClick={() => handleLinkClick("/dashboard/pacientes")}
            className={`flex items-center space-x-4 cursor-pointer ${
              pathname === "/dashboard/pacientes" ? "text-azulAps" : "text-gray-600"
            }`}>
            <i
                className={`bi bi-person-bounding-box w-5 h-5 ${
                pathname === "/dashboard/pacientes" ? "text-azulAps":"text-[#A0AEC0]"
                }`}
            ></i>
            {isOpen && (
              <>
                <span>Pacientes</span>
                <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">6</span>
              </>
            )}
          </a>

          <a 
            onClick={() => handleLinkClick("/dashboard/admin")}
            className={`flex items-center space-x-4 cursor-pointer ${
              pathname === "/dashboard/admin" ? "text-azulAps" : "text-gray-600"
            }`}>
            <i
                className={`bi bi-briefcase w-5 h-5 ${
                pathname === "/dashboard/admin" ? "text-azulAps":"text-[#A0AEC0]"
                }`}
            ></i>
            {isOpen && <span>Administração</span>}
          </a>

          <a 
            onClick={() => handleLinkClick("/dashboard/gestao")}
            className={`flex items-center space-x-4 cursor-pointer ${
              pathname === "/dashboard/gestao" ? "text-azulAps" : "text-gray-600"
            }`}>
            <i
                className={`bi bi-people w-5 h-5 ${
                pathname === "/dashboard/gestao" ? "text-azulAps":"text-[#A0AEC0]"
                }`}
            ></i>
            {isOpen && <span>Gestão</span>}
          </a>
        </div>

        <div className="w-full border-t-[1.2px] border-[#C6C8CA] my-7"></div>

        {/* Conversas */}
        {isOpen && (
          <div className="p-4">
            <div className="flex gap-3 items-center mb-7">
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
