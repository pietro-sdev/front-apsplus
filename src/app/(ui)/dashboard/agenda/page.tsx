import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebarcontext";

// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex max-w-[1500px] h-screen bg-[#F7FAFC]">
        <Sidebar /> {/* Sidebar controlado pelo contexto */}
        <div className="flex-grow">
          <Navbar
            h1="Agenda de Consultas"
            buttons={[
              {
                type: 'download',
                label: 'Download',
                iconClass: 'bi bi-pencil-square', // Ícone de download
              },
              {
                type: 'addPaciente',
                label: 'Adicionar Pacientes',
                iconClass: 'bi bi-plus-lg', // Ícone de adicionar funcionário
              },
            ]}
            downloadOptions={['patients']} 
          />
          <div className="mt-5">
          </div>
        </div>
      </div>
    </SidebarProvider>

  );
}
