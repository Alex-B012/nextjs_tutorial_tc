import { pgTable, primaryKey, text, varchar } from "drizzle-orm/pg-core";
import { films } from "./films";
import { relations } from "drizzle-orm";

export const genres = pgTable("genres", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
});

export const filmsToGenres = pgTable(
  "films_to_genres",
  {
    filmId: text("film_id")
      .notNull()
      .references(() => films.id, { onDelete: "cascade" }),
    genreId: text("genre_id")
      .notNull()
      .references(() => genres.id, { onDelete: "cascade" }),
  },
  (t) => ({ pk: primaryKey({ columns: [t.filmId, t.genreId] }) }),
);

export const genresRelations = relations(genres, ({ many }) => ({
  films: many(filmsToGenres),
}));

export const filmsToGenresRelations = relations(filmsToGenres, ({ one }) => ({
  films: one(films, {
    fields: [filmsToGenres.filmId],
    references: [films.id],
  }),
  genre: one(genres, {
    fields: [filmsToGenres.genreId],
    references: [genres.id],
  }),
}));
