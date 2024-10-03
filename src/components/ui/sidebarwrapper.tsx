// components/ui/SidebarWrapper.tsx
'use client';

import { useState } from 'react';
import Sidebar from './sidebar';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex max-w-[1500px] h-screen bg-[#F7FAFC]">
      <Sidebar onToggle={setIsSidebarOpen} />
      <div className={`flex-grow p-6 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {children}
      </div>
    </div>
  );
}
