import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

// export default withMiddlewareAuthRequired(async function middleware(request) {
//   return NextResponse.next();
// });

export default async function middleware(request) {
  return NextResponse.next();
}
