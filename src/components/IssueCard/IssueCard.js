import React from "react";
import styles from "./page.module.css";
import { confirmAlert } from "react-confirm-alert";
import { MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";
import { auth } from "@/utils/auth";

export default function IssueCard(props) {
  const { data, setData } = props;

  const handleDelete = (id) => {
    confirmAlert({
      title: `¿Está seguro que desea eliminar el issue #${id}?`,
      message: "Una vez eliminado, el mismo no podrá ser recuperado.",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await fetch(`https://challenge.broobe.net/api/v1/issues/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.getToken(),
              },
            });
            setData((prev) => prev.filter((issue) => issue.id !== id));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <li key={data.id} className={styles.issue}>
      <div>
        <p className={styles.title}>{`#${data.id} - ${data.name}`}</p>
        <p>{data.description}</p>
      </div>
      <div className={styles.actions}>
        <Link href={`/issues/edit/${data.id}`} className={styles.actionButton}>
          <MdEdit style={{ color: "#503FE0" }} className={styles.icon} />
        </Link>
        <button
          onClick={() => handleDelete(data.id)}
          className={styles.actionButton}
        >
          <MdDelete style={{ color: "red" }} className={styles.icon} />
        </button>
      </div>
    </li>
  );
}
