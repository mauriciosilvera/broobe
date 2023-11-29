"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData);

      console.log(JSON.stringify(payload));

      const response = await fetch(
        "https://challenge.broobe.net/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setMessage('Usuario registrado correctamente.');
      } else {
        throw new Error("Hubo un error al registrar al usuario, por favor pruebe nuevamente.");
      }


    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.login}>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="name">Usuario</label>
        <input type="text" name="name" className={styles.input} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className={styles.input} />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" className={styles.input} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Registrarme"}
        </button>
      </form>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </section>
  );
}
