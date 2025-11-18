"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { manrope } from "../../layout";
import { useRouter } from 'next/navigation';
import loginUser from "../actions/login";

export default function LoginForm() {
  const { setToken, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const user = (await loginUser(email, password)) as { token?: string } | undefined;
      if (user && user.token) {
        console.log("Login successful, token:", user.token);
        setToken(user.token);
        login();
        router.push("/dashboard");
        window.location.href = "/dashboard";
      } else {
        console.error("Login failed: no token returned");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 py-8 max-w-md mx-auto rounded-lg shadow-md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h2 className={`text-center text-xl text-white font-bold ${manrope.className}`}>Log In</h2>

        <div>
          <label htmlFor="email" className={`block text-sm font-medium text-white ${manrope.className}`}>
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mt-1 block w-full px-3 py-2 border bg-[#1F241F] border-[#424F40] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className={`block text-sm font-medium text-white ${manrope.className}`}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-1 block w-full px-3 py-2 border bg-[#1F241F] border-[#424F40] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-3xl shadow-sm text-md font-medium text-black bg-[#8CD178] hover:bg-[#71ac61] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${manrope.className} font-bold transition-colors duration-300`}
        >
          Log In
        </button>
      </form>
    </div>
  );
}
