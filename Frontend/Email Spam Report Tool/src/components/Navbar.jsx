import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" bg-white border-b mb-4 shadow-sm">
      <div className="max-w-4xl mx-auto flex justify-between flex-wrap items-center p-4">
        <Link to="/" className="font-bold text-blue-600 text-2xl">Email Spam Report Tool</Link>
        <div className=" space-x-10 font-semibold">
          <Link to="/" className="text-blue-600 text-xl hover:text-2xl hover:transition-all">Home</Link>
          <Link to="/history" className="text-blue-600 text-xl hover:text-2xl hover:transition-all">History</Link>
        </div>
      </div>
    </nav>
  );
} 


