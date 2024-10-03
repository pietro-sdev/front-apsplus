import Sidebar from "@/components/ui/sidebar";
import Navbar from "@/components/ui/navbar";
import AdminCards from "@/components/admin/cards-admin";
import { SidebarProvider } from "@/components/ui/sidebarcontext"; // Importar o provider
import TabelaFuncionario from "@/components/admin/tabela-funcionario";
import TabelaClinica from "@/components/admin/tabela-clinica";

export default function Page() {
  return (
    <SidebarProvider>
      <div className="flex max-w-[1500px] h-screen bg-[#F7FAFC]">
        <Sidebar /> {/* Sidebar controlado pelo contexto */}
        <div className="flex-grow">
          <Navbar h1="Administração" />
          <div className="-px-3">
          <AdminCards />
          </div>
          <div className="mt-5">
          <TabelaFuncionario/>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
