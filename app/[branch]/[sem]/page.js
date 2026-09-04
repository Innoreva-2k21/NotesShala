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

  const showToast = useShowToast();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const deptInfo = branchMetadata[branchCode] || {
    fullName: `${branchCode} Department`,
    icon: "📚",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/notes/${branchCode}/${semester}`);
        const data = await res.json();

        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }

        if (Array.isArray(data)) {
          const subjectList = data
            .map((item) => item.subject)
            .filter((sub) => sub && typeof sub === 'string');
          const uniqueSubjects = Array.from(new Set(subjectList));
          setSubjects(uniqueSubjects);
        } else {
          setSubjects([]);
        }
      } catch (error) {
        showToast('Error', 'Unable to fetch course subjects. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [branchCode, semester]);

  const filteredSubjects = subjects.filter((sub) =>
    sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#notes" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Departments
          </Link>
          <span>/</span>
          <Link href={`/${branchCode}`} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {branchCode}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold bg-neutral-200/70 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
            Semester {semester}
          </span>
        </div>

        {/* Semester Header Banner */}
        <div className="w-full bg-white dark:bg-[#1b1b1b] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-6 sm:p-10 lg:p-12 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              <span className="text-base">{deptInfo.icon}</span>
              <span>{branchCode}</span>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <span>Semester 0{semester}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              Course Subjects &amp; PYQs
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Explore subject lecture notes, unit summaries, and exam papers for {deptInfo.fullName} (Semester {semester}).
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
            <Link
              href="/uploadnotes"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-md transition-all hover:scale-[1.02]"
            >
              <span>+ Upload Notes for Sem {semester}</span>
            </Link>

            <Link
              href={`/${branchCode}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <span>&larr; Switch Semester</span>
            </Link>
          </div>
        </div>

        {/* Subject Search Bar & Counters */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Available Subjects
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              {subjects.length} {subjects.length === 1 ? 'subject' : 'subjects'} indexed in Semester {semester}
            </p>
          </div>

          <div className="relative min-w-[280px] sm:min-w-[360px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subject or PYQ..."
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
        </div>

        {/* Subjects Bento Grid */}
        <div className="w-full">
          {loading ? (
            /* Skeleton Loading Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  className="p-7 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] animate-pulse space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
                  <div className="space-y-2">
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md w-3/4" />
                    <div className="h-3 bg-neutral-100 dark:bg-neutral-800/60 rounded-md w-1/2" />
                  </div>
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 h-4 bg-neutral-100 dark:bg-neutral-800/60 rounded-md w-1/3" />
                </div>
              ))}
            </div>
          ) : filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {filteredSubjects.map((subName, i) => {
                const isPYQ = subName.toUpperCase().includes('PYQ') || subName.toLowerCase().includes('question');
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group w-full"
                  >
                    <Link
                      href={`/${branchCode}/${semester}/${encodeURIComponent(subName)}`}
                      className="block h-full p-7 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform ${
                            isPYQ
                              ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-600'
                              : 'bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800 text-sky-600'
                          }`}>
                            {isPYQ ? '📝' : '📖'}
                          </div>
                          <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-lg border ${
                            isPYQ
                              ? 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800'
                              : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
                          }`}>
                            {isPYQ ? 'Solved PYQs' : 'Core Subject'}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-white line-clamp-2">
                            {subName}
                          </h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                            {branchCode} • Sem {semester}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                        <span>Browse Documents &amp; PDFs</span>
                        <span className="group-hover:translate-x-1 transition-transform text-sm">&rarr;</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 px-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] w-full max-w-3xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-3xl mx-auto">
                📂
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {searchQuery ? `No subjects match "${searchQuery}"` : `No notes uploaded yet for Semester ${semester}`}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                  {searchQuery
                    ? 'Try clearing the search query or checking another semester.'
                    : 'Be the first contributor! Share your handwritten notes or PYQs to help fellow classmates.'}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/uploadnotes"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>+ Upload Notes for this Semester</span>
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
