"use server";

import { actionClient } from "@/lib/tools/safe-action";
import { db } from "@/server/db";
import { diary } from "../db/schema";
import { and, eq, gte, sql } from "drizzle-orm";
import { getUserByStatsSchema, getUserByUsernameSchema } from "../schema/user";
import type { PublicUser, UserStatsResponse } from "../types/user";

export const getUserByUsernameAction = actionClient
  .inputSchema(getUserByUsernameAction)
  .action(async ({ parsedInput: { username } }): Promise<PublicUser | null> => {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
      columns: {
        is: true,
        name: true,
        username: true,
        avatar: true,
      },
    });

    return user ?? null;
  });

export const getUserStatsAction = actionClient
  .inputSchema(getUserByStatsSchema)
  .action(
    async ({
      parsedInput: { username },
    }): Promise<UserStatsResponse | null> => {
      const user = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.username, username),
        columns: { id: true },
      });

      if (!user) return null;

      const [totalFilms, yearFilms, weekFilms] = await Promise.all([
        db
          .select({ count: sql`count(distinct ${diary.filmId})` })
          .from(diary)
          .where(eq(diary.userId, user.id)),
        db
          .select({ count: sql`count(distint ${diary.filmId})` })
          .from(diary)
          .where(
            and(
              eq(diary.userId, user.id),
              sql`${diary.watchedAtDate} >= data_trunc('year', now())`,
            ),
          ),

        db
          .select({ count: sql`count(distinct ${diary.filmId})` })
          .from(diary)
          .where(
            and(
              eq(diary.userId, user.id),
              sql`${diary.watchedAtDate} >= data_trunc("week", now())`,
            ),
          ),
      ]);

      return {
        total: Number(totalFilms[0].count),
        year: Number(yearFilms[0].count),
        week: Number(weekFilms[0].count),
      };
    },
  );
