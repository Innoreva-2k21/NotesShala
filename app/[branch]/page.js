"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

const branchMetadata = {
  CSE: {
    fullName: "Computer Science & Engineering",
    icon: "💻",
    description: "Algorithms, Systems, AI/ML, Networks, and Core Software Engineering.",
    years: ["1st Year", "1st Year", "2nd Year", "2nd Year", "3rd Year", "3rd Year", "4th Year", "4th Year"],
    terms: ["Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem"],
  },
  ECE: {
    fullName: "Electronics & Communication Engineering",
    icon: "📡",
    description: "Digital Electronics, Signal Processing, Communication, and VLSI.",
    years: ["1st Year", "1st Year", "2nd Year", "2nd Year", "3rd Year", "3rd Year", "4th Year", "4th Year"],
    terms: ["Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem"],
  },
  EE: {
    fullName: "Electrical Engineering",
    icon: "⚡",
    description: "Circuits, Power Systems, Electrical Machines, and Control Systems.",
    years: ["1st Year", "1st Year", "2nd Year", "2nd Year", "3rd Year", "3rd Year", "4th Year", "4th Year"],
    terms: ["Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem"],
  },
  ME: {
    fullName: "Mechanical Engineering",
    icon: "⚙️",
    description: "Thermodynamics, Fluid Mechanics, Manufacturing, and Machine Design.",
    years: ["1st Year", "1st Year", "2nd Year", "2nd Year", "3rd Year", "3rd Year", "4th Year", "4th Year"],
    terms: ["Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem"],
  },
  CE: {
    fullName: "Civil Engineering",
    icon: "🏗️",
    description: "Structural Analysis, Geotechnical, Surveying, and Environmental Engg.",
    years: ["1st Year", "1st Year", "2nd Year", "2nd Year", "3rd Year", "3rd Year", "4th Year", "4th Year"],
    terms: ["Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem"],
  },
  MME: {
    fullName: "Metallurgical & Materials Engineering",
    icon: "🔬",
    description: "Physical Metallurgy, Material Characterization, and Thermodynamics.",
    years: ["1st Year", "1st Year", "2nd Year", "2nd Year", "3rd Year", "3rd Year", "4th Year", "4th Year"],
    terms: ["Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem"],
  },
  PIE: {
    fullName: "Production & Industrial Engineering",
    icon: "🏭",
    description: "Operations Research, Supply Chain, CAD/CAM, and Industrial Management.",
    years: ["1st Year", "1st Year", "2nd Year", "2nd Year", "3rd Year", "3rd Year", "4th Year", "4th Year"],
    terms: ["Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem"],
  },
  ECM: {
    fullName: "Engineering & Computational Mechanics",
    icon: "📐",
    description: "Finite Element Methods, Solid Mechanics, Dynamics, and Modeling.",
    years: ["1st Year", "1st Year", "2nd Year", "2nd Year", "3rd Year", "3rd Year", "4th Year", "4th Year"],
    terms: ["Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem", "Odd Sem", "Even Sem"],
  },
};

const allBranches = ['CSE', 'ECE', 'EE', 'ME', 'CE', 'MME', 'PIE', 'ECM'];

const Page = () => {
  const params = useParams();
  const rawBranch = params?.branch || 'CSE';
  const branchCode = String(rawBranch).toUpperCase();
  const info = branchMetadata[branchCode] || {
    fullName: `${branchCode} Department`,
    icon: "📚",
    description: "Curated semester course notes, lab manuals, and previous year questions.",
    years: Array(8).fill("B.Tech"),
    terms: Array(8).fill("Semester"),
  };

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
          <span className="text-neutral-900 dark:text-white font-semibold bg-neutral-200/70 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
            {branchCode}
          </span>
        </div>

        {/* Branch Header Banner */}
        <div className="w-full bg-white dark:bg-[#1b1b1b] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-6 sm:p-10 lg:p-12 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              <span className="text-base">{info.icon}</span>
              <span>Engineering Department</span>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <span>{branchCode}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              {info.fullName}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {info.description}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
            <Link
              href="/uploadnotes"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-md transition-all hover:scale-[1.02]"
            >
              <span>+ Upload Notes</span>
            </Link>
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/70 dark:border-neutral-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>8 Semesters Available</span>
            </div>
          </div>
        </div>

        {/* Horizontal Quick Branch Switcher */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <span>Switch Engineering Department</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {allBranches.map((code) => {
              const isSelected = code === branchCode;
              return (
                <Link
                  key={code}
                  href={`/${code}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#191919] dark:bg-white text-white dark:text-neutral-900 shadow-xs scale-105'
                      : 'bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <span>{branchMetadata[code]?.icon}</span>
                  <span>{code}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 8-Semester Notion Bento Grid */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Select Semester
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              Semesters 1 through 8
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum, idx) => (
              <motion.div
                key={semNum}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group w-full"
              >
                <Link
                  href={`/${branchCode}/${semNum}`}
                  className="block h-full p-7 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-2xl font-extrabold text-neutral-900 dark:text-white group-hover:scale-110 transition-transform">
                        0{semNum}
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-lg">
                        {info.terms?.[idx] || 'Semester'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-1">
                      Semester {semNum}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                      {info.years?.[idx] || 'B.Tech Course'} • Theory &amp; Labs
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                    <span>View Subjects &amp; PYQs</span>
                    <span className="group-hover:translate-x-1 transition-transform text-sm">&rarr;</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
