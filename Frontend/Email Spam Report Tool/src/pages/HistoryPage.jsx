import { useEffect, useState } from "react";
import { fetchHistory } from "../utils/api";
import {getHistory} from "../api/reportApi"

export default function HistoryPage() {
  const [reports, setReports] = useState([]);
  const email = localStorage.getItem("userEmail"); // or pass via props

  useEffect(() => {
    if (email) {
      (async () => {
        const history = await getHistory(email);
        setReports(history);
      })();
    }
  }, [email]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">📜 Past Tests</h1>
      <ul className="space-y-2">
        {reports.map(r => (
          <li key={r.reportId} className="p-3 text-black bg-white border rounded flex justify-between">
            <div>
              <p className="font-semibold">Score: {r.deliverabilityScore}%</p>
              <p className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</p>
            </div>
            <a
              href={`${window.location.origin}/report/${r.reportId}`}
              target="_blank"
              className="text-blue-600 underline"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
