import { auth } from "@/utils/auth";

export const logIn = async (credentials) => {
  const response = await fetch(`https://challenge.broobe.net/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const registerUser = async (credentials) => {
  const response = await fetch(`https://challenge.broobe.net/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response;
};

export const getIssues = async () => {
  const response = await fetch(`https://challenge.broobe.net/api/v1/issues`, {
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
    `https://challenge.broobe.net/api/v1/issues/${slug}`,
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
  const response = await fetch(`https://challenge.broobe.net/api/v1/issues`, {
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

export const patchIssue = async (issue) => {
  const response = await fetch("https://challenge.broobe.net/api/v1/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(issue),
  });

  if (!response.ok) return new Error();
  return response.json();
};

export const deleteIssue = async (id) => {
  await fetch(`https://challenge.broobe.net/api/v1/issues/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.getToken(),
    },
  });
};

export const getPriorities = async () => {
  const response = await fetch(
    `https://challenge.broobe.net/api/v1/priorities`,
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
