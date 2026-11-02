"use client";

import React, { useState } from "react";
import Button from "../atoms/Button";
import TextInput from "../molecules/TextInput";
import { useRouter } from "next/navigation";
import { postData, putData } from "@/utils/fetchData";

export default function FormSignup() {
  const router = useRouter();
  const [step, setStep] = useState<"signup" | "otp">("signup");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSignupSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!form.firstName || !form.email || !form.password) {
      setError("First name, email, and password are required.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await postData("api/v1/participants/auth/signup", form);
      if (res.error) {
        setError(res.message || "Sign up failed.");
        return;
      }
      setStep("otp");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sign up failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the OTP verification code.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await putData("api/v1/active", {
        email: form.email,
        otp: otp.trim(),
      });
      if (res.error) {
        setError(res.message || "Invalid or expired OTP code.");
        return;
      }
      router.push("/signin?activated=true");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Activation failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 pb-[30px] w-full max-w-[460px] flex flex-col gap-5 border border-border-light shadow-xl">
      {error && (
        <div
          role="alert"
          className="p-3 rounded-xl text-sm font-medium bg-surface-subtle text-destructive border border-destructive"
        >
          {error}
        </div>
      )}

      {step === "signup" ? (
        <form onSubmit={handleSignupSubmit} className="flex flex-col gap-5">
          <TextInput
            label={"First Name"}
            type={"text"}
            value={form.firstName}
            name="firstName"
            placeholder="First name here"
            onChange={handleChange}
            required
          />
          <TextInput
            label={"Last Name"}
            type={"text"}
            name="lastName"
            value={form.lastName}
            placeholder="Last name here"
            onChange={handleChange}
          />
          <TextInput
            label={"Email"}
            type={"email"}
            name="email"
            value={form.email}
            placeholder={"semina@bwa.com"}
            onChange={handleChange}
            required
          />
          <TextInput
            label={"Password (6+ characters)"}
            type={"password"}
            value={form.password}
            name="password"
            placeholder="Type your password"
            onChange={handleChange}
            required
          />
          <TextInput
            label={"Role"}
            type={"text"}
            value={form.role}
            name="role"
            placeholder="ex: Product Designer"
            onChange={handleChange}
          />

          <div className="mt-2">
            <Button
              variant={"green"}
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
            <Button
              onClick={() => router.push("/signin")}
              type="button"
              variant="navy"
              className="w-full mt-4"
            >
              Back to Sign In
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
          <div className="text-sm text-muted-light">
            We sent a 6-digit OTP verification code to{" "}
            <strong className="text-navy">{form.email}</strong>. Please enter
            it below to activate your account.
          </div>

          <TextInput
            label={"Verification Code (OTP)"}
            type={"text"}
            value={otp}
            name="otp"
            placeholder="6-digit code"
            onChange={(e) => {
              setOtp(e.target.value);
              setError(null);
            }}
            required
          />

          <div className="mt-2">
            <Button
              variant={"green"}
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Activating..." : "Verify & Activate"}
            </Button>
            <Button
              onClick={() => setStep("signup")}
              type="button"
              variant="navy"
              className="w-full mt-4"
            >
              Back
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
