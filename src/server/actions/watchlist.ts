"use server";

import { actionClient } from "@/lib/tools/safe-action";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { toggleWatchlistSchema } from "../schemas/watchlist";
import { revalidatePath } from "next/cache";
import type { ToggleWatchlistResponse } from "../types/watchlist";

export const toggleWatchlistAction = actionClient
  .inputSchema(toggleWatchlistSchema)
  .action(async ({ parsedInput }): Promise<ToogleWatchlistResponse> => {
    const { filmId, userId, filmSlug } = parsedInput;

    const existingRecord = await db.query.watchlist.findFirst({
      where: and(
        eq(schema.watchlist.userId, userId),
        eq(schema.watchlist.filmId, filmId),
      ),
    });

    let isAdded = false;

    if (existingRecord) {
      await db
        .delete(schema.watchlist)
        .where(
          and(
            eq(schema.watchlist.userId, userId),
            eq(schema.watchlist.filmId, filmId),
          ),
        );
    } else {
      await db.insert(schema.watchlist).values({ userId, filmId });
      isAdded = true;
    }

    revalidatePath(`/film/${filmSlug}`);

    return { isAdded };
  });
