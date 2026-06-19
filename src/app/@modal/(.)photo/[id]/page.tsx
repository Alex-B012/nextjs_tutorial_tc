import { CARS } from "@/app/page";
import CloseButton from "./CloseButton";

interface PhotoModalProps {
  params: Promise<{ id: string }>;
}

// 1:52:38

export default async function PhotoModal({ params }: PhotoModalProps) {
  const { id } = await params;
  const car = CARS.find((c) => c.id === id);

  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 p-12 rounded-4xl border border-zinc-800 max-w-lg w-full shadow-2xl">
        <span className="text-blue-500 text-[10px] font-bold uppercase  tracking-widest block mb-2">
          Intercepted
        </span>
        <h2 className="text-5xl font-black text-white uppercase italic mb-6">
          {car.name}
        </h2>
        <p className="text-zinc-500 mb-8">
          This content was intercepted. It is displayed in a modal, but the path
          is /photo/{id}.
        </p>
        <div className="w-full flex justify-center">
          <CloseButton />
        </div>
      </div>
    </div>
  );
}
