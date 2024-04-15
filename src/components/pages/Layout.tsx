import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Outlet } from "react-router-dom";
import "./Layout.tsx.css";
export default function Layout() {
  const [visible, setVisible] = useState(false);

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
    {
      label: "Features",
      icon: "pi pi-star",
    },
    {
      label: "Projects",
      icon: "pi pi-search",
      items: [
        {
          label: "Components",
          icon: "pi pi-bolt",
        },
        {
          label: "Blocks",
          icon: "pi pi-server",
        },
        {
          label: "UI Kit",
          icon: "pi pi-pencil",
        },
        {
          label: "Templates",
          icon: "pi pi-palette",
          items: [
            {
              label: "Apollo",
              icon: "pi pi-palette",
            },
            {
              label: "Ultima",
              icon: "pi pi-palette",
            },
          ],
        },
      ],
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
    },
  ];

  return (
    <div className="layout-container">
      <Button
        className="sidebar-toggler p-2 m-3 mx-5"
        icon="pi pi-align-justify"
        style={{ background: "#0891b2", borderRadius: "10px", color: "white" }}
        onClick={() => setVisible(true)}
      />
      <Menubar model={items} className="menubar" />
      <div className="outlet-container">
        <Outlet />
      </div>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="custom-sidebar"
      >
        <div>
          {items.map((item) => (
            <li>
              <a href="/">{item.label}</a>
            </li>
          ))}
        </div>
      </Sidebar>
    </div>
  );
}
