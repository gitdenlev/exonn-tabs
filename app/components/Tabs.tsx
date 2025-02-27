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
  const [pinnedTabs, setPinnedTabs] = useState<number[]>([]);
  const [showPinTooltip, setShowPinTooltip] = useState<number | null>(null);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
    setShowPinTooltip(null);
  };

  const handleTabClose = (id: number) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
    setPinnedTabs(pinnedTabs.filter((pinnedId) => pinnedId !== id));
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

  const handleContextMenu = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setShowPinTooltip(id);
  };

  const handlePinTabToggle = (id: number) => {
    if (pinnedTabs.includes(id)) {
      setPinnedTabs(pinnedTabs.filter((pinnedId) => pinnedId !== id));
    } else {
      setPinnedTabs([...pinnedTabs, id]);
    }
    setShowPinTooltip(null);
  };

  const pinnedTabsData = tabs.filter((tab) => pinnedTabs.includes(tab.id));
  const unpinnedTabsData = tabs.filter((tab) => !pinnedTabs.includes(tab.id));

  return (
    <div className="mt-4">
      <header className="flex bg-white text-[14px] relative">
        <div className="flex">
          {pinnedTabsData.map((tab) => (
            <div
              key={`pinned-${tab.id}`}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center justify-center cursor-pointer px-4 py-3 border-t-2 ${
                activeTab === tab.id
                  ? "border-[#7F858D] text-black bg-[#F1F5F8]"
                  : "border-[#7F858D]"
              }`}
              draggable
              onDragStart={(e) =>
                handleDragStart(e, pinnedTabsData.indexOf(tab))
              }
              onDragOver={(e) => handleDragOver(e, pinnedTabsData.indexOf(tab))}
              onDrop={handleDrop}
              onContextMenu={(e) => handleContextMenu(e, tab.id)}
            >
              {tab.icon}
            </div>
          ))}
        </div>

        {unpinnedTabsData.map((tab, index) => (
          <div key={tab.id} className="relative">
            <div
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center space-x-2 p-[10px] text-[14px] text-[#7F858D] cursor-pointer border-t-2 ${
                activeTab === tab.id
                  ? "border-[#4690E2] text-black bg-[#F1F5F8]"
                  : "border-transparent"
              } ${draggingIndex === index ? "bg-[#7F858D] text-white" : ""} `}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={handleDrop}
              onContextMenu={(e) => handleContextMenu(e, tab.id)}
            >
              {tab.icon}
              <span>{tab.title}</span>
              <TiDelete
                onClick={(e) => {
                  e.stopPropagation();
                  handleTabClose(tab.id);
                }}
                className={`${activeTab === tab.id ? "block" : "hidden"} ml-1`}
                color="red"
                size={16}
              />
            </div>

            {showPinTooltip === tab.id && (
              <div
                className="absolute top-12 left-8 flex items-center space-x-2 text-[#7F858D] bg-[#FFFFFF] text-[14px] rounded-lg px-[15px] py-[10px] max-w-[300px] w-auto shadow-md z-10 cursor-pointer"
                onClick={() => handlePinTabToggle(tab.id)}
              >
                <BsPinAngle size={16} />
                <span className="truncate">Tab anpinnen</span>
              </div>
            )}
          </div>
        ))}
      </header>
    </div>
  );
};

export default Tabs;