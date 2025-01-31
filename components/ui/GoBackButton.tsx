"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      className="bg-amber-400 w-full lg:w-auto text-cxl px-10 py-3 font-bold text-center cursor-pointer"
      onClick={() => router.back()}
    >
      Productos
    </button>
  );
}
