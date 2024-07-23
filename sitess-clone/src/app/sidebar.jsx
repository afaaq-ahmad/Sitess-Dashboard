"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, User } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <h3 className="sidebarTitle">Overview</h3>
      <div className="sidebarOptionContainer">
        <div
          className={`sidebarOption ${
            pathname === "/dashboard" ? "activeOption" : ""
          }`}
        >
          <LayoutDashboard size={16} color="#fafafa" />
          <Link href={"/dashboard"}>Dashboard</Link>
        </div>
        <div
          className={`sidebarOption ${
            pathname === "/dashboard/hits" ? "activeOption" : ""
          }`}
        >
          <User size={16} color="#fafafa" />
          <Link href={"/dashboard/hits"}>
            <div className="hitsContainer">
              <div>Hits</div>
              <div className="hitsCount">0</div>
            </div>
          </Link>
        </div>
        <div
          className={`sidebarOption ${
            pathname === "/dashboard/settings" ? "activeOption" : ""
          }`}
        >
          <Settings size={16} color="#fafafa" />
          <Link href={"/dashboard/settings"}>Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
