import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import * as jose from "jose";

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Bypass authentication for Puppeteer-specific routes
  if (
    pathname.startsWith("/hidden-dashboard") ||
    pathname.startsWith("/hidden-invoice")
  ) {
    const token = request.headers.get("Authorization");

    // Check with auth0 that the token provided is valid with jose
    const jwks = jose.createRemoteJWKSet(new URL(process.env.AUTH0_JWKS_URI));

    try {
      // Verify the given token
      await jose.jwtVerify(token.replace("Bearer ", ""), jwks);
      return NextResponse.next();
    } catch (e) {
      const url = request.nextUrl;
      url.pathname = `/404`;
      return NextResponse.rewrite(url);
    }
  }

  // Apply Auth0 middleware for all other routes
  return withMiddlewareAuthRequired()(request);
}
