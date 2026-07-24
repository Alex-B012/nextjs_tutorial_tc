import {
  getUserByUsernameAction,
  getUserStatsAction,
} from "@/server/actions/user";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ReactNode } from "react";
import { Container } from "@/components/shared/container";

interface Props {
  children: ReactNode;
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  const userResult = await getUserByUsernameAction({ username });
  const user = userResult.data;

  if (!user) return { title: "User not found" };

  const title = `${user.name} (@${user.username})`;
  const description = `Explore a diary of movie watches and reviews`;

  const company = companyProfile.name;
  const url = `https//${company}.com/${user.username}`;

  const images = [
    {
      url: user.avatar ?? `/default-avatar.png`,
      width: 800,
      height: 800,
      alt: `${user.name} avatar`,
    },
  ];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images,
      type: "profile",
      username: user.username,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images,
    },
    alternates: {
      canonical: `https://${company}.com/${user.username}`,
    },
  };
}

export default async function ProfileLayout({ children, params }: Props) {
  const { username } = await params;

  const [userResult, statsResult] = await Promise.all([
    getUserByUsernameAction({ username }),
    getUserStatsAction({ username }),
  ]);

  const user = userResult.data;
  const stats = statsResult.data;

  if (!user) notFound();

  return (
    <Container className="flex flex-col gap-8 py-16">
      <ProfileHeader user={user} stats={stats} />

      <section className="animate-in fade-in duration-500">{children}</section>
    </Container>
  );
}
