"use client";

import { useState, useRef } from "react";
import { tabsData } from "../data/tabsData";
import { TiDelete } from "react-icons/ti";
import { BsPinAngle } from "react-icons/bs";

const Tabs = () => {
  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const [pinnedTab, setPinnedTab] = useState<number | null>(null);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const handleTabClose = (id: number) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  const handleDragStart = (e: any, index: number) => {
    setDraggingIndex(index);
    dragItem.current = index;
  };

  const handleDragOver = (e: any, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    const draggedTabs = [...tabs];
    const draggedItemContent = draggedTabs[dragItem.current];
    draggedTabs.splice(dragItem.current, 1);
    draggedTabs.splice(dragOverItem.current, 0, draggedItemContent);
    setTabs(draggedTabs);

    dragItem.current = null;
    dragOverItem.current = null;
    setDraggingIndex(null);
  };

  const handlePinnedTab = (id: number) => {
    setPinnedTab(pinnedTab === id ? null : id);
  };

  return (
    <header className="flex items-center bg-white text-[14px] mt-4">
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`flex items-center space-x-2 p-3 text-[14px] text-[#7F858D] cursor-pointer border-t-2 ${
            activeTab === tab.id
              ? "border-[#4690E2] text-black bg-[#F1F5F8]"
              : "border-transparent"
          } ${draggingIndex === index ? "bg-[#7F858D] text-white" : ""} `}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={handleDrop}
          onContextMenu={(e) => {
            e.preventDefault();
            handlePinnedTab(tab.id);
          }}
        >
          {tab.icon}
          <span>{tab.title}</span>
          <TiDelete
            onClick={() => handleTabClose(tab.id)}
            className={`${activeTab === tab.id ? "block" : "hidden"}`}
            color="red"
            size={16}
          />
        </div>
      ))}
      {pinnedTab !== null && (
        <div className="flex items-center space-x-2 text-black bg-[#FFFFFF] text-[14px] rounded-lg px-[15px] py-[10px] cursor-pointer relative top-10">
          <BsPinAngle size={16} />
          <span>Pinned</span>
        </div>
      )}
    </header>
  );
};

export default Tabs;