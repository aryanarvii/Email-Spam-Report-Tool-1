import React from "react";

export default function TestInstructions({ code, onGenerate, onStart }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full mt-6">
      <h2 className="text-xl font-bold mb-2">🧾 Test Instructions</h2>
      <p className="text-gray-600 mb-4">
        Send an email from your own account to the inbox addresses above.
        <br />
        Include the test code in the subject or body.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onGenerate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate Test Code
        </button>

        {code && (
          <div className="px-3 py-2 bg-gray-100 rounded border text-lg font-mono">
            {code}
          </div>
        )}
      </div>

      <button
        onClick={onStart}
        disabled={!code}
        className={`px-4 py-2 rounded text-white ${
          code ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Start Test
      </button>
    </div>
  );
}
