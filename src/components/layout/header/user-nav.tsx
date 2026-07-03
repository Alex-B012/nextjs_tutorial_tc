import { authClient } from "@/lib/tools/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserNav() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending)
    return <div className="h-6 w-20 animate-pulse bg-muted/20 rounded" />;

  if (!session?.user)
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-semibold uppercase text-muted hover:text-foreground tracking-wider transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="text-sm font-semibold uppercase text-muted hover:text-foreground tracking-wider transition-colors"
        >
          Create account
        </Link>
      </div>
    );

  const { user } = session;

  const handleSignOut = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });

  //   const initials = user.username?.slice(0, 1).toUpperCase();

  return (
    <DropdownMeny>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-semibold uppercase text-muted hover:text-primary focus:outline-none tracking-wider cursor-pointer transition-colors max-w-50 truncate">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={user.image || undefined}
              alt={user.username || "No name"}
            />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <span className="truncate">{user.username}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sideOffset={15}>
        <DropdownMenuItem asChild>
          <Link href={`/${user.username}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${user.username}/films`}>Films</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${user.username}/diary`}>Diary</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${user.username}/watchlist`}>Watchlist</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${user.username}/likes`}>Favorite</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMeny>
  );
}
