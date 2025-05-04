// components/LoginPage.jsx
import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = storedUsers.find(u => u.email === email && u.password === password);
    if (validUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 px-4 py-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-2 text-sm text-center">
          Don’t have an account? <a href="/signup" className="text-indigo-500">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
