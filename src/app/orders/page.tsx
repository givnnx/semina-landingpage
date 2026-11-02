"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { getData } from "@/utils/fetchData";
import { formatDate } from "@/utils/formatDate";

interface OrderItem {
  ticketCategories: {
    type: string;
    price: number;
  };
  sumTicket: number;
}

interface Order {
  _id: string;
  date: string;
  status: "pending" | "paid";
  totalPay: number;
  totalOrderTicket: number;
  orderItems: OrderItem[];
  payment?: {
    _id: string;
    type: string;
  };
  event?: {
    _id: string;
    title: string;
    venueName: string;
    date: string;
  };
  historyEvent?: {
    title: string;
    venueName: string;
    date: string;
  };
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/signin?redirect=/orders");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getData("api/v1/participants/orders", undefined, token);
        if (res && res.data) {
          setOrders(Array.isArray(res.data) ? res.data : []);
        } else {
          setOrders([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch participant orders:", err);
        setError("Unable to load orders at this time. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col bg-surface-subtle">
      <section className="bg-navy">
        <Navbar />
      </section>

      {/* Page Header */}
      <section className="bg-navy py-12 lg:py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-green">
            Account Management
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            My Tickets & Orders
          </h1>
          <p className="text-gray-text mt-2 text-base max-w-2xl">
            Access your registered event tickets, payment confirmations, and booking history in one place.
          </p>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-12 lg:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-2xl p-4 mb-8 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            /* Skeleton Loading State */
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-border-light shadow-sm animate-pulse space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-border-light rounded-md w-1/3" />
                    <div className="h-6 bg-border-light rounded-full w-20" />
                  </div>
                  <div className="h-4 bg-border-light rounded-md w-1/4" />
                  <div className="h-10 bg-surface-subtle rounded-xl w-full" />
                </div>
              ))}
            </div>
          ) : orders.length > 0 ? (
            /* Orders List */
            <div className="space-y-6">
              {orders.map((order) => {
                const title =
                  order.historyEvent?.title ||
                  order.event?.title ||
                  "Event Registration";
                const venue =
                  order.historyEvent?.venueName ||
                  order.event?.venueName ||
                  "Online / To Be Announced";
                const eventDate =
                  order.historyEvent?.date || order.event?.date || order.date;
                const isPaid = order.status === "paid";

                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-border-light shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-light">
                      <div>
                        <span className="text-xs text-muted-light">
                          Order ID: <span className="font-mono text-navy">{order._id}</span>
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-navy mt-1">
                          {title}
                        </h2>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${
                            isPaid
                              ? "bg-green-light text-green-ink border border-green-ink/20"
                              : "bg-surface-subtle text-muted-light border border-border-light"
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-2xl font-bold text-navy">
                          ${order.totalPay}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-border-light text-sm">
                      <div className="flex items-start gap-3">
                        <img
                          src="/icons/ic-marker.svg"
                          alt=""
                          className="w-5 h-5 shrink-0 mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-navy block">Venue</span>
                          <span className="text-muted-light">{venue}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <img
                          src="/icons/ic-calendar.svg"
                          alt=""
                          className="w-5 h-5 shrink-0 mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-navy block">Event Date</span>
                          <span className="text-muted-light">{formatDate(eventDate)}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-navy inline-flex items-center justify-center shrink-0 mt-0.5">
                          <img src="/icons/ic-secure.svg" alt="" className="w-3 h-3" />
                        </span>
                        <div>
                          <span className="font-semibold text-navy block">Payment Method</span>
                          <span className="text-muted-light">
                            {order.payment?.type || "Online Transfer"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-light block mb-2">
                          Purchased Tickets ({order.totalOrderTicket} total)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {order.orderItems?.map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle text-xs font-medium text-navy border border-border-light"
                            >
                              <span>{item.sumTicket}x</span>
                              <span className="font-semibold">
                                {item.ticketCategories?.type || "General"}
                              </span>
                              <span className="text-muted-light">
                                (${item.ticketCategories?.price ?? 0} each)
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {order.event?._id && (
                        <Link
                          href={`/detail/${order.event._id}`}
                          className="inline-flex items-center justify-center min-h-11 px-5 rounded-full text-xs sm:text-sm font-semibold bg-navy text-white hover:brightness-110 transition-all focus-visible:outline-2 focus-visible:outline-green"
                        >
                          View Event Details
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Actionable Empty State */
            <div className="bg-white rounded-3xl p-10 sm:p-16 text-center border border-border-light shadow-sm max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface-subtle border border-border-light flex items-center justify-center">
                <img
                  src="/icons/ic-calendar.svg"
                  alt=""
                  className="w-8 h-8 opacity-75"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                You haven&apos;t booked any tickets yet
              </h2>
              <p className="text-sm text-muted-light leading-relaxed">
                Discover inspiring conferences, practical coding masterclasses, and executive design sessions.
              </p>
              <div className="pt-2">
                <Link
                  href="/browse"
                  className="inline-flex items-center justify-center min-h-12 px-7 rounded-full text-sm font-semibold bg-green text-navy hover:brightness-105 shadow-[0px_4px_15px_rgba(1,251,52,0.35)] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-green-ink"
                >
                  Browse Events
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
