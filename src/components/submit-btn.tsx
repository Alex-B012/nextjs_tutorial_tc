"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-30 bg-blue-600 text-white py-2 px-4 mt-20 rounded cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending..." : "Submit"}
    </button>
  );
}
