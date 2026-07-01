import Image from "next/image";
import heroWallpaper from "@/assets/images/hero.jpg";

export function HeroBanner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Image
        src={heroWallpaper}
        alt="Hero Banner"
        fill
        className="object-cover fixed"
      />
    </div>
  );
}
