import { NextResponse } from "next/server";
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

const NIT_JAMSHEDPUR_DOMAIN = "nitjsr.ac.in";

function hasNITJamshedpurEmail(email) {
  if (typeof email !== "string") {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const [localPart, domain, ...extraParts] = normalizedEmail.split("@");

  return Boolean(localPart) && extraParts.length === 0 && domain === NIT_JAMSHEDPUR_DOMAIN;
}

export default withAuth(
  async function middleware(request) {
    if (!hasNITJamshedpurEmail(request.kindeAuth?.user?.email)) {
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }

    if (request.nextUrl.pathname === "/auth/complete") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  },
  {
    publicPaths: ["/", "/members", "/testimonials", "/access-denied"],
  }
);

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
