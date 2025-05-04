// components/SignUpPage.jsx
import React, { useState } from "react";

export default function SignUpPage({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(u => u.email === email);
    if (exists) return alert("User already exists");

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful, please login.");
    onSignup();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
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
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <p className="mt-2 text-sm text-center">
          Already have an account? <a href="/login" className="text-indigo-500">Login</a>
        </p>
      </div>
    </div>
  );
}
