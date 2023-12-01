/*eslint no-undef: 0*/

import { auth } from "@/utils/auth";

export const logIn = async (credentials) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const registerUser = async (credentials) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response;
};

export const getIssues = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/issues`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.getToken(),
    },
  });

  return response.json();
};

export const getIssue = async (slug) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/issues/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.getToken(),
      },
    }
  );

  return response.json();
};

export const postIssue = async (issue) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/issues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.getToken(),
    },
    body: JSON.stringify(issue),
  });

  if (!response.ok) return undefined;
  return response.json();
};

export const patchIssue = async (issue, slug) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/issues/${slug}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.getToken(),
      },
      body: JSON.stringify(issue),
    }
  );

  if (!response.ok) return new Error();
  return response;
};

export const deleteIssue = async (id) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/issues/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.getToken(),
    },
  });
};

export const getPriorities = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/priorities`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.getToken(),
      },
    }
  );

  return response.json();
};
