import React from "react";
import styles from "./page.module.css";
import { confirmAlert } from "react-confirm-alert";
import { MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";
import { deleteIssue } from "@/utils/requests";

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
            await deleteIssue(id);
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
      <div className={styles.textContainer}>
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
