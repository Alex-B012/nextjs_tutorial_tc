import { HeroBanner } from "@/components/hero-banner";

async function getGithubProfile() {
  const res = await fetch("https://api.github.com/repos/vercel/ai", {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch github profile");
  return res.json();
}

export default async function Home() {
  const data = await getGithubProfile();

  return (
    <main className="p-10 bg-black text-white min-h-screen">
      <h2>Name: {data.name}</h2>
      <p>Owner: {data.owner.login}</p>
      <p>Stars: {data.stargazers_count}</p>
      <p>Forks: {data.forks_count}</p>
      <div className="mt-10">{/* <HeroBanner /> */}</div>
    </main>
  );
}
