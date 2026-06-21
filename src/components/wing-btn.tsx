"use client";

export function WinkBtn({ name }: { name: string }) {
  return (
    <button
      onClick={() => alert(`You winked to ${name}!`)}
      className="ml-4 cursor-pointer"
    >
      Wink
    </button>
  );
}
