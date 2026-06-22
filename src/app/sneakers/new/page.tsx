"use client";

import { createSneakerDrop } from "@/actions/sneaker";
import { useAction } from "next-safe-action/hooks";

export default function NewDropPage() {
  const { execute, isPending, result } = useAction(createSneakerDrop);

  const mockSneaker = {
    title: "Air Jordan 1 High Mock",
    price: 180,
    stock: 5,
  };

  const handleTriggerDrop = async () => {
    execute(mockSneaker);
  };

  return (
    <main className="p-5">
      <h2>Server Action Testing</h2>
      <p>
        Item to send: {mockSneaker.title} (${mockSneaker.price})
      </p>

      <button
        onClick={handleTriggerDrop}
        disabled={isPending}
        className="cursor-pointer"
      >
        {isPending ? "Sending..." : "Send data to the server"}
      </button>
      <div className="mt-5 ">
        {result.serverError && (
          <p className="text-red-500">Backend Error: {result.serverError}</p>
        )}

        {result.validationErrors && (
          <p className="text-orange-500">
            Contract Validation Error - Check input data types
          </p>
        )}

        {result.data?.success && (
          <p className="text-emerald-500">
            Success! ID in the database: {result.data.product.id}{" "}
          </p>
        )}
      </div>
    </main>
  );
}

// 4:35:23
