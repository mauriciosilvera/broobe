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

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
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

      if (response.ok) {
        setMessage('Usuario registrado correctamente.');
      } else {
        throw new Error("Hubo un error al registrar al usuario, por favor pruebe nuevamente.");
      }


    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Editar Issue #{data.id}</h1>
      <p>{data.name}</p>
      <input value={data.name} />
      <p>{data.description}</p>
    </form>
  );
}