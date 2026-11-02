"use client";

import React, { useState } from "react";
import Button from "../atoms/Button";
import TextInput from "../molecules/TextInput";
import { useRouter } from "next/navigation";
import { Ticket } from "../molecules/EventCard";
import { postData } from "@/utils/fetchData";
import Cookies from "js-cookie";

export interface FormCheckoutProps {
  eventId: string;
  tickets: Ticket[];
  payments?: Array<{ _id: string; type: string; image?: { name?: string } }>;
  selectedTicketId?: string;
}

export default function FormCheckout({
  eventId,
  tickets,
  payments = [],
  selectedTicketId,
}: FormCheckoutProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    lastName: "",
    firstName: "",
    role: "",
  });
  const [paymentMethod, setPaymentMethod] = useState(
    payments.length > 0 ? payments[0]._id : "default-payment",
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedTicket =
    tickets.find((t) => t._id === selectedTicketId) ||
    tickets[0] || { type: "General Admission", price: 0 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!form.firstName.trim() || !form.email.trim()) {
      setError("First Name and Email are required for checkout.");
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      router.push(`/signin?redirect=/checkout/${eventId}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        event: eventId,
        personalDetail: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim() || "-",
          email: form.email.trim(),
          role: form.role.trim() || "-",
        },
        payment: paymentMethod,
        tickets: [
          {
            ticketCategories: {
              type: selectedTicket.type || "General Admission",
              price: selectedTicket.price,
            },
            sumTicket: 1,
          },
        ],
      };

      const res = await postData("api/v1/participants/checkout", payload, token);
      if (res.error) {
        setError(res.message || "Failed to complete checkout.");
        return;
      }

      router.push("/?checkout=success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Checkout error.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[900px] mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-border-light text-navy"
    >
      {error && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl text-sm font-medium bg-surface-subtle text-destructive border border-destructive"
        >
          {error}
        </div>
      )}

      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-sm font-bold text-navy bg-surface-subtle w-8 h-8 rounded-full flex items-center justify-center">
            01
          </div>
          <h2 className="text-xl font-bold text-navy">Personal Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TextInput
            label="First Name"
            name="firstName"
            placeholder="First name here"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Last Name"
            name="lastName"
            placeholder="Last name here"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="semina@bwa.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Role"
            name="role"
            placeholder="Product Designer"
            value={form.role}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-sm font-bold text-navy bg-surface-subtle w-8 h-8 rounded-full flex items-center justify-center">
            02
          </div>
          <h2 className="text-xl font-bold text-navy">Payment Method</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {payments.length > 0
            ? payments.map((method) => {
                const isSelected = paymentMethod === method._id;
                return (
                  <label
                    key={method._id}
                    className={`p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? "border-green-ink bg-green-light shadow-sm"
                        : "border-border-light bg-white hover:border-input-border"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-semibold text-sm ${
                          isSelected ? "text-green-ink" : "text-navy"
                        }`}
                      >
                        {method.type}
                      </span>
                      <input
                        type="radio"
                        name="payment"
                        value={method._id}
                        checked={isSelected}
                        onChange={() => setPaymentMethod(method._id)}
                        className="w-4 h-4 accent-green-ink"
                      />
                    </div>
                  </label>
                );
              })
            : ["Visa / Mastercard", "Bank Transfer", "Digital Wallet"].map(
                (type, i) => {
                  const id = `fallback-${i}`;
                  const isSelected = paymentMethod === id;
                  return (
                    <label
                      key={id}
                      className={`p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                        isSelected
                          ? "border-green-ink bg-green-light shadow-sm"
                          : "border-border-light bg-white hover:border-input-border"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span
                          className={`font-semibold text-sm ${
                            isSelected ? "text-green-ink" : "text-navy"
                          }`}
                        >
                          {type}
                        </span>
                        <input
                          type="radio"
                          name="payment"
                          value={id}
                          checked={isSelected}
                          onChange={() => setPaymentMethod(id)}
                          className="w-4 h-4 accent-green-ink"
                        />
                      </div>
                    </label>
                  );
                },
              )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-border-light">
        <Button
          variant="green"
          type="submit"
          disabled={loading}
          className="w-full sm:w-[260px] py-3 text-base font-semibold"
        >
          {loading ? "Processing..." : `Pay $${selectedTicket.price} Now`}
        </Button>
        <div className="flex items-center gap-2 text-muted-light text-xs">
          <span>🔒</span>
          <span>Your payment is secure and encrypted end-to-end</span>
        </div>
      </div>
    </form>
  );
}
