import { useEffect, useState } from "react";
import {runDeliverabilityCheck} from "../api/checkApi"
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";


export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const testCode = searchParams.get("code");
  const userEmail = searchParams.get("email");
  // console.log("code in result: ", testCode)
  // console.log("userEmail: ", userEmail)

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await runDeliverabilityCheck(testCode, userEmail);
      setReport(result);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">📊 Deliverability Report</h1>
      

      <p className="mb-2 font-semibold">Deliverability Score: {report.deliverabilityScore}%</p>

      <table className="w-full border border-gray-200 text-left">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="p-2">Provider</th>
            <th className="p-2">Received</th>
            <th className="p-2">Folder</th>
            <th className="p-2">Mail Read</th>

          </tr>
        </thead>
        <tbody>
          {report.results.map((r, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{r.provider}</td>
              <td className="p-2">{r.received ? "✅" : "❌"}</td>
              <td className="p-2">{r.folder}</td>
              <td className="p-2">{r.read === "READ"? "SEEN ✅" : "NO UPDATE ❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2">
        <a
          href={`${import.meta.env.VITE_API_URL}/api/report/${report.reportId}/pdf`}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Download PDF
        </a>
        <a
          href={`${window.location.origin}/report/${report.reportId}`}
          target="_blank"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Share Report Link
        </a>
      </div>
      <h3 className="my-5">Refresh To Update Results</h3>
      
    </div>
  );
}
