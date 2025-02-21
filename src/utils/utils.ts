export const getNameByEmail = (email?: string | null) => {
  if (!email) return "";

  if (!email.includes("@")) return email;
  return email.split("@")[0];
};
