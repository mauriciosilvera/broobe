"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/utils/auth";
import styles from "./page.module.css";

export default function Page({ params: { slug } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `https://challenge.broobe.net/api/v1/issues/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.getToken(),
          },
        }
      );

      const issues = await response.json();
      setData(issues);
    }

    getData();
  }, [slug]);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData);

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

      if (!response.ok) {
        throw new Error(
          "Hubo un error al registrar al usuario, por favor pruebe nuevamente."
        );
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.formContainer}>
      <h1 className={styles.title}>Editar issue</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Nombre
        </label>
        <input
          type="text"
          name="name"
          className={styles.input}
          defaultValue={data?.name}
        />
        <label htmlFor="description" className={styles.label}>
          Descripcion
        </label>
        <input
          type="text"
          name="description"
          className={styles.field}
          defaultValue={data?.description}
        />
        <label htmlFor="priority_id" className={styles.label}>
          Prioridad
        </label>
        <select
          name="priority_id"
          className={styles.field}
          defaultValue={data?.priority_id}
        >
          <option value={1}>1</option>
          <option value={2} selected>
            2
          </option>
          <option value={3}>3</option>
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className={styles.confirmButton}
        >
          {isLoading ? "Cargando..." : "Actualizar issue"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </section>
  );
}
