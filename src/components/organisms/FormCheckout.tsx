"use client";

import React, { useState } from "react";
import Button from "../atoms/Button";
import TextInput from "../molecules/TextInput";
import { useRouter } from "next/navigation";
import { Ticket } from "../molecules/EventCard";

export default function FormCheckout({ tickets }: { tickets: Ticket[] }) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    lastName: "",
    firstName: "",
    role: "",
    payment: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("Checkout:", form, paymentMethod);
    router.push("/");
  };

  return (
    <form className="w-full max-w-[900px] mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-xl font-medium text-navy bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
            01
          </div>
          <div className="text-xl font-medium text-white">Personal Details</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TextInput
            label="First Name"
            name="firstName"
            placeholder="First name here"
            className="border-white/80 text-white"
            value={form.firstName}
            onChange={handleChange}
          />
          <TextInput
            label="Last Name"
            name="lastName"
            placeholder="Last name here"
            className="border-white/80 text-white"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Email"
            className="border-white/80 text-white"
            name="email"
            type="email"
            placeholder="semina@bwa.com"
            value={form.email}
            onChange={handleChange}
          />
          <TextInput
            label="Role"
            className="border-white/80 text-white"
            name="role"
            placeholder="Product Designer"
            value={form.role}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-xl font-medium text-navy bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
            02
          </div>
          <div className="text-xl font-medium text-white">Payment Method</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mock Payments */}
          {["Visa", "MasterCard", "Amex"].map((type, i) => (
            <label
              key={i}
              className={`p-6 border rounded-2xl cursor-pointer transition-all ${paymentMethod === type ? "border-green bg-green/5" : "border-gray-200 bg-white"}`}
            >
              <div className="flex justify-between items-center">
                <div
                  className={`font-medium ${paymentMethod === type ? "text-green" : "text-navy"}`}
                >
                  {type}
                </div>
                <input
                  type="radio"
                  name="payment"
                  value={type}
                  checked={paymentMethod === type}
                  onChange={() => setPaymentMethod(type)}
                  className="w-5 h-5 accent-green"
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-12">
        <Button
          variant="green"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-[230px]"
        >
          Pay Now
        </Button>
        <div className="flex items-center gap-2 text-gray-text text-sm">
          <span>🔒</span>
          <span>Your payment is secure and encrypted</span>
        </div>
      </div>
    </form>
  );
}
