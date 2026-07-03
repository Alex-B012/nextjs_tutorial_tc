import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [usernameClient()],
});
