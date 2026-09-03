"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useShowToast from '@/hooks/useShowToast';
import { motion } from 'framer-motion';

const branchMetadata = {
  CSE: { fullName: "Computer Science & Engineering", icon: "💻" },
  ECE: { fullName: "Electronics & Communication Engineering", icon: "📡" },
  EE: { fullName: "Electrical Engineering", icon: "⚡" },
  ME: { fullName: "Mechanical Engineering", icon: "⚙️" },
  CE: { fullName: "Civil Engineering", icon: "🏗️" },
  MME: { fullName: "Metallurgical & Materials Engineering", icon: "🔬" },
  PIE: { fullName: "Production & Industrial Engineering", icon: "🏭" },
  ECM: { fullName: "Engineering & Computational Mechanics", icon: "📐" },
};

const Page = () => {
  const params = useParams();
  const rawBranch = params?.branch || 'CSE';
  const branchCode = String(rawBranch).toUpperCase();
  const semester = params?.sem || '1';
  const rawSubject = params?.sub || '';
  const subjectName = decodeURIComponent(String(rawSubject));

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const showToast = useShowToast();

  const isPYQ = subjectName.toUpperCase().includes('PYQ') || subjectName.toLowerCase().includes('question');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://noteshaala.onrender.com/api/notes/${branchCode}/${semester}/${encodeURIComponent(subjectName)}`
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setNotes(data);
        } else if (data.error) {
          showToast('Error', data.error, 'error');
          setNotes([]);
        } else {
          setNotes([]);
        }
      } catch (error) {
        showToast('Error', 'Unable to fetch documents. Please try again.', 'error');
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [branchCode, semester, subjectName]);

  const filteredNotes = notes.filter((item) => {
    const name = item.fileName || item.subject || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen w-full pt-24 pb-16 bg-[#fbfbfa] dark:bg-[#121212] text-neutral-900 dark:text-[#ececec] transition-colors overflow-x-hidden">
      {/* Background Decorative Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#d4d4d4 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full px-4 sm:px-8 lg:px-14 xl:px-20 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${branchCode}`} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {branchCode}
          </Link>
          <span>/</span>
          <Link href={`/${branchCode}/${semester}`} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Sem {semester}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold bg-neutral-200/70 dark:bg-neutral-800 px-2.5 py-1 rounded-md truncate max-w-[240px]">
            {subjectName}
          </span>
        </div>

        {/* Subject Header Banner */}
        <div className="w-full bg-white dark:bg-[#1b1b1b] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-6 sm:p-10 lg:p-12 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              <span>{isPYQ ? '📝' : '📖'}</span>
              <span>{branchCode}</span>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <span>Sem {semester}</span>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <span>{isPYQ ? 'Exam PYQ' : 'Subject Files'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              {subjectName}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Download or view high quality lecture PDFs, student revision guides, and solved question papers.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
            <Link
              href="/uploadnotes"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-md transition-all hover:scale-[1.02]"
            >
              <span>+ Upload New PDF</span>
            </Link>

            <Link
              href={`/${branchCode}/${semester}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <span>&larr; All Subjects in Sem {semester}</span>
            </Link>
          </div>
        </div>

        {/* Search & File Counter Bar */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Available Files &amp; Notes
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              {notes.length} {notes.length === 1 ? 'file' : 'files'} uploaded for this course
            </p>
          </div>

          {notes.length > 0 && (
            <div className="relative min-w-[280px] sm:min-w-[360px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by filename..."
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/80 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition shadow-2xs"
              />
              <svg
                className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Files Grid */}
        <div className="w-full">
          {loading ? (
            /* Skeleton Loading Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  className="p-7 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] animate-pulse space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-200 dark:bg-neutral-800 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
                      <div className="h-3 bg-neutral-100 dark:bg-neutral-800/60 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 h-9 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl" />
                </div>
              ))}
            </div>
          ) : filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {filteredNotes.map((item, i) => (
                <motion.div
                  key={item._id || i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-7 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-300 flex flex-col justify-between group w-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                        📄
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-lg">
                        PDF Note
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight break-words line-clamp-2">
                        {item.fileName || subjectName}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                        {item.postedBy ? `Uploaded by ${item.postedBy.split('@')[0]}` : 'Verified Upload'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all text-center flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>Open &amp; Read</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    <a
                      href={item.file}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      title="Download File"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 px-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] w-full max-w-3xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-3xl mx-auto">
                📑
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {searchQuery ? `No files match "${searchQuery}"` : `No PDF notes uploaded yet for ${subjectName}`}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                  {searchQuery
                    ? 'Try adjusting your search query.'
                    : 'Be the first to upload notes for this subject and help your batchmates prepare for exams.'}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/uploadnotes"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>+ Upload Notes for {subjectName}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
