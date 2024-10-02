// components/Sidebar.js
import React from "react";
import SidebarItem from "./SidebarItem";
import Link from "next/link";

export default function Sidebar() {
  const accessibleMenuItems = []; // Adicione a lógica para obter os itens do menu aqui

  return (
    <aside className="sidebar animated shrink columns">
      <div className="logo">
        <Link href="/dashboard">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="main-nav">
        <ul className="menu vertical">
          {accessibleMenuItems.map((item) => (
            <SidebarItem key={item.toState} menuItem={item} />
          ))}
        </ul>
      </div>
      <div className="bottom-nav">
        {/* Adicione os componentes de navegação inferior aqui */}
      </div>
    </aside>
  );
}
