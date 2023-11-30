"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { auth } from "@/util/auth";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://challenge.broobe.net/api/v1/issues",
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
  }, []);

  const handleDelete = (id) => {
    confirmAlert({
      title: `¿Está seguro que desea eliminar el issue #${id}?`,
      message: 'Una vez eliminado, el mismo no podrá ser recuperado.',
      buttons: [
        {
          label: 'Si',
          onClick: async () => {
            await fetch(
              `https://challenge.broobe.net/api/v1/issues/${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + auth.getToken(),
                },
              }
            );
            setData((prev) => prev.filter((issue) => issue.id !== id));
          }
        },
        {
          label: 'No'
        }
      ]
    });
  };

  return (
    <section className={styles.issues}>
      <h1>Issues</h1>
      <button>Agregar</button>
      <ul className={styles.issuesList}>
        {data.map((issue) => (
          <li key={issue.id} className={styles.issue}>
            <p>{issue.name}</p>
            <p>{issue.description}</p>
            <button>Editar</button>
            <button onClick={() => handleDelete(issue.id)}>
              Eliminar CON CONFIRMACION
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
