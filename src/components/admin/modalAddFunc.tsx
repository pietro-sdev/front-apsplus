'use client';

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Importa toast e ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa os estilos do react-toastify

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    profissao: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const [step, setStep] = useState(1); // Controle das etapas
  const [errors, setErrors] = useState<string[]>([]); // Armazena os erros

  // Função para formatar o número de telefone
  const formatTelefone = (value: string) => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (cleanedValue.length <= 10) {
      return cleanedValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return cleanedValue.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3'); // Formato para celular com 9 dígitos
    }
  };

  // Função para formatar o CPF
  const formatCPF = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length <= 3) {
      return cleanedValue;
    } else if (cleanedValue.length <= 6) {
      return cleanedValue.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cleanedValue.length <= 9) {
      return cleanedValue.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else {
      return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
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
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          endereco: '',
          bairro: '',
          cidade: '',
          estado: '',
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      setFormData((prevData) => ({
        ...prevData,
        endereco: '',
        bairro: '',
        cidade: '',
        estado: '',
      }));
    }
  };

  // Função handleChange para atualizar o estado com o valor formatado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'telefone') {
      formattedValue = formatTelefone(value); // Formata o telefone
    } else if (name === 'cep') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length === 8) {
        fetchAddressByCEP(formattedValue);
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  // Função para validar os campos do step 1
  const validateStep1 = () => {
    const step1Errors: string[] = [];
    if (!formData.nome) step1Errors.push('nome');
    if (!formData.cpf) step1Errors.push('cpf');
    if (!formData.telefone) step1Errors.push('telefone');
    if (!formData.email) step1Errors.push('email');
    if (!formData.profissao) step1Errors.push('profissao');

    setErrors(step1Errors);
    return step1Errors.length === 0; // Retorna true se não houver erros
  };

  // Função para validar os campos do step 2
  const validateStep2 = () => {
    const step2Errors: string[] = [];
    if (!formData.cep) step2Errors.push('cep');
    if (!formData.endereco) step2Errors.push('endereco');
    if (!formData.numero) step2Errors.push('numero');
    if (!formData.bairro) step2Errors.push('bairro');
    if (!formData.cidade) step2Errors.push('cidade');
    if (!formData.estado) step2Errors.push('estado');

    setErrors(step2Errors);
    return step2Errors.length === 0; // Retorna true se não houver erros
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valida os campos do step 2 antes de enviar
    if (validateStep2()) {
      try {
        // Envia os dados para o backend
        const response = await fetch('http://localhost:3001/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.nome,
            cpf: formData.cpf,
            phone: formData.telefone,
            email: formData.email,
            cep: formData.cep,
            address: formData.endereco,
            number: formData.numero,
            complement: formData.complemento,
            neighborhood: formData.bairro,
            city: formData.cidade,
            state: formData.estado,
          }),
        });

        const data = await response.json();

        // Verifica se a resposta do backend foi bem-sucedida (status 201)
        if (response.ok) {
          // Exibe toast de sucesso
          toast.success("Funcionário cadastrado com sucesso!", {
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

          // Adiciona um pequeno delay antes de fechar o modal
          setTimeout(() => {
            onClose(); // Fecha o modal após o toast
          }, 500); // Ajuste o tempo do delay conforme necessário (500ms é um valor comum)

          // Limpa os campos do formulário
          setFormData({
            nome: '',
            cpf: '',
            telefone: '',
            email: '',
            profissao: '',
            cep: '',
            endereco: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
          });
        } else {
          // Lida com erros retornados pelo backend
          throw new Error(data.error || 'Erro ao cadastrar o funcionário');
        }
      } catch (error: any) {
        // Exibe toast de erro em caso de falha
        toast.error("Erro ao cadastrar o funcionário: " + (error.message || "Ocorreu um erro no cadastro."), {
          style: {
            background: '#DC2626', // Cor do erro
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

      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50">
        <div className="bg-white w-full max-w-[70%] md:max-w-[700px] p-6 rounded-lg shadow-lg">
          <h1 className="mb-5 text-xl font-semibold">Adicionar Funcionário</h1>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Campos da etapa 1 */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Nome Completo <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('nome') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    CPF <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    maxLength={14}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cpf') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div>
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
                    maxLength={15} // Limite de caracteres para celular com DDD e traço
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-mail <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('email') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Profissão <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="profissao"
                    value={formData.profissao}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('profissao') ? 'border-red-600' : ''}`}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Médico">Médico</option>
                    <option value="Enfermeiro">Enfermeiro</option>
                    <option value="Atendente">Atendente</option>
                    <option value="Assistente">Assistente</option>
                  </select>
                </div>

                <div className="col-span-2 flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-[#F16063] text-white rounded-lg font-medium text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep1()) {
                        setStep(2); // Avança para a segunda etapa
                      }
                    }}
                    className="px-4 py-2 bg-azulAps text-white rounded-lg font-medium text-sm"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Campos da etapa 2 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    CEP <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    maxLength={8}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cep') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

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
                    readOnly // Torna o campo de endereço apenas leitura
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Número <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('numero') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Complemento</label>
                  <input
                    type="text"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Bairro <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('bairro') ? 'border-red-600' : ''}`}
                    required
                    readOnly
                  />
                </div>

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

                <div className="col-span-2 flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)} // Volta para a primeira etapa
                    className="px-4 py-2 bg-gray-200 text-black rounded-lg font-medium text-sm"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-[#F16063] text-white rounded-lg font-medium text-sm"
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
            )}
          </form>
        </div>
      </div>
    </>
  );
}
