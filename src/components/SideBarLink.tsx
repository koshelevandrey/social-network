import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/SideBarLink.module.css";
import { useRouter } from "next/router";

interface SideBarItemProps {
  href: string;
  label: string;
}

export const SideBarLink = ({ href, label }: SideBarItemProps) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <li
      className={isActive ? styles.navbarItemActive : styles.navbarItemInActive}
    >
      <Link href={href}>{label}</Link>
    </li>
  );
};
