"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./page.module.css";
import broobeLogo from "../../../public/logo-broobe.svg";
import Image from "next/image";
import { auth } from "@/utils/auth";

const handleSignOut = () => {
  signOut();
  auth.signout();
};

export function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image src={broobeLogo} alt="logo" />
      </Link>
      {session?.user ? (
        <button onClick={handleSignOut} className={styles.signOut}>
          Cerrar sesión
        </button>
      ) : (
        <div className={styles.linksContainer}>
          <Link href="/register" className={styles.link}>
            Registrarse
          </Link>
          <Link href="/login" className={styles.link}>
            Ingresar
          </Link>
        </div>
      )}
    </nav>
  );
}
