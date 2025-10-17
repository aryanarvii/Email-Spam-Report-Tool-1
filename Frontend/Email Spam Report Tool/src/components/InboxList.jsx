import React from "react";

export default function InboxList({ inboxes }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-xl font-bold mb-3">📩 Test Inbox Addresses</h2>
      <ul className="space-y-2">
        {inboxes.map((email, index) => (
          <li
            key={index}
            className="border rounded p-2 bg-gray-50 text-gray-700 flex justify-between"
          >
            <span>{email}</span>
            <button
              className="text-blue-600 text-sm"
              onClick={() => navigator.clipboard.writeText(email)}
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
