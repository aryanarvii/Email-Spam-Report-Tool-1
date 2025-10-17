import axiosInstance from "./axiosInstance";

export const generateTestCode = async () => {
  const { data } = await axiosInstance.post("/api/test/generate");
  return data;
};

