"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-16 bg-[#fbfbfa] text-[#191919] dark:bg-[#121212] dark:text-[#ececec]">
      <section className="w-full max-w-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] p-8 text-center rounded-lg">
        <h1 className="text-2xl font-bold">Access denied</h1>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          NoteShaala is available only to users with an official NIT Jamshedpur email address.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <LogoutLink>
            <span className="inline-flex px-4 py-2 text-sm font-medium border border-neutral-300 dark:border-neutral-700 rounded-md cursor-pointer">
              Sign out
            </span>
          </LogoutLink>
          <Link
            href="/"
            className="inline-flex px-4 py-2 text-sm font-medium bg-[#191919] text-white dark:bg-white dark:text-neutral-900 rounded-md"
          >
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
