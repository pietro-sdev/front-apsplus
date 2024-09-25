'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Estado para controle de loading

  useEffect(() => {
    // Verificar se o token JWT está no localStorage
    const token = localStorage.getItem("token");

    // Simular uma pequena demora para dar tempo de verificar o token (opcional)
    setTimeout(() => {
      // Se o token não estiver presente, redirecionar para a página de login
      if (!token) {
        router.push("/login");
      } else {
        // Se o token estiver presente, remover o estado de loading
        setLoading(false);
      }
    }, 1000); // Tempo opcional de simulação de loading
  }, [router]);

  // Mostrar uma tela de loading enquanto verifica o token
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
        {/* Aqui você pode substituir "Loading..." por uma animação de loading */}
      </div>
    );
  }

  // Renderiza o conteúdo da página somente após a verificação do token
  return (
    <div className="flex max-w-[1500px] h-screen bg-[#F7FAFC]">
      <Sidebar />
      <div className="flex-grow p-6">
        {/* Adicione aqui o conteúdo da página */}
        Conteúdo principal da página
      </div>
    </div>
  );
}
