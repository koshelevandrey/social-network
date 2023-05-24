import React, { type ReactNode } from "react";
import Link from "next/link";
import styles from "../styles/SideBarLink.module.css";

interface SideBarItemProps {
  href: string;
  children: ReactNode;
  isActive: boolean;
}

export const SideBarLink = ({ href, children, isActive }: SideBarItemProps) => {
  return (
    <Link
      href={href}
      className={isActive ? styles.navbarItemActive : styles.navbarItemInActive}
    >
      {children}
    </Link>
  );
};
