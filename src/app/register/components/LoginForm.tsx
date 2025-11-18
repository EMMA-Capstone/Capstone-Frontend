"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { manrope } from "../../layout";
import { useRouter } from 'next/navigation'
import registerUser from "../actions/login";

export default function LoginForm() {
  const { setToken, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter() 

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const user = await registerUser(email, username,password) as { token?: string } | undefined;
      if (user && user.token) {
        console.log("Register successful, token:", user.token);
        setToken(user.token);
        login();
        router.push('/dashboard')
      } else {
        console.error("Register failed: no token returned");
      }
    } catch (err) {
      console.error("Register failed:", err);
    }
  }

  return (
    <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-lg py-4 rounded-lg shadow-md">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            className="mt-1 block w-full px-3 py-2 border bg-[#1F241F] border-[#424F40] rounded-md shadow-sm focus:outline-none transition-colors duration-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="username" className={`block text-sm font-medium text-white ${manrope.className}`}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mt-1 block w-full px-3 py-2 border bg-[#1F241F] border-[#424F40] rounded-md shadow-sm focus:outline-none transition-colors duration-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            className="mt-1 block w-full px-3 py-2 border bg-[#1F241F] border-[#424F40] rounded-md shadow-sm focus:outline-none transition-colors duration-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className={`w-full flex justify-center hover:cursor-pointer py-2 px-4 border border-transparent rounded-3xl shadow-sm text-md font-medium text-black bg-[#8CD178] hover:bg-[#71ac61] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${manrope.className} font-bold transition-colors duration-300`}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
