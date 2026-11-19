import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AuthModal({ onClose }) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false); // false = login, true = signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = () => {
    setIsSignup(!isSignup);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isSignup && !name)) {
      setError("Please fill all the fields");
      return;
    }
    if (isSignup && password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const url = isSignup ? "/auth/signup" : "/auth/login";
      const data = isSignup ? { name, email, password } : { email, password };

      const res = await api.post(url, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/notes");
    } catch (err) {
      setError(err.response?.data?.message || "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 sm:p-8 rounded-lg shadow w-full max-w-sm relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-1">
          {isSignup ? "Sign up" : "Login"}
        </h2>
        <p className="text-gray-500 text-sm mb-5">
          {isSignup
            ? "Create an account to start taking notes"
            : "Login to see your notes"}
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-indigo-500"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="password"
          placeholder={isSignup ? "Password (min 6 characters)" : "Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Please wait..." : isSignup ? "Sign up" : "Login"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={switchMode}
            className="text-indigo-600 font-medium"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AuthModal;
