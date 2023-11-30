"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/util/auth";

export default function Page({ params: { slug } }) {
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

  return (
    <section>
      <h1>Issue #{data.id}</h1>
      <p>{data.name}</p>
      <p>{data.description}</p>
    </section>
  );
}
