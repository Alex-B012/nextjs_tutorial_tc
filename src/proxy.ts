import { NextRequest, NextResponse } from "next/server";

const STORE = "/store";

export default function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-pathname", url.pathname);

  if (url.pathname.startsWith("/dashboard")) {
    const targetUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(targetUrl);
  }

  if (url.pathname === `${STORE}/legacy`) {
    const targetUrl = new URL(`${STORE}/modern`, request.url);
    return NextResponse.rewrite(targetUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("x-proxy-handled", "true");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
