'use client';
import { useEffect, useState } from 'react';
import { useSidebar } from "@/components/ui/sidebarcontext"; // Importar o hook para obter o estado do sidebar

interface CardProps {
  title: string;
  number: string | number;
  percentage: string;
  percentageColor: string;
  icon: string;
  iconColor: string;
  description: string;
  bgColor: number;
}

const Card = ({ title, number, percentage, percentageColor, icon, iconColor, description, bgColor }: CardProps) => {
  const { isOpen } = useSidebar(); // Obter o estado do sidebar
  const bgClass = bgColor === 1 ? "bg-[#deffed]" : "bg-[#ffe6e4]";
  const cardWidth = isOpen ? "w-[240px]" : "w-[255px]"; // Altera a largura com base no estado do sidebar

  return (
    <div className={`${cardWidth} h-32 flex flex-col px-2 py-3 justify-center bg-white rounded-2xl shadow`}>
      <div className="flex justify-between items-center w-full px-4 mt-1">
        <h3 className="text-xs mr-5 font-semibold text-[#7a7a9d]">{title}</h3>
      </div>
      <div className="flex pr-6">
        <h2 className="text-3xl font-semibold text-left w-full px-4 mt-1">{number}</h2>
        <div className={`rounded-full h-11 w-14 -mt-5 ${iconColor} flex items-center justify-center`}>
          <i className={`bi ${icon} text-white text-xl`}></i>
        </div>
      </div>
      <div className="flex gap-3 justify-start items-center px-4 mt-2">
        <div className={`${bgClass} px-2 py-1 rounded-md`}>
          <span className={`text-xs font-semibold ${percentageColor}`}>{percentage}</span>
        </div>
        <p className="text-xs text-[#7a7a9d]">{description}</p>
      </div>
    </div>
  );
};

export default function GestaoCards() {
  const { isOpen } = useSidebar(); // Obter o estado do sidebar
  const [totalPacientes, setTotalPacientes] = useState<number | string>('...'); // Estado para armazenar o número de pacientes
  const gapClass = isOpen ? "gap-6" : "gap-4"; // Define o espaçamento condicional

  // useEffect para buscar o número de pacientes quando o componente é montado
  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const response = await fetch('https://back-apsplus-production.up.railway.app/patients'); // Sua rota para buscar os pacientes
        const data = await response.json();
        setTotalPacientes(data.length); // Atualiza o estado com o número de pacientes
      } catch (error) {
        console.error('Erro ao buscar número de pacientes:', error);
        setTotalPacientes('Erro');
      }
    };

    fetchPatientCount();
  }, []); // Executa apenas uma vez após o componente ser montado

  return (
    <div className={`${gapClass} grid grid-cols-4 mt-6 mx-5`}>
      <Card
        title="Retenção de Pacientes"
        number="175%"
        percentage="+13%"
        percentageColor="text-[#66cb9f]"
        icon="bi-arrow-repeat"
        iconColor="bg-[#FF92AE]"
        description="desde o mês passado"
        bgColor={1}
      />
      <Card
        title="Procedimentos"
        number="567"
        percentage="+30%"
        percentageColor="text-green-500"
        icon="bi-people"
        iconColor="bg-blue-500"
        description="desde o mês passado"
        bgColor={1}
      />
      <Card
        title="Pacientes Ativos"
        number={totalPacientes} // Exibe o número real de pacientes
        percentage="+10%"
        percentageColor="text-green-500"
        icon="bi-people-fill"
        iconColor="bg-[#68DBF2]"
        description="desde o mês passado"
        bgColor={1}
      />
      <Card
        title="Turnover de Funcio."
        number="10%"
        percentage="-4%"
        percentageColor="text-red-500"
        icon="bi-person-check"
        iconColor="bg-orange-500"
        description="desde o mês passado"
        bgColor={2}
      />
    </div>
  );
}
