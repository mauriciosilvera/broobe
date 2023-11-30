"use client";

import React, { useState } from "react";
import { auth } from "@/util/auth";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData);

      const response = await fetch(
        "https://challenge.broobe.net/api/v1/issues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.getToken(),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Hubo un error al generar el issue, por favor pruebe nuevamente."
        );
      }
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Nombre</label>
      <input type="text" name="name" />
      <label htmlFor="description">Descripcion</label>
      <input type="text" name="description" />
      <input type="text" name="priority_id" value={2} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Registrarme"}
      </button>
    </form>
  );
}
