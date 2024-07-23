"use client";
import { Menu, LayoutDashboard, User, Settings } from "lucide-react";
import Styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "../modal/modal";
const Navbar = () => {
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState("top");
  const [profilecontainerVisibility, setProfileContainerVisibility] =
    useState(false);

  const openModal = (position) => {
    setModalPosition(position);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const profileInfo = () => {
    return (
      <div className={Styles.profileInfoContainer}>
        <div className={Styles.profileInfoItem}>
          <div>Anonymous</div>
          <div>anonymous@gmail.com</div>
        </div>
        <hr style={{ width: "90%", borderTop: "#27272a" }} />
        <div
          className={Styles.profileInfoItem}
          style={{ color: "#fafafa", fontSize: "14px" }}
        >
          Logout
        </div>
      </div>
    );
  };
  console.log("visibility: ", profilecontainerVisibility);
  return (
    <div className={Styles.navbarContainer}>
      <div className={Styles.navbarLogo}>
        <Image
          src="/assets/icon-dark.png"
          alt="logo"
          width={200}
          height={130}
          priority
        />
      </div>
      <div className={Styles.iconsContainer}>
        <Menu
          size={24}
          color="#a1a1aa"
          className={Styles.menuIcon}
          onClick={() => {
            openModal("top");
          }}
        />
        <div
          className={Styles.roundImageContainer}
          onClick={() => {
            setProfileContainerVisibility(!profilecontainerVisibility);
          }}
        >
          <Image
            src={"/assets/profile-picture.jpeg"}
            alt="profile-image"
            width={32}
            height={32}
            priority
          />
        </div>
        {profilecontainerVisibility && profileInfo()}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} position={modalPosition}>
        <div className={Styles.navbarMenuOptionContainer}>
          <div
            className={`${Styles.navbarMenuOption} ${
              pathname === "/dashboard" ? Styles.activeOption : {}
            }`}
            onClick={() => {
              closeModal();
            }}
          >
            <LayoutDashboard size={16} color="#fafafa" />
            <Link href={"/dashboard"}>Dashboard</Link>
          </div>
          <div
            className={`${Styles.navbarMenuOption} ${
              pathname === "/dashboard/hits" ? Styles.activeOption : ""
            }`}
            onClick={() => {
              closeModal();
            }}
          >
            <User size={16} color="#fafafa" />
            <Link href={"/dashboard/hits"}>
              <div className={Styles.hitsContainer}>
                <div>Hits</div>
                <div className={Styles.hitsCount}>0</div>
              </div>
            </Link>
          </div>
          <div
            className={`${Styles.navbarMenuOption} ${
              pathname === "/dashboard/settings" ? Styles.activeOption : ""
            }`}
            onClick={() => {
              closeModal();
            }}
          >
            <Settings size={16} color="#fafafa" />
            <Link href={"/dashboard/settings"}>Settings</Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
