"use server";

import { actionClient } from "@/lib/tools/safe-action";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { and, asc, avg, count, desc, eq, gte, ilike, sql } from "drizzle-orm";
import { discoverySchema, getFilmBySlugSchema } from "../schemas/film";
import { DiscoverFilmsResponse, FilmDetails } from "../types/film";

export const discoverFilmAction = actionClient
  .inputSchema(discoverySchema)
  .action(async ({ parsedInput }): Promise<DiscoverFilmsResponse> => {
    const {
      search,
      genre,
      year,
      sortBy,
      sortOrder,
      period,
      limit,
      cursor,
      username,
      filterType,
    } = parsedInput;

    const whereConditions = [];

    if (search) whereConditions.push(ilike(schema.films.title, `%${search}`));
    if (year) whereConditions.push(eq(schema.films.year, year));

    if (genre)
      whereConditions.push(sql`EXIST (
                SELECT 1 FROM ${schema.filmsToGenres} ftg 
                JOIN ${schema.genres} g ON g.id = ftg.genre_id
                WHERE ftg.film_id = ${schema.films.id} AND g.slug = ${genre})`);

    if (username && filterType) {
      const user = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.username, username),
        columns: { id: true },
      });

      if (!user) return { item: [], nextCursor: null };

      if (filterType === "watchlist") {
        whereConditions.push(sql`EXISTS(
                SELECT 1 FROM ${schema.watchlist} wl
                WHERE wl.film_id = ${schema.films.id} AND wl.user_id = ${user.id}
        )`);
      } else if (filterType === "liked") {
        whereConditions.push(sql`EXISTS (
                SELECT 1
                FROM ${schema.diary} d
                JOIN ${schema.reviews} r ON r.id = d.review_id
                WHERE d.film_id = ${schema.films.id}
                        AND d.user_id = ${user.id}
                        AND r.is_linked = true
        )`);
      } else if (filterType === "watched") {
        whereConditions.push(sql`EXISTS (
                SELECT DISTINCT 1 FROM ${schema.diary} d
                WHERE d.film_id = ${schema.films.id} AND d.user_id = ${user.id}
        )`);
      }
    }

    const now = new Date();
    let periodDate: Date | null = null;

    if (period === "week")
      periodDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    if (period === "year") periodDate = new Date(now.getFullYear(), 0, 1);

    const diaryCount = db
      .select({
        filmId: schema.diary.filmId,
        count: count().as("view_count"),
      })
      .from(schema.diary)
      .where(periodDate ? gte(schema.diary.createdAt, periodDate) : undefined)
      .groupBy(schema.diary.filmId)
      .as("diary_metrics");

    const watchlistCount = db
      .select({
        filmId: schema.watchlist.filmId,
        count: count().as("watchlist_count"),
      })
      .from(schema.watchlist)
      .where(periodDate ? gte(schema.watchlist.addedAt, periodDate) : undefined)
      .groupBy(schema.watchlist.filmId)
      .as("watchlist_metrics");

    const query = db
      .select({
        id: schema.films.id,
        title: schema.films.title,
        slug: schema.films.slug,
        posterUrl: schema.films.posterUrl,
        bannerUrl: schema.films.bannerUrl,
        year: schema.films.year,
        rating: schema.films.rating,
        duration: schema.films.duration,
        popularityScore: sql<number>`(
                COALESCE(${schema.films.rating}, 0) * 10 + 
                COALESCE(${diaryCount}, 0) * 5 + 
                COALESCE(${watchlistCount.count}, 0) * 3
        )`.as("popularity_score"),
      })
      .from(schema.films)
      .leftJoin(diaryCount, eq(schema.films.id, diaryCount.filmId))
      .leftJoin(watchlistCount, eq(schema.films.id, watchlistCount.filmId))
      .where(and(...whereConditions))
      .groupBy(schema.films.id, diaryCount.count, watchlistCount.count);

    const orderMap = {
      rating:
        sortBy === "rating"
          ? sortOrder === "desc"
            ? desc(schema.films.rating)
            : asc(schema.films.rating)
          : null,
      releaseDate:
        sortBy === "releaseDate"
          ? sortOrder === "desc"
            ? desc(schema.films.year)
            : asc(schema.films.year)
          : null,

      duration:
        sortBy === "duration"
          ? sortOrder === "desc"
            ? desc(schema.films.duration)
            : asc(schema.films.duration)
          : null,
      popularity: desc(sql`popularity_score`),
    };

    const result = await query
      .orderBy(orderMap[sortBy] || orderMap.popularity)
      .limit(limit)
      .offset(cursor);

    return {
      items: result,
      nextCursor: result.length === limit ? cursor + limit : null,
    };
  });

export const getFilmBySlugAction = actionClient
  .inputSchema(getFilmBySlugSchema)
  .action(async({}));

// 9:22:45
