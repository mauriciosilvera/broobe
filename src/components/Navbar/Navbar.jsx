"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./page.module.css";
import broobeLogo from "../../../public/logo-broobe.svg";
import Image from "next/image";

export function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image src={broobeLogo} alt="logo" />
      </Link>
      {session?.user ? (
        <>
          <button onClick={() => signOut()} className="btn btn-danger btn-sm">
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
