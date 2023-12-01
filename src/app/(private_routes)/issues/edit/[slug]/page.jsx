"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { getIssue, getPriorities, patchIssue } from "@/utils/requests";
import { useRouter } from "next/navigation";

export default function Page({ params: { slug } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [prioritiesData, setPrioritiesData] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState();
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const issue = await getIssue(slug);
      setData(issue);
      setSelectedPriority(issue.priority_id);
      const prioritiesData = await getPriorities();
      setPrioritiesData(prioritiesData);
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

      const response = await patchIssue(payload, slug);

      if (!response.ok) {
        throw new Error(
          "Hubo un error al editar el issue, por favor pruebe nuevamente."
        );
      }

      router.push("/issues");
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
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          {prioritiesData?.map((prioritie) => (
            <option key={prioritie.type} value={prioritie.id}>
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
