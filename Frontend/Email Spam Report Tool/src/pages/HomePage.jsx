import { useState, useEffect } from "react";
import { generateTestCode } from "../api/testApi";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [testCode, setTestCode] = useState("");
  const [inboxes, setInboxes] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await generateTestCode();
        console.log(data)
        setTestCode(data.code);
        setInboxes(data.inboxes);
      } catch (err) {
        console.error("Failed to fetch test code:", err);
      }
    })();
  }, []);
  console.log("code ", testCode)
  const handleStartTest = () => {
    localStorage.setItem("userEmail", email);
    navigate(`/result?code=${testCode}&email=${email}`);
  };

  return (
    <div className=" flex flex-col justify-even max-w-xl mx-auto  p-6">
      <h1 className="text-2xl font-bold mb-4">Email Spam Report Tool 📬</h1>

      <p className="mb-4 text-gray-600">
        Send an email to the following test addresses using your own email
        account. Include the <strong>Test Code</strong> in the subject or body.
      </p>
      
      <div className="bg-gray-100 text-black p-4 rounded mb-4">
        <p className="text-lg font-mono font-semibold">{testCode}</p>
      </div>

      <ul className="space-y-2 mb-4">
        {inboxes.map((inbox, idx) => (
          <li key={idx} className="bg-white text-black p-2 rounded border">
            {inbox}
          </li>
        ))}
      </ul>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleStartTest}
        disabled={!email}
        className="bg-blue-600 text-white font-bold px-4 py-2 rounded w-full hover:transition-all hover:scale-[1.1]"
      >
        Start Test
      </button>
    </div>
  );
}
