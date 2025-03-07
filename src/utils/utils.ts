import { format } from "timeago.js";

export const getNameByEmail = (email?: string | null) => {
  if (!email) return "";

  if (!email.includes("@")) return email;
  return email.split("@")[0];
};

export const parseDate = (date: string) => {
  return format(date);
};
