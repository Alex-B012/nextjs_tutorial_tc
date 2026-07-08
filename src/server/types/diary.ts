import { DiaryEntity, FilmEntity, UserEntity } from "../db/types";

export interface UserDiaryItem {
  id: string;
  watchedAt: DiaryEntity["watchedAtDate"];
  isRewatch: boolean;
  user: Pick<UserEntity, "id" | "name" | "username" | "avatar">;
  film: Pick<FilmEntity, "id" | "title" | "posterUrl" | "slug">;
  rating: number;
  isLinked: boolean;
  hasReview: boolean;
}

export interface LatestDiaryItem {
  id: string;
  watchedAt: DiaryEntity["watchedAtDate"];
  isRewatch: DiaryEntity["isRewatch"];
  user: Pick<UserEntity, "id" | "name" | "username" | "avatar">;
  film: Pick<FilmEntity, "id" | "title" | "posterUrl" | "slug">;
  rating: number;
  hasReview: boolean;
}

export interface LogFilmResponse {
  success: boolean;
}
