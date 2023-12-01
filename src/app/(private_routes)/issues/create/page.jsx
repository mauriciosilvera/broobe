"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getPriorities, postIssue } from "@/utils/requests";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priorities, setPriorities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const priorities = await getPriorities();
      setPriorities(priorities);
    }
    getData();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData);

    const response = await postIssue(payload);

    if (response) {
      router.push("/issues");
    }
  }

  return (
    <section className={styles.formContainer}>
      <h1 className={styles.title}>Nuevo issue</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Nombre
        </label>
        <input type="text" name="name" className={styles.field} />
        <label htmlFor="description" className={styles.label}>
          Descripcion
        </label>
        <input type="text" name="description" className={styles.field} />
        <label htmlFor="priority_id" className={styles.label}>
          Prioridad
        </label>
        <select name="priority_id" className={styles.field} defaultValue={1}>
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
          {isLoading ? "Cargando..." : "Registrar issue"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </section>
  );
}
