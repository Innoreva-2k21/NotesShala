"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const current_year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#151515] py-8 sm:py-10 text-sm text-neutral-500 dark:text-neutral-400 transition-colors w-full">
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          {/* Brand & info */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 flex items-center justify-center">
              <Image
                src="/NoteShaala_Logo.png"
                alt="NoteShaala Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-neutral-900 dark:text-white tracking-tight">NoteShaala</span>
              <span className="mx-2 text-neutral-300 dark:text-neutral-700">•</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Open Study Resources for College</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <Link href="/#notes" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Notes
            </Link>
            <Link href="/#testimonials" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Reviews
            </Link>
            <Link href="/uploadnotes" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Upload
            </Link>
            <Link href="/#contacts" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/members" className="text-neutral-900 dark:text-white hover:underline font-semibold transition-colors">
              Team Credits &rarr;
            </Link>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
          <p>© {current_year} NoteShaala. Maintained by Innoreva Web Team, NIT Jamshedpur.</p>
          <p className="font-mono text-[11px]">#share_notes #share_knowledge</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

