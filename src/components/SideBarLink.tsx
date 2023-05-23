import React from "react";
import Link from "next/link";
import styles from "../styles/SideBarLink.module.css";

interface SideBarItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

export const SideBarLink = ({ href, label, isActive }: SideBarItemProps) => {
  return (
    <Link
      href={href}
      className={isActive ? styles.navbarItemActive : styles.navbarItemInActive}
    >
      {label}
    </Link>
  );
};
