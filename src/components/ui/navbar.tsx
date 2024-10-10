'use client'; // Esse arquivo precisa ser "client" porque utiliza hooks
import { useState } from 'react';
import Modal from '@/components/admin/modalAddFunc'; // O modal de adicionar funcionário
import ModalPatients from '@/components/patients/modalAddPatients'; // O modal de adicionar paciente
import ModalClinica from '@/components/admin/modalAddClin'; // O modal de adicionar clínica
import { ToastContainer } from 'react-toastify'; // Importa o ToastContainer para notificações
import 'react-toastify/dist/ReactToastify.css'; // Importa os estilos do Toastify

// Tipos de botões possíveis
type ButtonType = 'download' | 'addFuncionario' | 'addClinica' | 'addPaciente';

// Tipos de download possíveis (ajustável conforme a tela)
type DownloadOption = 'patients' | 'employees' | 'clinics';

// Definição dos botões e ícones
type ButtonProps = {
  type: ButtonType;
  label: string;
  iconClass: string;
};

// Definição das props do Navbar
type NavbarProps = {
  h1: string;
  buttons?: ButtonProps[];
  downloadOptions?: DownloadOption[]; // As opções de download que serão passadas dinamicamente
};

export default function Navbar({ h1, buttons, downloadOptions = [] }: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal de funcionário
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false); // Estado para controlar o modal de paciente
  const [isClinicaModalOpen, setIsClinicaModalOpen] = useState(false); // Estado para controlar o modal de clínica
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false); // Estado para o menu suspenso de download

  // Função para alternar o menu de download
  const toggleDownloadMenu = () => {
    setIsDownloadMenuOpen((prev) => !prev);
  };

  // Função para download de CSV
  const handleDownloadCSV = (type: DownloadOption) => {
    const endpointMap: { [key in DownloadOption]: string } = {
      patients: 'https://back-apsplus-production.up.railway.app/download/patients',
      employees: 'https://back-apsplus-production.up.railway.app/download/employees',
      clinics: 'https://back-apsplus-production.up.railway.app/download/clinics',
    };

    const endpoint = endpointMap[type];

    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          return response.blob(); // Pega o arquivo CSV como Blob
        }
        throw new Error('Erro ao baixar o arquivo');
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}.csv`; // Define o nome do arquivo
        a.click(); // Clica no link para baixar o arquivo
      })
      .catch((error) => {
        console.error('Erro ao baixar o arquivo:', error);
      });
  };

  // Função para lidar com ações de botões
  const handleButtonClick = (type: ButtonType) => {
    switch (type) {
      case 'download':
        toggleDownloadMenu(); // Exibe ou esconde o menu suspenso
        break;
      case 'addFuncionario':
        setIsModalOpen(true); // Abre o modal de funcionário
        break;
      case 'addClinica':
        setIsClinicaModalOpen(true); // Abre o modal de clínica
        break;
      case 'addPaciente':
        setIsPatientModalOpen(true); // Abre o modal de paciente
        break;
      default:
        break;
    }
  };

  // Função para fechar o modal de funcionário
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Função para fechar o modal de paciente
  const handleClosePatientModal = () => {
    setIsPatientModalOpen(false);
  };

  // Função para fechar o modal de clínica
  const handleCloseClinicaModal = () => {
    setIsClinicaModalOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-white py-6 px-6 rounded-md shadow-sm relative">
        <h1 className="text-lg font-semibold select-text">{h1}</h1>
        <div className="relative flex space-x-4">
          {buttons?.map((button, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => handleButtonClick(button.type)}
                className={`${
                  button.type === 'download'
                    ? 'border border-gray-300 text-gray-900 text-xs px-5 py-2 rounded-lg font-medium flex items-center gap-x-2'
                    : 'bg-azulAps text-white text-xs px-3 py-2 rounded-lg font-medium flex items-center gap-x-2'
                }`}
              >
                <i className={button.iconClass}></i> {button.label}
              </button>

              {/* Menu suspenso de download */}
              {button.type === 'download' && isDownloadMenuOpen && (
                <div className="absolute top-full mt-1 left-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul>
                    {downloadOptions.map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleDownloadCSV(option)}
                      >
                        {option === 'patients' && 'Pacientes'}
                        {option === 'employees' && 'Funcionários'}
                        {option === 'clinics' && 'Clínicas'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Renderiza o Modal de Adicionar Funcionário */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal} // Fecha o modal de funcionário
        />
      )}

      {/* Renderiza o Modal de Adicionar Paciente */}
      {isPatientModalOpen && (
        <ModalPatients
          isOpen={isPatientModalOpen}
          onClose={handleClosePatientModal} // Fecha o modal de paciente
        />
      )}

      {/* Renderiza o Modal de Adicionar Clínica */}
      {isClinicaModalOpen && (
        <ModalClinica
          isOpen={isClinicaModalOpen}
          onClose={handleCloseClinicaModal} // Fecha o modal de clínica
        />
      )}

      {/* Renderiza o ToastContainer para notificações */}
      <ToastContainer />
    </>
  );
}
