"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { auth } from "@/utils/auth";
import { signIn } from "next-auth/react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    // const payload = Object.fromEntries(formData);

    // const response = await fetch("https://challenge.broobe.net/api/v1/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log(response);
    // const parsedResponse = await response.json();

    // if (parsedResponse.message) {
    //   setError("Usuario o contraseña incorrectos.");
    //   setIsLoading(false);
    //   return;
    // }

    // auth.signin(parsedResponse.token);
    setIsLoading(false);
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
        <button onClick={() => signIn()}>Signin</button>
        <p>¿No tenes cuenta? Registrate acá.</p>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </section>
  );
}
