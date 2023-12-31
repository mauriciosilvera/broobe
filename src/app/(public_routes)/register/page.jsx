"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { registerUser } from "@/utils/requests";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData);

      const response = await registerUser(payload);

      if (!response.ok) {
        throw new Error(
          "Hubo un error al registrar al usuario, por favor intente nuevamente."
        );
      }
      router.push("/login");
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.register}>
      <h1 className={styles.title}>Registrarse</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="name">Usuario</label>
        <input type="text" name="name" className={styles.input} required />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className={styles.input} required />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          className={styles.input}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={styles.confirmButton}
        >
          {isLoading ? "Cargando..." : "Registrarme"}
        </button>
      </form>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </section>
  );
}
