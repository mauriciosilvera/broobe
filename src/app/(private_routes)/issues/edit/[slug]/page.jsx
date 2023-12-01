"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/utils/auth";
import styles from "./page.module.css";
import { getIssue, getPriorities, patchIssue } from "@/utils/requests";

export default function Page({ params: { slug } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    async function getData() {
      const issues = await getIssue(slug);
      setData(issues);
      const priorities = await getPriorities();
      setPriorities(priorities);
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

      const response = await patchIssue(payload);

      if (!response.ok) {
        throw new Error(
          "Hubo un error al editar el issue, por favor pruebe nuevamente."
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
          className={styles.input}
          defaultValue={data?.description}
        />
        <label htmlFor="priority_id" className={styles.label}>
          Prioridad
        </label>
        <select
          name="priority_id"
          className={styles.input}
          defaultValue={data?.priority_id}
        >
          {priorities?.map((prioritie) => (
            <option key={prioritie.id} value={prioritie.id}>
              {prioritie.type}
            </option>
          ))}
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
