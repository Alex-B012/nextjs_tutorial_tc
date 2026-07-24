import { FilmCard } from "@/components/shared/film-card";
import { SectionHeader } from "@/components/shared/section-header";
import { LatestDiaryItem } from "@/server/types/diary";
import { DiscoverFilmItem } from "@/server/types/film";
import { Section } from "lucide-react";
import Link from "next/link";

interface Props {
  username: string;
  activities: LatestDiaryItem[];
  popularFilms: DiscoverFilmItem[];
}

export function HomeDashboard({ username, activities, popularFilms }: Props) {
  const brandName = companyProfile.name;

  return (
    <div className="max-w-275 mx-auto px-4 pt-30 relative z-20">
      <div className="text-center pb-10">
        <h1 className="text-3xl text-muted leading-tight">
          Welcome,
          <Link
            href={`/${username}`}
            className="text-foreground border-b-2 border-muted pb-0.5 hover:border-foreground cursor-pointer transition"
          >
            {username}
          </Link>
          . Trending in our community today...
        </h1>
        <p className="text-sm text-muted-foreground mt-4 tracking-wide font-normal max-w-2xl mx-auto leading-relaxed">
          Explore the {brandName} community feed, featuring everything from
          iconic classics to forgotten masterpieces.
        </p>
      </div>
      <section className="mb-12">
        <SectionHeader title={`New on ${brandName}`} />

        <div className="grid grid-cols-6 gap-3">
          {activities.map((activity, index) => (
            <FilmCard
              key={index}
              film={activity.film}
              user={activity.user}
              rating={activity.rating}
              watchedAt={activity.watchedAt}
              variant={"activity"}
              priority
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader
          title={`Popular this week`}
          href={"/films"}
          rightLabel="Bigger"
        />

        <div className="grid grid-cols-6 gap-3">
          {popularFilms.map((film) => (
            <FilmCard
              key={film.id}
              film={{
                id: film.id,
                title: film.title,
                slug: film.slug,
                posterUrl: film.posterUrl!,
              }}
              variant={"poster"}
              priority
            />
          ))}
        </div>
      </section>
    </div>
  );
}
