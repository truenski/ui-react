// components/SidebarItem.js
import React from "react";
import Link from "next/link";

export default function SidebarItem({ menuItem }) {
  const computedClass = ""; // Adicione a lógica para calcular a classe aqui

  return (
    <li className={computedClass}>
      <Link href={menuItem.toState}>
        <a className="sub-menu-title" title={menuItem.toolTip}>
          <div className="wrap">
            <i className={menuItem.icon} />
            {menuItem.label}
          </div>
          {menuItem.hasSubMenu && (
            <span className="child-icon ion-android-add-circle" />
          )}
        </a>
      </Link>
      {menuItem.hasSubMenu && (
        <ul className="nested vertical menu">
          {menuItem.children.map((child) => (
            <li key={child.id}>
              <Link href={child.toState}>
                <a className="computedChildClass">
                  <div className="wrap">
                    {child.icon && <i className="inbox-icon" />}
                    {child.color && (
                      <span
                        className="label-color--display"
                        style={{ backgroundColor: child.color }}
                      />
                    )}
                    <div title={child.label} className="computedChildClass">
                      {child.label}
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
