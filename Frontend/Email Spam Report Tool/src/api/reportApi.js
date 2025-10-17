import axiosInstance from "./axiosInstance";

export const getReport = async (id) => {
  const { data } = await axiosInstance.get(`/api/report/${id}`);
  return data;
};

export const getHistory = async (email) => {
  const { data } = await axiosInstance.get(`/api/report/reports/${email}`);
  return data;
};

export const downloadPDF = async (id) => {
  const { data } = await axiosInstance.get(`/api/report/${id}/pdf`, {
    responseType: "blob", // 📎 important for file download
  });

  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `Report-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
