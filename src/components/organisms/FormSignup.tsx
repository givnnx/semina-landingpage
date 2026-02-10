"use client";

import React, { useState } from "react";
import Button from "../atoms/Button";
import TextInput from "../molecules/TextInput";
import { useRouter } from "next/navigation";
import { postData } from "@/utils/fetchData";

export default function FormSignup() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await postData("api/v1/participants/auth/signup", form);
      if (res.data) {
        router.push("/signin");
      } else {
        console.error("Sign up failed", res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-6 pb-[30px] w-full max-w-[460px] flex flex-col gap-5">
      <>
        <TextInput
          label={"First Name"}
          type={"text"}
          value={form.firstName}
          name="firstName"
          placeholder="First name here"
          onChange={handleChange}
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
        />

        <TextInput
          label={"Password (6 characters)"}
          type={"password"}
          value={form.password}
          name="password"
          placeholder="Type your password"
          onChange={handleChange}
        />

        <TextInput
          label={"Role"}
          type={"text"}
          value={form.role}
          name="role"
          placeholder="ex: Product Designer"
          onChange={handleChange}
        />
      </>

      <div className="mt-2">
        <Button
          variant={"green"}
          onClick={() => handleSubmit()}
          className="w-full"
        >
          Sign Up
        </Button>
        <Button
          onClick={() => router.push("/signin")}
          variant="navy"
          className="w-full mt-4"
        >
          Back to Sign In
        </Button>
      </div>
    </div>
  );
}
