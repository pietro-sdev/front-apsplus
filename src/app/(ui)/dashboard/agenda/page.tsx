import Sidebar from "@/components/ui/sidebar";

export default function Page() {
    return(
        <div className="flex max-w-[1500px] h-screen bg-[#F7FAFC]">
      <Sidebar />
      <div className="flex-grow p-6">
        {/* Adicione aqui o conteúdo da página */}
        AGENDA
      </div>
    </div>
  );
}