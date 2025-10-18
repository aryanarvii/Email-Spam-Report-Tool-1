import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReport } from "../api/reportApi";
import Loader from "../components/Loader";

export default function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getReport(id);
        setReport(data);
      } catch (err) {
        console.error("Failed to fetch report:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;
  if (!report) return <p className="text-center mt-10 text-red-500">❌ Report not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        📊 Deliverability Report
      </h1>

      <p className="mb-2 text-center font-semibold">
        Deliverability Score: {report.deliverabilityScore}%
      </p>
      <p className="mb-4 text-center">Test Code: {report.testCode}</p>

      <table className="w-full border border-gray-200 text-left">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="p-2 ">Provider</th>
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
              <td className="p-2">{r.read === "READ" ? "SEEN ✅" : "NO UPDATE ❌"}</td>

            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-center">
        <a
          href={`${import.meta.env.VITE_API_URL}/api/report/${report.reportId}/pdf`}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
