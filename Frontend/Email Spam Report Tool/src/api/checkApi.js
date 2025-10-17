import axiosInstance from "./axiosInstance";

export const runDeliverabilityCheck = async (testCode, userEmail) => {
  const { data } = await axiosInstance.post("/api/checkemails/check", {
    testCode,
    userEmail,
  });
  return data;
};
