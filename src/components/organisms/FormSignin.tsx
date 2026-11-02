"use client";

import React, { useState } from "react";
import Button from "../atoms/Button";
import TextInput from "../molecules/TextInput";
import { useRouter } from "next/navigation";
import { postData } from "@/utils/fetchData";
import Cookies from "js-cookie";

export default function FormSignin() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await postData("api/v1/participants/auth/signin", form);
      if (res.error) {
        setError(res.message || "Invalid credentials.");
        return;
      }

      const token = res.data?.token || res.data;
      if (token && typeof token === "string") {
        Cookies.set("token", token, {
          expires: 1,
          sameSite: "lax",
          secure: typeof window !== "undefined" && window.location.protocol === "https:",
        });
        router.push("/");
      } else {
        setError("Invalid response format from server.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sign in failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 pb-[30px] w-full max-w-[460px] flex flex-col gap-5 border border-border-light shadow-xl">
      {error && (
        <div
          role="alert"
          className="p-3 rounded-xl text-sm font-medium bg-surface-subtle text-destructive border border-destructive"
        >
          {error}
        </div>
      )}
      <TextInput
        label={"Email"}
        type={"email"}
        name="email"
        value={form.email}
        placeholder={"semina@bwa.com"}
        onChange={handleChange}
      />

      <TextInput
        label={"Password (6 characters)"}
        type={"password"}
        name="password"
        value={form.password}
        placeholder="Type your password"
        onChange={handleChange}
      />

      <div className="flex flex-col gap-4 mt-2">
        <Button variant={"green"} type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <Button onClick={() => router.push("/signup")} variant="navy">
          Create New Account
        </Button>
      </div>
    </form>
  );
}
