import React from "react";
import Logout from "../Logout";
import Link from "next/link";
import styles from "./page.module.css";
import broobeLogo from "../../../public/logo-broobe.svg";
import Image from "next/image";

export async function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image src={broobeLogo} alt="logo" />
      </Link>
      <div>
        <Logout />
      </div>
    </nav>
  );
}
