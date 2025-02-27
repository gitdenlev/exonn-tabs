import { RxDashboard } from "react-icons/rx";
import { BsBank } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { IoStorefrontOutline } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GoBook } from "react-icons/go";
import { IoCubeOutline } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { BsCartCheck } from "react-icons/bs";
import { GrCalculator } from "react-icons/gr";
import { FaWarehouse } from "react-icons/fa6";

export const tabsData = [
  {
    id: 1,
    title: "Dashboard",
    icon: <RxDashboard size={16} />,
    url: "/dashboard",
  },
  {
    id: 2,
    title: "Banking",
    icon: <BsBank size={16} />,
    url: "/banking",
  },
  {
    id: 3,
    title: "Telefonie",
    icon: <FiPhoneCall size={16} />,
    url: "/telefonie",
  },
  {
    id: 4,
    title: "Accounting",
    icon: <VscAccount size={16} />,
    url: "/accounting",
  },
  {
    id: 5,
    title: "Verkauf",
    icon: <IoStorefrontOutline size={16} />,
    url: "/verkauf",
  },
  {
    id: 6,
    title: "Statistik",
    icon: <FaChartPie size={16} />,
    url: "/statistik",
  },
  {
    id: 7,
    title: "Post Office",
    icon: <IoMailOutline size={16} />,
    url: "/post-office",
  },
  {
    id: 8,
    title: "Administration",
    icon: <IoSettingsOutline size={16} />,
    url: "/administration",
  },
  {
    id: 9,
    title: "Help",
    icon: <GoBook size={16} />,
    url: "/help",
  },
  {
    id: 10,
    title: "Warenbestand",
    icon: <IoCubeOutline size={16} />,
    url: "/warenbestand",
  },
  {
    id: 11,
    title: "Auswahllisten",
    icon: <TfiMenuAlt size={16} />,
    url: "/auswahllisten",
  },
  {
    id: 12,
    title: "Einkauf",
    icon: <BsCartCheck size={16} />,
    url: "/einkauf",
  },
  {
    id: 13,
    title: "Rechn",
    icon: <GrCalculator size={16} />,
    url: "/rechn",
  },
  {
    id: 14,
    title: "Lagerverwaltung",
    icon: <FaWarehouse size={16} />,
    url: "/lagerverwaltung",
  },
];
