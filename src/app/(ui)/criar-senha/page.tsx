'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CriarSenha() {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/criar-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senha, token }),
      });

      if (response.ok) {
        alert('Conta criada com sucesso!');
        router.push('/login'); // Redireciona para o login
      } else {
        alert('Erro ao criar a conta');
      }
    } catch (error) {
      console.error('Erro ao criar a conta:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 font-bold">Criar Senha</h2>
        <input
          type="password"
          placeholder="Nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
          Criar Conta
        </button>
      </form>
    </div>
  );
}
