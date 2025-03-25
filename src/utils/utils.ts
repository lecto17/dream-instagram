import { format } from "timeago.js";

export const getNameByEmail = (email?: string | null) => {
  if (!email) return "";

  if (!email.includes("@")) return email;
  return email.split("@")[0];
};

export const parseDate = (date: string) => {
  return format(date);
};

export const addPost = async (text: string, file?: File) => {
  const formData = new FormData();
  formData.append("text", text);
  if (file) formData.append("file", file);

  await fetch("/api/post", {
    method: "POST",
    body: formData,
  }).catch((err) => console.error("fetch /api/post", err));
};
