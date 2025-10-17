export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function fetchTestCode() {
  const res = await fetch(`${API_BASE}/api/test`);
  return res.json();
}

export async function runCheck(testCode, userEmail) {
  const res = await fetch(`${API_BASE}/api/checkemails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ testCode, userEmail }),
  });
  return res.json();
}

export async function fetchReport(reportId) {
  const res = await fetch(`${API_BASE}/api/report/${reportId}`);
  return res.json();
}

export async function fetchHistory(email) {
  const res = await fetch(`${API_BASE}/api/report/reports/${email}`);
  return res.json();
}
