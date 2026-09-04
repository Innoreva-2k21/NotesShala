"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const branchTabs = [
  { code: 'ALL', label: 'All Resources', icon: '✨' },
  { code: 'CSE', label: 'Computer Science', icon: '💻' },
  { code: 'ECE', label: 'Electronics & Comm.', icon: '📡' },
  { code: 'EE', label: 'Electrical Engg.', icon: '⚡' },
  { code: 'ME', label: 'Mechanical Engg.', icon: '⚙️' },
  { code: 'CE', label: 'Civil Engg.', icon: '🏗️' },
  { code: 'MME', label: 'Materials & Met.', icon: '🧪' },
  { code: 'PIE', label: 'Production & Ind.', icon: '🏭' },
  { code: 'ECM', label: 'Comp. Mechanics', icon: '📐' },
];

const mockResources = {
  ALL: [
    { title: "Data Structures & Algorithms", branch: "CSE", sem: "Sem 3", type: "Handwritten Notes", downloads: "1.2k", icon: "📄", tag: "Most Popular" },
    { title: "Power Systems Solved PYQ 2023", branch: "EE", sem: "Sem 5", type: "End-Sem Solved", downloads: "890", icon: "⚡", tag: "PYQ" },
    { title: "Digital Signal Processing", branch: "ECE", sem: "Sem 4", type: "Lecture Slides", downloads: "740", icon: "📡", tag: "Verified" },
    { title: "Thermodynamics & Heat Transfer", branch: "ME", sem: "Sem 3", type: "Formula Sheet", downloads: "950", icon: "⚙️", tag: "Curated" },
  ],
  CSE: [
    { title: "Data Structures & Algorithms", branch: "CSE", sem: "Sem 3", type: "Handwritten Notes", downloads: "1.2k", icon: "💻", tag: "Unit 1-5" },
    { title: "Operating Systems Notes & Viva", branch: "CSE", sem: "Sem 4", type: "Complete Guide", downloads: "1.1k", icon: "💻", tag: "End-Sem" },
    { title: "Database Management Systems (DBMS)", branch: "CSE", sem: "Sem 4", type: "SQL & Normalization", downloads: "980", icon: "💻", tag: "Solved PYQ" },
    { title: "Computer Networks & Protocols", branch: "CSE", sem: "Sem 5", type: "Lab + Theory", downloads: "850", icon: "💻", tag: "High Quality" },
  ],
  ECE: [
    { title: "Digital Signal Processing (DSP)", branch: "ECE", sem: "Sem 4", type: "Lecture Notes", downloads: "740", icon: "📡", tag: "Unit 1-4" },
    { title: "VLSI Design & CMOS Circuits", branch: "ECE", sem: "Sem 6", type: "Formula & Diagram", downloads: "620", icon: "📡", tag: "Verified" },
    { title: "Analog Communication PYQ 2022-23", branch: "ECE", sem: "Sem 5", type: "Solved Papers", downloads: "810", icon: "📡", tag: "PYQ" },
    { title: "Microprocessors & Microcontrollers", branch: "ECE", sem: "Sem 4", type: "8085/8086 Assembly", downloads: "930", icon: "📡", tag: "Lab Manual" },
  ],
  EE: [
    { title: "Power Systems - Transmission & Grid", branch: "EE", sem: "Sem 5", type: "End-Sem Notes", downloads: "890", icon: "⚡", tag: "Complete" },
    { title: "Electrical Machines II", branch: "EE", sem: "Sem 4", type: "Induction & Sync", downloads: "760", icon: "⚡", tag: "Verified" },
    { title: "Control Systems State Space Notes", branch: "EE", sem: "Sem 5", type: "Bode & Nyquist", downloads: "830", icon: "⚡", tag: "Formulas" },
    { title: "Power Electronics Solved PYQ", branch: "EE", sem: "Sem 6", type: "Inverters & Choppers", downloads: "690", icon: "⚡", tag: "PYQ" },
  ],
  ME: [
    { title: "Thermodynamics & Heat Transfer", branch: "ME", sem: "Sem 3", type: "Complete Formulae", downloads: "950", icon: "⚙️", tag: "Handwritten" },
    { title: "Fluid Mechanics & Turbo-Machinery", branch: "ME", sem: "Sem 4", type: "Solved Numericals", downloads: "820", icon: "⚙️", tag: "PYQ" },
    { title: "Kinematics & Theory of Machines", branch: "ME", sem: "Sem 4", type: "Gear Trains & Cams", downloads: "710", icon: "⚙️", tag: "Unit 1-5" },
    { title: "Manufacturing Processes & Workshop", branch: "ME", sem: "Sem 3", type: "Lab Guide", downloads: "640", icon: "⚙️", tag: "Curated" },
  ],
  CE: [
    { title: "Structural Analysis & RCC Design", branch: "CE", sem: "Sem 5", type: "IS 456 Formulas", downloads: "830", icon: "🏗️", tag: "Solved" },
    { title: "Geotechnical Engineering (Soil Mech)", branch: "CE", sem: "Sem 4", type: "Lab & Theory", downloads: "770", icon: "🏗️", tag: "Unit 1-4" },
    { title: "Fluid Mechanics & Hydraulics", branch: "CE", sem: "Sem 3", type: "Handwritten PDF", downloads: "690", icon: "🏗️", tag: "Verified" },
    { title: "Surveying & Geomatics PYQ", branch: "CE", sem: "Sem 3", type: "End-Sem Solved", downloads: "610", icon: "🏗️", tag: "PYQ" },
  ],
  MME: [
    { title: "Physical Metallurgy & Phase Diagrams", branch: "MME", sem: "Sem 3", type: "Fe-C Diagram Notes", downloads: "590", icon: "🧪", tag: "Handwritten" },
    { title: "Thermodynamics of Materials", branch: "MME", sem: "Sem 4", type: "Ellingham Diagrams", downloads: "520", icon: "🧪", tag: "Complete" },
    { title: "Mechanical Behaviour of Materials", branch: "MME", sem: "Sem 5", type: "Creep & Fatigue", downloads: "480", icon: "🧪", tag: "Curated" },
    { title: "Materials Characterization (XRD/SEM)", branch: "MME", sem: "Sem 6", type: "Lab Manual", downloads: "440", icon: "🧪", tag: "Verified" },
  ],
  PIE: [
    { title: "Operations Research & Optimization", branch: "PIE", sem: "Sem 5", type: "Simplex & LPP", downloads: "680", icon: "🏭", tag: "Solved PYQ" },
    { title: "Work Study & Ergonomics", branch: "PIE", sem: "Sem 4", type: "Time & Motion Study", downloads: "560", icon: "🏭", tag: "Unit 1-4" },
    { title: "Quality Control & Six Sigma", branch: "PIE", sem: "Sem 6", type: "Control Charts", downloads: "510", icon: "🏭", tag: "Formulas" },
    { title: "Foundry & Welding Technology", branch: "PIE", sem: "Sem 3", type: "Manufacturing Notes", downloads: "630", icon: "🏭", tag: "Verified" },
  ],
  ECM: [
    { title: "Finite Element Analysis (FEA)", branch: "ECM", sem: "Sem 6", type: "Stiffness Matrix Notes", downloads: "540", icon: "📐", tag: "Formulas" },
    { title: "Computational Fluid Dynamics (CFD)", branch: "ECM", sem: "Sem 5", type: "Navier-Stokes Solved", downloads: "490", icon: "📐", tag: "Curated" },
    { title: "Numerical Methods & MATLAB Code", branch: "ECM", sem: "Sem 4", type: "Euler & RK4 Notes", downloads: "610", icon: "📐", tag: "Solved PYQ" },
    { title: "Continuum Mechanics", branch: "ECM", sem: "Sem 5", type: "Tensor Calculus Guide", downloads: "470", icon: "📐", tag: "Verified" },
  ],
};

const HeroSection = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll scale & zoom perspective transformations
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1.02]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [8, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

  const currentResources = (mockResources[selectedBranch] || mockResources.ALL).filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden bg-gradient-to-b from-white via-[#fbfbfa] to-[#f7f6f3] dark:from-[#121212] dark:via-[#161616] dark:to-[#121212] transition-colors w-full"
    >
      {/* Subtle Notion-style background grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(#d4d4d4 1px, transparent 1px), radial-gradient(#d4d4d4 1px, #fbfbfa 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        }}
      />

      <div className="relative w-full px-4 sm:px-8 lg:px-14 xl:px-20 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Top Notion Pill Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 dark:bg-neutral-800/90 border border-neutral-200/90 dark:border-neutral-700 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 shadow-xs mb-5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Welcome to NoteShaala</span>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <span className="text-neutral-500 dark:text-neutral-400 font-normal">NIT Jamshedpur</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-5xl leading-[1.1] transition-colors"
          >
            All your college notes, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-600 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 underline decoration-neutral-300 dark:decoration-neutral-700 decoration-wavy decoration-1 underline-offset-8">
              organized in one place.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl font-normal leading-relaxed transition-colors"
          >
            Your digital companion for academic excellence. Access curated notes, syllabus, and previous year questions (PYQs) across all departments.
          </motion.p>

          {/* Hashtag Badges */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mt-3.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span className="bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-200/70 dark:border-neutral-700">#share_notes</span>
            <span className="bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-200/70 dark:border-neutral-700">#share_knowledge</span>
            <span className="bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-200/70 dark:border-neutral-700">#open_source</span>
          </motion.div>

          {/* Dual CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3.5 mt-6 sm:mt-8">
            <Link
              href="#notes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 font-medium text-sm sm:text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Notes</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>

            {isAuthenticated ? (
              <Link
                href="/usernotes"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium text-sm sm:text-base hover:bg-neutral-50 dark:hover:bg-neutral-700 shadow-xs transition-all hover:scale-[1.02]"
              >
                <span>Hello, {user?.given_name || user?.email?.split('@')[0]}</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-xs">● Active</span>
              </Link>
            ) : (
              <RegisterLink>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium text-sm sm:text-base hover:bg-neutral-50 dark:hover:bg-neutral-700 shadow-xs transition-all hover:scale-[1.02] cursor-pointer">
                  <span>Sign up free</span>
                  <svg className="w-4 h-4 text-neutral-400 dark:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </RegisterLink>
            )}

            <Link
              href="#uploads"
              className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>Share Notes</span>
              <span>&rarr;</span>
            </Link>
          </motion.div>

          {/* Full-Screen Animated Notion Document Preview Card with Scroll Zoom & Scale */}
          <div className="w-full [perspective:1200px] mt-8 sm:mt-10">
            <motion.div
              style={{
                scale,
                rotateX,
                y,
                transformStyle: "preserve-3d",
              }}
              variants={itemVariants}
              className="w-full rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] shadow-2xl shadow-neutral-900/10 dark:shadow-black/50 backdrop-blur-sm overflow-hidden text-left transition-colors duration-200"
            >
            {/* Window Header Bar with macOS-style controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-[#161616]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80 hover:bg-amber-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80 hover:bg-emerald-500 transition-colors cursor-pointer" />
              </div>

              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium overflow-hidden">
                <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">NoteShaala</span>
                <span>/</span>
                <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">B.Tech Repository</span>
                <span>/</span>
                <span className="text-neutral-900 dark:text-neutral-100 font-semibold bg-neutral-200/70 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                  {selectedBranch === 'ALL' ? 'All 8 Departments' : selectedBranch}
                </span>
              </div>

              {/* Live Status Pill */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="hidden sm:inline">Live Repository • 8 Branches</span>
              </div>
            </div>

            {/* Document Content Area */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-6">
              {/* Document Header & Fast Search Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">📚</span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                      Semester Course Material &amp; PYQs
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    Verified student uploads, lecture notes, lab manuals, and previous year exam questions.
                  </p>
                </div>

                {/* Instant Live Search Filter */}
                <div className="relative min-w-[260px] sm:min-w-[320px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search subject, PYQ, or topic..."
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#fbfbfa] dark:bg-neutral-800/80 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition"
                  />
                  <svg
                    className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3 top-2.5 sm:top-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Interactive Animated Branch Selector Tabs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Filter by Department
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    Click to switch preview
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {branchTabs.map((tab) => {
                    const isSelected = selectedBranch === tab.code;
                    return (
                      <button
                        key={tab.code}
                        onClick={() => setSelectedBranch(tab.code)}
                        className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#191919] dark:bg-white text-white dark:text-neutral-900 shadow-xs scale-105'
                            : 'bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span>{tab.code}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Animated Live Cards Grid */}
              <div className="pt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedBranch + searchQuery}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {currentResources.length > 0 ? (
                      currentResources.map((item, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.025, y: -2 }}
                          transition={{ duration: 0.2 }}
                          className="p-4 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-[#fbfbfa] dark:bg-neutral-800/60 hover:bg-white dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-2xl group-hover:scale-110 transition-transform">
                                {item.icon}
                              </span>
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                                {item.tag}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-black dark:group-hover:text-white line-clamp-1">
                                {item.title}
                              </h4>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                {item.branch} • {item.sem} • {item.type}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-[11px] text-neutral-400">
                            <span className="flex items-center gap-1 font-mono">
                              📥 {item.downloads} downloads
                            </span>
                            <span className="text-neutral-700 dark:text-neutral-300 font-semibold group-hover:translate-x-1 transition-transform">
                              View &rarr;
                            </span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-full py-8 text-center text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                        No notes found matching "{searchQuery}". Try selecting another department or clearing the search.
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Quick Bar */}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Showing real-time course syllabus, handwritten PDFs &amp; solved PYQs</span>
                </div>
                {selectedBranch !== 'ALL' ? (
                  <Link
                    href={`/${selectedBranch}`}
                    className="font-semibold text-neutral-900 dark:text-neutral-100 hover:underline flex items-center gap-1"
                  >
                    <span>Browse all {selectedBranch} semesters (1–8)</span>
                    <span>&rarr;</span>
                  </Link>
                ) : (
                  <Link
                    href="#notes"
                    className="font-semibold text-neutral-900 dark:text-neutral-100 hover:underline flex items-center gap-1"
                  >
                    <span>Browse all 8 engineering branches</span>
                    <span>&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;