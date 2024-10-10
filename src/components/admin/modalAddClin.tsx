'use client';

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalClinica({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    nomeClinica: '',
    telefone: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  // Função para formatar o telefone
  const formatTelefone = (value: string) => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    return cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Formata como (99) 99999-9999
  };

  // Função para buscar o endereço com base no CEP
  const fetchAddressByCEP = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData((prevData) => ({
          ...prevData,
          endereco: data.logradouro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          endereco: '',
          cidade: '',
          estado: '',
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      setFormData((prevData) => ({
        ...prevData,
        endereco: '',
        cidade: '',
        estado: '',
      }));
    }
  };

  // Função handleChange para atualizar o estado com o valor formatado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'telefone') {
      formattedValue = formatTelefone(value); // Formata o telefone
    } else if (name === 'cep') {
      formattedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP
      if (formattedValue.length === 8) {
        fetchAddressByCEP(formattedValue); // Busca o endereço automaticamente quando o CEP for completo
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  // Função para validar os campos obrigatórios
  const validateForm = () => {
    const formErrors: string[] = [];
    if (!formData.nomeClinica) formErrors.push('nomeClinica');
    if (!formData.telefone) formErrors.push('telefone');
    if (!formData.cep) formErrors.push('cep');
    if (!formData.endereco) formErrors.push('endereco');
    if (!formData.cidade) formErrors.push('cidade');
    if (!formData.estado) formErrors.push('estado');

    setErrors(formErrors);
    return formErrors.length === 0;
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3001/clinicas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Clínica cadastrada com sucesso!', {
            icon: false,
            style: {
              background: '#22C55E',
              color: '#FFF',
              borderRadius: '5px',
              padding: '5px 10px',
              fontWeight: 'bold',
              fontSize: '15px',
              marginTop: '10px',
            },
          });

          setTimeout(() => {
            onClose(); // Fecha o modal após o toast de sucesso
          }, 500);

          // Limpa os campos do formulário
          setFormData({
            nomeClinica: '',
            telefone: '',
            cep: '',
            endereco: '',
            cidade: '',
            estado: '',
          });
        } else {
          throw new Error(data.error || 'Erro ao cadastrar clínica');
        }
      } catch (error: any) {
        toast.error(`Erro: ${error.message || 'Erro ao cadastrar clínica'}`, {
          style: {
            background: '#DC2626',
            color: '#FFF',
            borderRadius: '5px',
            padding: '5px 10px',
            fontWeight: 'bold',
            fontSize: '15px',
            marginTop: '10px',
          },
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer /> {/* Necessário para exibir os toasts do react-toastify */}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full max-w-[70%] md:max-w-[600px] p-6 rounded-lg shadow-lg">
          <h1 className="mb-5 text-xl font-semibold">Adicionar Clínica</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome da Clínica */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Nome da Clínica <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="nomeClinica"
                  value={formData.nomeClinica}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('nomeClinica') ? 'border-red-600' : ''}`}
                  required
                />
              </div>

              {/* Telefone da Clínica */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Telefone <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('telefone') ? 'border-red-600' : ''}`}
                  required
                  maxLength={15}
                />
              </div>

              {/* CEP */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  CEP <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cep') ? 'border-red-600' : ''}`}
                  required
                  maxLength={8}
                />
              </div>

              {/* Endereço */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Endereço <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('endereco') ? 'border-red-600' : ''}`}
                  required
                  readOnly
                />
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Cidade <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cidade') ? 'border-red-600' : ''}`}
                  required
                  readOnly
                />
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Estado <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('estado') ? 'border-red-600' : ''}`}
                  required
                  readOnly
                />
              </div>

              {/* Botões de Ação */}
              <div className="col-span-2 flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-black rounded-lg font-medium text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-azulAps text-white rounded-lg font-medium text-sm"
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
