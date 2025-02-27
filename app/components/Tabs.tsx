"use client";

import { useState } from "react";
import { tabsData } from "../data/tabsData"; // Імпортуємо масив табів
import { TiDelete } from "react-icons/ti";

const Tabs = () => {
  const [tabs, setTabs] = useState(tabsData);

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const handleTabClose = (id: number) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  return (
    <>
      <header className="flex items-center bg-white text-[14px] mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex items-center space-x-2 p-3 text-[14px] text-[#7F858D] cursor-pointer border-t-2 ${
              activeTab === tab.id
                ? "border-[#4690E2] text-black bg-[#F1F5F8]"
                : "border-transparent"
            }`}
          >
            {tab.icon}
            <span>{tab.title}</span>
            <TiDelete
              className={`${activeTab === tab.id ? "block" : "hidden"}`}
              color="red"
              size={16}
            />
          </div>
        ))}
      </header>
    </>
  );
};

export default Tabs;
