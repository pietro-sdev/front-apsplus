'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputWithIcon from "../ui/input";
import { useToast } from "@/hooks/use-toast"; // Importar useToast
import { ToastAction } from "../ui/toast"; // Importar ToastAction
import { Toaster } from "../ui/toaster"; // Importar Toaster

export default function LoginForm() {
  const router = useRouter(); // Inicialize o hook useRouter
  const { toast } = useToast(); // Inicialize o hook do toast

  // Armazenar email e senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      const res = await fetch('https://back-apsplus-production.up.railway.app/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Enviar email e senha
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      // Salvar token no localStorage
      localStorage.setItem('token', data.token);

      // Exibir toast de sucesso
      toast({
        title: "Login realizado com sucesso!",
        description:"Levando você para dentro!",
        variant: "success",
        action: <ToastAction altText="Fechar">Ok</ToastAction>,
      });

      // Simula um redirecionamento após o toast
      setTimeout(() => {
        router.push("/dashboard/agenda"); // Redireciona para a página dashboard
      }, 2000);

    } catch (error: any) {
      // Exibe o toast de erro
      toast({
        title: "Erro ao fazer login",
        description: "Senha e/ou e-mail incorreto.",
        variant: "destructive",
        action: <ToastAction altText="Fechar">Ok</ToastAction>,
      });
    }
  };

  return (
    <>
      {/* Componente Toaster para renderizar os toasts */}
      <Toaster />

      <form onSubmit={handleSubmit} className="mt-8 space-y-6 w-full max-w-md">
        <div className="rounded-md shadow-sm space-y-5">
          {/* E-mail input with icon */}
          <div className="relative">
            <p className="text-sm font-medium text-gray-600 mb-1">E-mail</p>
            <InputWithIcon
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input with icon */}
          <div className="relative mt-3">
            <p className="text-sm font-medium text-gray-600 mb-1">Senha</p>
            <InputWithIcon
              placeholder="Digite sua senha"
              type="password"
              icon="bi-eye"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <div className="text-sm -mt-5">
            <a href="/esqueci-a-senha" className="font-medium text-azulAps hover:underline">
              Esqueceu a senha?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-azulAps focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Entrar
          </button>
        </div>
      </form>
    </>
  );
}
