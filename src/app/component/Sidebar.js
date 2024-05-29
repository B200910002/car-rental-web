// components/Sidebar.js
import Image from "next/image";
import { AiFillAccountBook, AiOutlineHome } from "react-icons/ai";
import { BsClockHistory, BsNewspaper, BsCash, BsFillCarFrontFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { useRouter } from "next/router";

const sidebarItems = [
  {
    name: "Хянах  самбар",
    href: "/dashboard",
    icon: AiOutlineHome,
    onClick: (router) => router.push("/dashboard"),
  },
  {
    name: "Миний машинууд",
    href: "/my-vehicles",
    icon: BsFillCarFrontFill,
    onClick: (router) => router.push("/my-vehicle"),
  },
  {
    name: "Түрээсийн гэрээ",
    href: "/contracts",
    icon: BsNewspaper,
    onClick: (router) => router.push("/contract"),
  },
  {
    name: "Түүх",
    href: "/history",
    icon: BsClockHistory,
    onClick: (router) => router.push("/history"),
  },
  {
    name: "Хувийн мэдээлэл",
    href: "/profile",
    icon: CgProfile,
    onClick: (router) => router.push("/profile"),
  },
];

const Sidebar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="sidebar__wrapper">
      <button className="btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar__top">
          <Image
            width={80}
            height={80}
            className="sidebar__logo"
            src="/logo.jpg"
            alt="logo"
          />
          <p className="sidebar__logo-name">Billing System</p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon, onClick }) => (
            <li className="sidebar__item" key={name}>
              <Link
                className={`sidebar__link ${
                  router.pathname === href ? "sidebar__link--active" : ""
                }`}
                href={href}
                onClick={() => onClick(router)}
              >
                <span className="sidebar__icon">
                  <Icon />
                </span>
                <span className="sidebar__name">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
