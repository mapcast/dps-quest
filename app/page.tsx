'use client'
import Dashboard from "@/components/Dashboard";
import QuestList from "@/components/QuestList";
import SideNav from "@/components/SideNav";
import { useState } from "react";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  return (
    <main className="p-4">
      <SideNav setSelectedMenu={setSelectedMenu}/>
      {selectedMenu === 'dashboard' ? <Dashboard/> :
      selectedMenu === 'quest' ? <QuestList/> : <></>}
    </main>
  );
}
