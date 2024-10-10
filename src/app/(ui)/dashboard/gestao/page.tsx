import GestaoCards from "@/components/agenda/cards-agenda";
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
            h1="Gestão"
          />
          <div className="mt-5">
            <GestaoCards/>
          </div>
        </div>
      </div>
    </SidebarProvider>

  );
}
