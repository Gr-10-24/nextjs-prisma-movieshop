"use client";

import { useRouter } from "next/navigation";

export default function BanUserButton() {
  const router = useRouter();

  const handleBanUser = () => {
    router.push("/ban");
  };

  return (
    <button
      onClick={handleBanUser}
      className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md"
    >
      Ban User
    </button>
  );
}
