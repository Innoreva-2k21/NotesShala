"use client";
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import useShowToast from '@/hooks/useShowToast';

const branches = [
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    shortName: 'Computer Science',
    icon: '💻',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    description: 'Algorithms, OS, DBMS, Networks, AI & Systems',
  },
  {
    code: 'ECE',
    name: 'Electronics & Communication',
    shortName: 'Electronics & Comm.',
    icon: '📡',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    description: 'Signals, VLSI, Analog & Digital Circuits, Comms',
  },
  {
    code: 'EE',
    name: 'Electrical Engineering',
    shortName: 'Electrical',
    icon: '⚡',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    description: 'Power Systems, Machines, Control & Drives',
  },
  {
    code: 'ME',
    name: 'Mechanical Engineering',
    shortName: 'Mechanical',
    icon: '⚙️',
    color: 'bg-rose-50 text-rose-600 border-rose-100',
    description: 'Thermodynamics, Fluid Mechanics, Design & CAD',
  },
  {
    code: 'CE',
    name: 'Civil Engineering',
    shortName: 'Civil',
    icon: '🏗️',
    color: 'bg-orange-50 text-orange-600 border-orange-100',
    description: 'Structures, Geotech, Surveying, Transportation',
  },
  {
    code: 'MME',
    name: 'Materials & Metallurgical Engg.',
    shortName: 'Material & Metallurgy',
    icon: '🧪',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    description: 'Physical Metallurgy, Thermodynamics, Materials',
  },
  {
    code: 'PIE',
    name: 'Production & Industrial Engg.',
    shortName: 'Production & Industrial',
    icon: '🏭',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    description: 'Manufacturing, Operations Research, Quality',
  },
  {
    code: 'ECM',
    name: 'Computational Mechanics',
    shortName: 'Computational Mechanics',
    icon: '📐',
    color: 'bg-teal-50 text-teal-600 border-teal-100',
    description: 'Numerical Methods, FEA, Continuum & Simulation',
  },
];

const NotesBranchWise = () => {
  const { isAuthenticated } = useKindeBrowserClient();
  const showToast = useShowToast();

  const handleUnauthClick = () => {
    showToast('Authentication Required', 'Please sign in or register to access notes and study materials.', 'error');
  };

  return (
    <section className="py-10 sm:py-14 bg-white dark:bg-[#121212] border-t border-neutral-200/70 dark:border-neutral-800 transition-colors w-full">
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2.5">
            <span>Academic Database</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Notes by Department
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Get your hands on your study materials now! Select your branch to browse semester-wise notes, lecture slides, and previous year question papers.
          </p>
        </div>

        {/* 8-Branch Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {branches.map((branch, index) => {
            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="h-full p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-[#fbfbfa] dark:bg-[#1b1b1b] hover:bg-white dark:hover:bg-[#222222] hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl group-hover:scale-110 transition-transform ${branch.color}`}>
                      {branch.icon}
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-200/70 dark:border-neutral-700">
                      {branch.code}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-white mb-1.5">
                    {branch.shortName}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {branch.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                  <span>Semester 1–8</span>
                  <span className="group-hover:translate-x-1 transition-transform">Explore &rarr;</span>
                </div>
              </motion.div>
            );

            return (
              <div key={branch.code}>
                {isAuthenticated ? (
                  <Link href={`/${branch.code}`}>
                    {cardContent}
                  </Link>
                ) : (
                  <div onClick={handleUnauthClick}>
                    {cardContent}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NotesBranchWise;

