import {
  doublePrecision,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { persons } from "./persons";
import { filmsToGenres } from "./genre";
import { relations } from "drizzle-orm";

export const films = pgTable("films", {
  id: text("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  originalTitle: text("original_title"),
  alternativeTitles: jsonb("alternative_titles").$type<string[]>(),
  country: varchar("country"),
  year: integer("year"),
  duration: integer("duration"),
  description: text("description"),
  rating: doublePrecision("rating").default(0),
  posterUrl: text("poster_url"),
  bannerUrl: text("banner_url"),
  trailerUrl: text("trailer_url"),
  tmdbLink: text("tmdb_link"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const movieCast = pgTable(
  "movie_cast",
  {
    filmId: text("film_id")
      .notNull()
      .references(() => films.id, { onDelete: "cascade" }),
    personId: text("person_id")
      .notNull()
      .references(() => persons.id, { onDelete: "cascade" }),
    characterName: text("character_name"),
    order: integer("order").default(0),
  },
  (t) => ({ pk: primaryKey({ columns: [t.filmId, t.personId] }) }),
);

export const movieCrew = pgTable(
  "movie_crew",
  {
    filmId: text("film_id")
      .notNull()
      .references(() => films.id, { onDelete: "cascade" }),
    personId: text("person_id")
      .notNull()
      .references(() => persons.id, { onDelete: "cascade" }),
    job: text("job").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.filmId, t.personId, t.job] }) }),
);

export const filmsRelations = relations(films, ({ many }) => ({
  cast: many(movieCast),
  crew: many(movieCrew),
  genres: many(filmsToGenres),
}));
