import { auth } from "@/utils/auth";

export const logIn = async (body) => {
  const response = await fetch("https://challenge.broobe.net/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const getIssues = async () => {
  const response = await fetch("https://challenge.broobe.net/api/v1/issues", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.getToken(),
    },
  });

  return await response.json();
};

export const postIssue = async (issue) => {
  const res = await fetch("https://challenge.broobe.net/api/v1/issues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.getToken(),
    },
    body: JSON.stringify(issue),
  });

  if (!res.ok) return undefined;
  return res.json();
};
