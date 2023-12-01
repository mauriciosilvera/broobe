"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { auth } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setIsLoading(false);
    if (response?.error) {
      setError(response.error);
      return;
    }

    router.push("/issues");
  }

  return (
    <section className={styles.login}>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className={styles.input} />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" className={styles.input} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Submit"}
        </button>
        <p>¿No tenes cuenta? Registrate acá.</p>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </section>
  );
}
