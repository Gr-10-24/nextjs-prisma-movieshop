"use client";

import { Updateban } from "@/app/actions/ban";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddBan() {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState("7"); // Default to 7 days
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is banned and force logout
    const checkBanStatus = async () => {
      try {
        const response = await fetch("/api/check-ban-status");
        const data = await response.json();
        if (data.banned) {
          // If checking from an admin panel, we probably don't want to redirect
          // This is more relevant for regular user pages
          // router.push("/movie");
        }
      } catch (error) {
        console.error("Failed to check ban status:", error);
      }
    };
    checkBanStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!email) {
      setMessage("Email is required.");
      setIsLoading(false);
      return;
    }

    try {
      // Calculate ban expiration date based on selected duration (in days)
      const banExpires = new Date();
      banExpires.setDate(banExpires.getDate() + parseInt(banDuration));

      const response = await Updateban(email, {
        banReason,
        banExpires: banExpires,
      });

      if (response?.success) {
        setMessage(response.message);
        setEmail("");
        setBanReason("");
      } else {
        setMessage(response?.message || "Failed to ban user.");
      }
    } catch (error) {
      console.error("Ban error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ban User</h1>

      {message && (
        <div
          className={`p-4 mb-6 rounded-md ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            User Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            type="email"
            placeholder="user@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="banReason"
            className="block text-sm font-medium text-gray-700"
          >
            Ban Reason
          </label>
          <textarea
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
            id="banReason"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
            placeholder="Reason for banning the user"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="banDuration"
            className="block text-sm font-medium text-gray-700"
          >
            Ban Duration
          </label>
          <select
            id="banDuration"
            value={banDuration}
            onChange={(e) => setBanDuration(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="1">1 day</option>
            <option value="3">3 days</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
            <option value="90">90 days</option>
            <option value="365">1 year</option>
            <option value="3650">10 years (Permanent)</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 font-medium rounded-md ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            }`}
          >
            {isLoading ? "Processing..." : "Ban User"}
          </button>
        </div>
      </form>
    </div>
  );
}
