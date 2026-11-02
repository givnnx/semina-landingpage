"use client";

import React, { useMemo, useState } from "react";
import EventCard, { EventData } from "@/components/molecules/EventCard";

interface BrowseCatalogProps {
  initialEvents: EventData[];
}

export default function BrowseCatalog({ initialEvents }: BrowseCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState<"All" | "Free" | "Paid">("All");

  // Extract unique category names
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialEvents.forEach((e) => {
      if (e.category?.name) {
        set.add(e.category.name);
      }
    });
    return ["All", ...Array.from(set)];
  }, [initialEvents]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      // Search keyword match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = event.title?.toLowerCase().includes(query);
        const matchVenue = event.venueName?.toLowerCase().includes(query);
        const matchCategory = event.category?.name?.toLowerCase().includes(query);
        if (!matchTitle && !matchVenue && !matchCategory) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== "All") {
        if (event.category?.name !== selectedCategory) {
          return false;
        }
      }

      // Price tier match
      const price = event.tickets?.[0]?.price ?? 0;
      if (priceFilter === "Free" && price > 0) return false;
      if (priceFilter === "Paid" && price === 0) return false;

      return true;
    });
  }, [initialEvents, searchQuery, selectedCategory, priceFilter]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceFilter("All");
  };

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "All" || priceFilter !== "All";

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-border-light shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Keyword Search Input */}
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, category, or venue..."
              className="w-full min-h-11 pl-11 pr-11 py-2.5 rounded-full border-2 border-input-border bg-white text-navy text-sm placeholder:text-muted-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-ink focus:border-green-ink transition-colors"
            />
            {/* Search Icon */}
            <svg
              className="w-5 h-5 text-navy absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {/* Clear Button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 min-h-9 min-w-9 flex items-center justify-center text-navy hover:text-navy rounded-full hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-green-ink cursor-pointer transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Price Tier Filter */}
          <div className="inline-flex p-1 bg-surface-subtle border border-border-light rounded-full self-start md:self-auto">
            {(["All", "Free", "Paid"] as const).map((tier) => {
              const isSelected = priceFilter === tier;
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setPriceFilter(tier)}
                  className={`min-h-9 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-green-ink ${
                    isSelected
                      ? "bg-navy text-white shadow-sm"
                      : "text-muted-light hover:text-navy"
                  }`}
                >
                  {tier}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs font-semibold text-muted-light uppercase tracking-wider shrink-0 mr-2">
            Categories:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-9 px-4 rounded-full text-xs sm:text-sm font-medium shrink-0 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-green-ink ${
                  isSelected
                    ? "bg-green text-navy font-bold shadow-sm"
                    : "bg-surface-subtle text-muted-light hover:bg-border-light hover:text-navy border border-border-light"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p className="text-sm font-medium text-muted-light">
          Showing <span className="font-bold text-navy">{filteredEvents.length}</span> of{" "}
          <span className="font-bold text-navy">{initialEvents.length}</span> events
        </p>

        {isFiltered && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-accent-magenta hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-magenta"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Event Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event, index) => (
            <div className="w-full" key={event._id || index}>
              <EventCard data={event} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-border-light shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-surface-subtle border border-border-light flex items-center justify-center">
            <svg
              className="w-7 h-7 text-muted-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-navy">No Events Match Your Search</h3>
          <p className="text-sm text-muted-light leading-relaxed">
            We could not find any events matching your selected criteria. Try searching for a different keyword or resetting your filters.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center min-h-11 px-6 rounded-full text-sm font-semibold bg-navy text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-green cursor-pointer transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
