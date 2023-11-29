"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // const formData = new FormData(event.currentTarget);
      const response = await fetch(
        "https://challenge.broobe.net/api/v1/login",
        {
          method: "POST",
          body: {
            email: "person@domain.com.",
            password: "string",
          },
        }
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      // console.log(formData);
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      const data = await response.json();
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
        <label htmlFor="user">Usuario</label>
        <input type="text" name="user" className={styles.input} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className={styles.input} />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" className={styles.input} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Registrarme"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </section>
  );
}
