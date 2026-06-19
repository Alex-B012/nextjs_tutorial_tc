import { CARS } from "@/app/page";
import { notFound } from "next/navigation";

interface PhotoPageProps {
  params: Promise<{ id: string }>;
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params;
  const car = CARS.find((c) => c.id === id);

  if (!car) return notFound();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <h1 className="text-5xl font-black uppercase italic"> {car.name}</h1>
      <p className="p-10">Car ID: {car.id}</p>
    </main>
  );
}
