import { format } from "timeago.js";
import imageCompression from "browser-image-compression";

export const getNameByEmail = (email?: string | null) => {
  if (!email) return "";

  if (!email.includes("@")) return email;
  return email.split("@")[0];
};

export const parseDate = (date: string) => {
  return format(date);
};

export const transferImageToWebP = async (file: File) => {
  const options = {
    maxSizeMB: 0.01, // 1MB 이하로 압축
    maxWidthOrHeight: 1024, // 최대 가로/세로 크기
    useWebWorker: true, // 웹 워커 사용으로 성능 개선
    initialQuality: 0.7,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("이미지 압축 실패:", error);
  }
};
