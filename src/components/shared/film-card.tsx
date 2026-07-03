import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";

interface Props {
  film: {
    id: string;
    title: string;
    slug: string;
    posterUrl: string | null;
  };
  variant?: "poster" | "activity";
  rating?: number | null;
  watchedAt?: string;
  user?: {
    id: string;
    name: string;
    username: string | null;
    avatar: string | null;
  };
  priority?: boolean;
  className?: string;
}

export function FilmCard({
  film,
  variant = "poster",
  rating,
  watchedAt,
  user,
  priority = false,
  className,
}: Props) {
  const isActivity = variant === "activity";
  const formattedDate = watchedAt
    ? new Date(watchedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className={cn("film-card w-full group flex flex-col", className)}>
      <Link
        href={isActivity ? `/${user?.username}` : `/film/${film.slug}`}
        className={cn(
          "realative flex flex-col rounded-md overflow-hidden border-2 border-[#2c3440] transition-all duration-100 shadow-md bg-[#2c3440]",
          "group-hover: border-primary",
        )}
      >
        <div className="relative w-full aspect-2/3">
          <Image
            src={film.posterUrl!}
            alt={film.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
            className="object-cover"
          ></Image>
        </div>

        {isActivity && user && (
          <div className="flex items-center gap-2 p-2 bg-[#2c3440] border-t border-white/5">
            <Avatar className="size-5 border border-white/10">
              <AvatarImage src={user.avatar ?? ""} />
              <AvatarFallback className="text-[8px]">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-[11px] text-[#9ab] font-medium group-hover:text-white truncate">
              {user.name}
            </span>
          </div>
        )}
      </Link>

      {isActivity && (
        <div className="flex items-center justify-between mt-1.5 px-0.5">
          <StarRating value={rating!} isReadonly size="sm" />
          {formattedDate && (
            <span className="text-[10px] text-[#678] font-medium uppercase tracking-wider">
              {formattedDate}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
