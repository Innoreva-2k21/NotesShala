"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import useShowToast from "@/hooks/useShowToast";
import { motion } from "framer-motion";

const defaultAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
];

const UserTestimonial = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const showToast = useShowToast();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [department, setDepartment] = useState("CSE");
  const [rating, setRating] = useState(5);
  const [picture, setPicture] = useState(defaultAvatars[0]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.given_name || user.family_name) {
        setFullname(`${user.given_name || ''} ${user.family_name || ''}`.trim());
      }
      if (user.email) {
        setEmail(user.email);
      }
      if (user.picture) {
        setPicture(user.picture);
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname.trim()) {
      showToast("Missing Field", "Please provide your full name.", "error");
      return;
    }
    if (!email.trim()) {
      showToast("Missing Field", "Please enter your email address.", "error");
      return;
    }
    if (!message.trim() || message.trim().length < 15) {
      showToast("Message Too Short", "Please write at least 15 characters about your experience.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://noteshaala.onrender.com/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullname.trim(),
          email: email.trim(),
          message: message.trim(),
          picture: picture || defaultAvatars[0],
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || data.message || "Failed to submit testimonial");
      }

      showToast("Testimonial Published! 🎉", "Thank you for sharing your experience with the campus community.", "success");
      setSubmitted(true);
      setMessage("");
    } catch (error) {
      showToast("Submission Error", error.message || "Unable to send your testimonial. Please try again.", "error");
    } finally {
      setLoading(false);
    }
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
          <Link href="/#testimonials" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Testimonials
          </Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold bg-neutral-200/70 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
            Submit Feedback
          </span>
        </div>

        {/* Header Section */}
        <div className="w-full text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Community Voice</span>
            <span className="text-neutral-300 dark:text-neutral-600">•</span>
            <span>Submit Testimonial</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Share Your Experience with NotesShala
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Did NotesShala help you prepare for exams or discover helpful notes? Share your thoughts to inspire batchmates and future juniors.
          </p>
        </div>

        {/* 2-Column Full-Screen Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Main Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 bg-white dark:bg-[#1b1b1b] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-6 sm:p-10 shadow-sm space-y-7 w-full"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-lg">
                  ✍️
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                    Feedback Form
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Your story will be featured on the homepage carousel
                  </p>
                </div>
              </div>

              {isAuthenticated ? (
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="truncate max-w-[170px]">{user?.email}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
                  <span>Guest or Signed In</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Field 1: Full Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-[#fbfbfa] dark:bg-neutral-800/80 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition"
                />
              </div>

              {/* Field 2: Email & Department Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    College Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@nitjsr.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-[#fbfbfa] dark:bg-neutral-800/80 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-[#fbfbfa] dark:bg-neutral-800/80 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition"
                  >
                    <option value="CSE">Computer Science &amp; Engg.</option>
                    <option value="ECE">Electronics &amp; Comm. Engg.</option>
                    <option value="EE">Electrical Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CE">Civil Engineering</option>
                    <option value="MME">Metallurgical &amp; Materials</option>
                    <option value="PIE">Production &amp; Industrial</option>
                    <option value="ECM">Engg. &amp; Computational</option>
                  </select>
                </div>
              </div>

              {/* Field 3: Star Rating */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-transform hover:scale-125 cursor-pointer ${
                        rating >= star ? "text-amber-400" : "text-neutral-300 dark:text-neutral-700"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 ml-2">
                    {rating} of 5 stars
                  </span>
                </div>
              </div>

              {/* Field 4: Avatar Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Choose Avatar
                </label>
                <div className="flex items-center gap-3">
                  {defaultAvatars.map((avatarUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPicture(avatarUrl)}
                      className={`relative rounded-full p-0.5 border-2 transition-all overflow-hidden cursor-pointer ${
                        picture === avatarUrl
                          ? "border-neutral-900 dark:border-white scale-110 shadow-sm"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={avatarUrl}
                        alt={`Avatar ${idx + 1}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 5: Message Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Your Testimonial <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {message.length} characters
                  </span>
                </div>

                <textarea
                  required
                  rows={4}
                  placeholder="Share how NotesShala assisted your semester prep, what features you love, or notes you found especially helpful..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-[#fbfbfa] dark:bg-neutral-800/80 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 font-semibold text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white dark:text-neutral-900" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting Testimonial...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Testimonial</span>
                      <span>&rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Column: Live Interactive Preview & Community Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-5 space-y-6 w-full"
          >
            {/* Live Preview Card */}
            <div className="bg-white dark:bg-[#1b1b1b] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Live Carousel Card Preview
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                  Preview
                </span>
              </div>

              {/* Card representation */}
              <div className="p-6 rounded-2xl bg-[#fbfbfa] dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 space-y-4 shadow-2xs">
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </div>

                <p className="text-sm text-neutral-800 dark:text-neutral-200 italic leading-relaxed">
                  &ldquo;{message.trim() || "NotesShala made semester revisions effortless. All formula sheets and PYQs in one place!"}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60">
                  <img
                    src={picture || defaultAvatars[0]}
                    alt={fullname || "Student"}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                      {fullname.trim() || "Student Name"}
                    </h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                      {department} Department • NIT Jamshedpur
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Share Guidelines Bento */}
            <div className="bg-white dark:bg-[#1b1b1b] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-xl">🌟</span>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Why Your Review Matters
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Building a collaborative student community
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  • <strong>Help Juniors:</strong> Your experience motivates new students to access reliable notes rather than searching unverified sources.
                </p>
                <p>
                  • <strong>Recognize Contributors:</strong> Feedback encourages student creators to continue digitizing class materials and PYQs.
                </p>
                <p>
                  • <strong>Open Source Spirit:</strong> NotesShala is built by NIT JSR students, for NIT JSR students.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 text-xs">
                <Link href="/#testimonials" className="text-neutral-900 dark:text-white font-semibold hover:underline flex items-center gap-1">
                  <span>View public carousel</span>
                  <span>&rarr;</span>
                </Link>
                <Link href="/#notes" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                  Browse Notes
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserTestimonial;
