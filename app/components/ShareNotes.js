"use client";
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import useShowToast from '@/hooks/useShowToast';

const ShareNotes = () => {
  const { isAuthenticated } = useKindeBrowserClient();
  const showToast = useShowToast();

  const handleUnauthClick = () => {
    showToast('Authentication Required', 'Please sign in or register to upload notes.', 'error');
  };

  return (
    <section className="py-10 sm:py-14 bg-white dark:bg-[#121212] border-t border-neutral-200/70 dark:border-neutral-800 transition-colors w-full overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20">
        {/* Full-width Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-[#fbfbfa] dark:bg-[#1b1b1b] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-xs"
        >
          {/* Subtle background decoration */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10"
            style={{
              backgroundImage: 'radial-gradient(#d4d4d4 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: CTA & Mission */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                <span>✦ Community Contribution</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
                Help your batchmates &amp; juniors. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400">
                  Share your study notes.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl">
                Upload your lecture summaries, handwritten formula sheets, lab guides, or previous year question papers. Every single upload empowers hundreds of students across college.
              </p>

              {/* Action Buttons & Status Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {isAuthenticated ? (
                  <Link
                    href="/uploadnotes"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 font-medium text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <span>Upload Notes</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </Link>
                ) : (
                  <button
                    onClick={handleUnauthClick}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 font-medium text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <span>Upload Notes</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </button>
                )}

                <Link
                  href="/usernotes"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium text-sm sm:text-base hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  <span>My Uploads</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              {/* Upload Specifications */}
              <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span className="bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 px-2.5 py-1 rounded-md">
                  📄 PDF, JPG, PNG Supported
                </span>
                <span className="bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 px-2.5 py-1 rounded-md">
                  ⚡ Max Size: 40 MB
                </span>
                <span className="bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 px-2.5 py-1 rounded-md">
                  🔒 Open Access
                </span>
              </div>
            </div>

            {/* Right Column: 3-Step Notion Process Cards */}
            <div className="lg:col-span-5 space-y-3.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                How It Works in 3 Steps
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#222222] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-start gap-4 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-sm font-bold text-neutral-800 dark:text-neutral-200 shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                    Select Branch &amp; Semester
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Choose your engineering department, semester (1–8), and subject name with instant autocomplete.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#222222] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-start gap-4 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-sm font-bold text-neutral-800 dark:text-neutral-200 shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                    Attach Your File or PYQ
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Upload your high quality PDF or image scan. For past year papers, simply tag them with PYQ.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#222222] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-start gap-4 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-sm font-bold text-neutral-800 dark:text-neutral-200 shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                    Instant Access for Campus
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Your notes are immediately categorized and available for batchmates and juniors to study from.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShareNotes;


