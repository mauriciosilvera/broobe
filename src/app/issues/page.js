import React from "react";
import styles from "./page.module.css";

const issuesMock = [
  {
    id: 1,
    name: "Create React App",
    description: "Download the necessary tools for the application.",
    priority_id: 1,
  },
  {
    id: 2,
    name: "Test 2",
    description: "Hellooooo!",
    priority_id: 2,
  },
  {
    id: 3,
    name: "Test 3 Loren Ipsum",
    description: "Get something to drink",
    priority_id: 3,
  },
  {
    id: 4,
    name: "Test 4 React App",
    description: "Do something.",
    priority_id: 4,
  },
  {
    id: 5,
    name: "Test 5 ni idea",
    description: "Download.",
    priority_id: 5,
  },
  {
    id: 6,
    name: "Test 5 ni idea",
    description: "Download.",
    priority_id: 6,
  },
];

export default function page() {
  return (
    <section className={styles.issues}>
      <h1>Issues</h1>
      <button>Agregar</button>
      <ul className={styles.issuesList}>
        {issuesMock.map((issue) => (
          <li key={issue.id} className={styles.issue}>
            <p>{issue.name}</p>
            <p>{issue.description}</p>
            <button>Editar</button>
            <button>Eliminar CON CONFIRMACION</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
