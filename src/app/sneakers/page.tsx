"use client";

import { toggleFavorite } from "@/app/actions/sneaker";
import { startTransition, useOptimistic, useState } from "react";

const SNEAKERS_ARRAY = [
  { id: 1, title: "Nike Air Max 90", isFavorite: false },
  { id: 2, title: "Adidas Yeezy Boost", isFavorite: false },
  { id: 3, title: "Puma RS-X", isFavorite: true },
];

type Sneaker = {
  id: number;
  title: string;
  isFavorite: boolean;
};

export default function SneakersPage() {
  const [sneakers, setSneakers] = useState<Sneaker[]>(SNEAKERS_ARRAY);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [optimisticSneakers, setOptimisticSneakers] = useOptimistic<
    Sneaker[],
    number
  >(sneakers, (state, targetId) =>
    state.map((item) =>
      item.id === targetId ? { ...item, isFavorite: !item.isFavorite } : item,
    ),
  );

  const handleToggleFavorite = async (id: number) => {
    setErrorMessage(null);

    startTransition(async () => {
      setOptimisticSneakers(id);

      const result = await toggleFavorite({ id });

      if (result.serverError) {
        setErrorMessage(result.serverError);
        return;
      }

      if (result.data?.success) {
        setSneakers((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item,
          ),
        );
      }
    });
  };

  return (
    <main className="max-w-md p-5 font-sans">
      <h2 className="text-xl font-semibold mb-4">Sneakers catalog</h2>

      {errorMessage && (
        <div className="text-red-600 p-2.5 border border-red-600 mb-4 rounded bg-red-50">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-2.5 text-black">
        {optimisticSneakers.map((sneaker) => (
          <div
            key={sneaker.id}
            className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-white"
          >
            <span>{sneaker.title}</span>
            <button
              onClick={() => handleToggleFavorite(sneaker.id)}
              className="text-lg text-blue-900 font-bold bg-none border-none cursor-pointer outline-none"
            >
              {sneaker.isFavorite ? "Remove" : "Add"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
