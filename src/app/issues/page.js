"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { auth } from "@/utils/auth";
import "react-confirm-alert/src/react-confirm-alert.css";
import IssueCard from "@/components/IssueCard/IssueCard";
import Link from "next/link";
import { Oval } from "react-loader-spinner";

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
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
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <section className={styles.issues}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Issues</h1>
      </div>
      {loading ? (
        <Oval
          height={80}
          width={80}
          className={styles.loadingSpinner}
          color="#503FE0"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#503FE0"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : data && data.length > 0 ? (
        <ul className={styles.issuesList}>
          {data.map((issue) => (
            <IssueCard key={issue.id} data={issue} setData={setData} />
          ))}
          <Link href="/issues/create" className={styles.add}>
            +
          </Link>
        </ul>
      ) : (
        <>
          <p>En este momento no hay issues activos.</p>
          <Link href="/issues/create" className={styles.addButton}>
            Agregar
          </Link>
        </>
      )}
    </section>
  );
}
