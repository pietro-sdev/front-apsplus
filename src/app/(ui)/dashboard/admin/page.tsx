import Navbar from '@/components/ui/navbar';
import Sidebar from '@/components/ui/sidebar';
import AdminCards from '@/components/admin/cards-admin';
import TabelaFuncionario from '@/components/admin/tabela-funcionario';
import { SidebarProvider } from '@/components/ui/sidebarcontext';

export default function Page() {
  return (
    <SidebarProvider>
      <div className="flex max-w-[1500px] h-screen bg-[#F7FAFC]">
        <Sidebar /> {/* Sidebar controlado pelo contexto */}
        <div className="flex-grow">
          <Navbar
            h1="Administração"
            buttons={[
              {
                type: 'download',
                label: 'Download',
                iconClass: 'bi bi-pencil-square', // Ícone de download
              },
              {
                type: 'addFuncionario',
                label: 'Adicionar Funcionário',
                iconClass: 'bi bi-plus-lg', // Ícone de adicionar funcionário
              },
              {
                type: 'addClinica',
                label: 'Adicionar Clínica',
                iconClass: 'bi bi-plus-lg', // Ícone de adicionar clínica
              },
            ]}
            downloadOptions={['employees', 'clinics']} 
          />
          <div className="-px-3">
            <AdminCards />
          </div>
          <div className="mt-5">
            <TabelaFuncionario />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
