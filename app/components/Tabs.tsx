"use client";

import { useState, useRef, useEffect, JSX } from "react";
import { tabsData } from "../data/tabsData";
import { TiDelete } from "react-icons/ti";
import { BsPinAngle } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";

interface Tab {
  id: number;
  title: string;
  url: string;
  icon: JSX.Element;
}

const Tabs = () => {
  const [tabs, setTabs] = useState<Tab[]>(tabsData);
  const [activeTab, setActiveTab] = useState<number | null>(
    tabs[0]?.id || null
  );
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [pinnedTabs, setPinnedTabs] = useState<number[]>([]);
  const [showPinTooltip, setShowPinTooltip] = useState<number | null>(null);
  const [showUnpinTooltip, setShowUnpinTooltip] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedTabs = localStorage.getItem("tabs");
    const savedPinnedTabs = localStorage.getItem("pinnedTabs");

    if (savedTabs) {
      const parsedTabs = JSON.parse(savedTabs);
      const restoredTabs = parsedTabs.map((savedTab: Tab) => ({
        ...savedTab,
        icon: tabsData.find((t) => t.id === savedTab.id)?.icon || <></>,
      }));
      setTabs(restoredTabs);
    }

    if (savedPinnedTabs) {
      setPinnedTabs(JSON.parse(savedPinnedTabs));
    }
  }, []);

  useEffect(() => {
    const tabsToSave = tabs.map(({ id, title, url }) => ({ id, title, url }));
    localStorage.setItem("tabs", JSON.stringify(tabsToSave));
    localStorage.setItem("pinnedTabs", JSON.stringify(pinnedTabs));
  }, [tabs, pinnedTabs]);

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.url === pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [pathname, tabs]);

  const handleTabClick = (id: number, url: string) => {
    setActiveTab(id);
    setShowPinTooltip(null);
    if (pinnedTabs.includes(id)) {
      setShowUnpinTooltip((prev) => (prev === id ? null : id));
    } else {
      setShowUnpinTooltip(null);
    }
    router.replace(`/?tab=${url}`);
  };

  const handleTabClose = (id: number) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);
    setPinnedTabs(pinnedTabs.filter((pinnedId) => pinnedId !== id));

    if (activeTab === id) {
      const newActiveTab = updatedTabs.length > 0 ? updatedTabs[0].id : null;
      setActiveTab(newActiveTab);

      if (newActiveTab) {
        const newTab = updatedTabs.find((tab) => tab.id === newActiveTab);
        newTab ? router.push(`/?tab=${newTab.url}`) : router.push("/");
      } else {
        router.push("/");
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggingIndex(index);
    dragItem.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const reorderedTabs = [...tabs];
      const [draggedItem] = reorderedTabs.splice(dragItem.current, 1);
      reorderedTabs.splice(dragOverItem.current, 0, draggedItem);
      setTabs(reorderedTabs);
    }

    dragItem.current = null;
    dragOverItem.current = null;
    setDraggingIndex(null);
  };

  const handleContextMenu = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setShowPinTooltip(id);
  };

  const handlePinTabToggle = (id: number) => {
    setPinnedTabs((prev) =>
      prev.includes(id)
        ? prev.filter((pinnedId) => pinnedId !== id)
        : [...prev, id]
    );
    setShowPinTooltip(null);
    setShowUnpinTooltip(null);
  };

  const pinnedTabsData = tabs.filter((tab) => pinnedTabs.includes(tab.id));
  const unpinnedTabsData = tabs.filter((tab) => !pinnedTabs.includes(tab.id));

  return (
    <div className="mt-4">
      <header className="flex bg-white text-[14px] relative">
        <div className="flex">
          {pinnedTabsData.map((tab) => (
            <div key={tab.id} className="relative">
              <div
                onClick={() => handleTabClick(tab.id, tab.url)}
                className={`flex items-center justify-center cursor-pointer px-4 py-3 border-t-2 ${
                  activeTab === tab.id
                    ? "border-[#7F858D] text-black bg-[#F1F5F8]"
                    : "border-[#7F858D] text-black"
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, tabs.indexOf(tab))}
                onDragOver={(e) => handleDragOver(e, tabs.indexOf(tab))}
                onDrop={handleDrop}
                onContextMenu={(e) => handleContextMenu(e, tab.id)}
              >
                {tab.icon}
              </div>

              {showUnpinTooltip === tab.id && (
                <div
                  className="absolute top-full left-0 mt-2 flex items-center space-x-2 text-[#7F858D] bg-white text-[14px] rounded-lg px-[15px] py-[10px] shadow-md z-10 cursor-pointer"
                  onClick={() => {
                    handlePinTabToggle(tab.id);
                    setShowUnpinTooltip(null);
                  }}
                >
                  <BsPinAngle size={16} />
                  <span className="truncate">Unpin Tab</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {unpinnedTabsData.map((tab, index) => (
          <div key={tab.id} className="relative">
            <div
              onClick={() => handleTabClick(tab.id, tab.url)}
              className={`flex items-center space-x-2 p-[10px] text-[14px] text-[#7F858D] cursor-pointer border-t-2 ${
                activeTab === tab.id
                  ? "border-[#4690E2] text-black bg-[#F1F5F8]"
                  : "border-transparent"
              } ${draggingIndex === index ? "bg-[#7F858D] text-black" : ""}`}
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
                className="absolute top-12 left-8 flex items-center space-x-2 text-[#7F858D] bg-white text-[14px] rounded-lg px-[15px] py-[10px] max-w-[300px] w-auto shadow-md z-10 cursor-pointer"
                onClick={() => handlePinTabToggle(tab.id)}
              >
                <BsPinAngle size={16} />
                <span className="truncate">Pin Tab</span>
              </div>
            )}
          </div>
        ))}
      </header>
    </div>
  );
};

export default Tabs;
