import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

const LoginPrompt = () => {
  const { authModalOpen, authModalTab, closeAuth, openAuth, login, signup } =
    useAuth();
  const [tab, setTab] = useState(authModalTab || "login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTab(authModalTab || "login");
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  }, [authModalOpen, authModalTab]);

  if (!authModalOpen) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        await login({ email, password });
      } else {
        if (!name) throw new Error("Please enter your name");
        if (!email) throw new Error("Please enter your email");
        if (!password) throw new Error("Please enter a password");
        await signup({ name, email, password });
      }
      closeAuth();
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={closeAuth}></div>
      <div className="relative max-w-md w-full bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-xl">
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-full ${tab === "login" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-full ${tab === "signup" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setTab("signup")}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          {tab === "signup" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full p-3 border rounded-lg"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
          />

          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeAuth}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : tab === "login"
                  ? "Login"
                  : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPrompt;
