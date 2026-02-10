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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await postData("api/v1/auth/signin", form);
      if (res.data) {
        if (res.data.token) {
          Cookies.set("token", res.data.token);
          router.push("/");
        } else {
          console.error("Token missing in response");
        }
      } else {
        console.error("Sign in failed", res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-6 pb-[30px] w-full max-w-[460px] flex flex-col gap-5">
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
        <Button variant={"green"} onClick={() => handleSubmit()}>
          Sign In
        </Button>

        <Button onClick={() => router.push("/signup")} variant="navy">
          Create New Account
        </Button>
      </div>
    </div>
  );
}
