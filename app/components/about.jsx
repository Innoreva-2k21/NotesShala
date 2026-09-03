"use client";
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-10 sm:py-14 bg-[#fbfbfa] dark:bg-[#121212] border-t border-neutral-200/70 dark:border-neutral-800 transition-colors w-full">
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2.5">
            <span>About Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            What We Do
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            We are providing a better notes sharing facility. We believe in transforming everyday study spaces into collaborative, high-impact learning experiences.
          </p>
        </div>

        {/* Notion Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Universal Access */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] p-6 sm:p-8 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-800 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                🌐
              </div>
              <div className="inline-block text-[11px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-200/60 dark:border-sky-800 mb-2">
                Universal Access
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">
                Campus-Wide Access
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Everyone in college can upload and view notes, making academic resources easily accessible across all departments and years.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400 font-mono">
              01 / Access Anywhere
            </div>
          </motion.div>

          {/* Card 2: Collaborative Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] p-6 sm:p-8 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-800 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                🤝
              </div>
              <div className="inline-block text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-200/60 dark:border-amber-800 mb-2">
                Peer Learning
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">
                Collaborative Sharing
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Students can share their notes, promoting collaborative learning and diverse perspectives to help everyone excel in exams.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400 font-mono">
              02 / Community-Driven
            </div>
          </motion.div>

          {/* Card 3: Multi-Format Support */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] p-6 sm:p-8 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                📑
              </div>
              <div className="inline-block text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800 mb-2">
                All Formats
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">
                Multi-Format Support
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                The site accommodates different note formats including PDFs, handwritten scans, and PYQs, catering to various learning preferences.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400 font-mono">
              03 / Flexible Study
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

