"use client";
import React, { useState, useRef } from 'react';
import Sub from './subject.json';
import Branch from './branch.json';
import axios from 'axios';
import useShowToast from '@/hooks/useShowToast';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const branchesList = [
  { code: 'CSE', name: 'Computer Science' },
  { code: 'ECE', name: 'Electronics & Comm.' },
  { code: 'EE', name: 'Electrical Engg.' },
  { code: 'ME', name: 'Mechanical Engg.' },
  { code: 'CE', name: 'Civil Engg.' },
  { code: 'MME', name: 'Metallurgical Engg.' },
  { code: 'PIE', name: 'Production & Ind.' },
  { code: 'ECM', name: 'Engg. & Computational' },
];

const Page = () => {
  const [subject, setSubject] = useState('');
  const [branch, setBranch] = useState('');
  const [sem, setSem] = useState('1');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subjectSearchFocused, setSubjectSearchFocused] = useState(false);
  const fileInputRef = useRef(null);

  const fileSizeLimit = 40 * 1024 * 1024; // 40MB
  const { user, isAuthenticated } = useKindeBrowserClient();
  const postedBy = user?.email || (isAuthenticated && user ? user.email : 'student@nitjsr.ac.in');
  const showToast = useShowToast();

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;
    const fileName = selectedFile.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];

    if (!allowedExtensions.includes(fileExtension)) {
      showToast('Invalid File Type', 'Only .pdf, .jpg, .jpeg, or .png files are accepted.', 'error');
      return false;
    }

    if (selectedFile.size > fileSizeLimit) {
      showToast('File Too Large', 'File size exceeds the 40 MB maximum limit.', 'error');
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && validateFile(selected)) {
      setFile(selected);
    } else {
      e.target.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      showToast('Authentication Required', 'Please sign in or register to upload notes.', 'error');
      return;
    }

    if (!branch) {
      showToast('Missing Field', 'Please select or type your engineering branch.', 'error');
      return;
    }
    if (!sem) {
      showToast('Missing Field', 'Please choose a semester (1–8).', 'error');
      return;
    }
    if (!subject) {
      showToast('Missing Field', 'Please specify the subject or course name.', 'error');
      return;
    }
    if (!file) {
      showToast('Missing File', 'Please attach your study material PDF or document.', 'error');
      return;
    }

    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("postedBy", postedBy);
      formdata.append("branch", branch);
      formdata.append("semester", sem);
      formdata.append("subject", subject);
      formdata.append("file", file);

      const res = await axios.post(`https://noteshaala.onrender.com/api/notes/upload`, formdata, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data?.error) {
        showToast('Upload Error', res.data.error, 'error');
        return;
      }

      showToast('Upload Successful! 🎉', 'Your notes have been shared and are now live for everyone.', 'success');

      // Reset form
      setBranch('');
      setSubject('');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to upload notes. Please check your connection and try again.';
      showToast('Upload Failed', errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Filter subjects based on query
  const filteredSubjects = Sub.filter((item) => {
    if (!subject) return false;
    const searchItem = subject.toLowerCase().trim();
    const subName = item.sub.toLowerCase();
    return subName.includes(searchItem) && subName !== searchItem;
  }).slice(0, 6);

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

      <div className="relative w-full px-4 sm:px-8 lg:px-14 xl:px-20">
        {/* Page Header */}
        <div className="w-full text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Community Repository</span>
            <span className="text-neutral-300 dark:text-neutral-600">•</span>
            <span>Upload Notes</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Share Your Course Notes &amp; PYQs
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Help batchmates and juniors excel. Upload lecture summaries, lab manuals, handwritten formula sheets, or previous year question papers.
          </p>
        </div>

        {/* 2-Column Full-Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Main Upload Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 bg-white dark:bg-[#1b1b1b] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-6 sm:p-10 shadow-sm space-y-7 w-full"
          >
            {/* Form Top User Context */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-lg">
                  📝
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                    Upload Details
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Step 1 of 1 • Public Study Repository
                  </p>
                </div>
              </div>

              {isAuthenticated ? (
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="truncate max-w-[170px]">{postedBy}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full">
                  <span>⚠️ Sign in required to post</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Field 1: Branch Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Department / Branch <span className="text-red-500">*</span>
                  </label>
                  {branch && (
                    <button
                      type="button"
                      onClick={() => setBranch('')}
                      className="text-[11px] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick Branch Selection Pills */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {branchesList.map((b) => (
                    <button
                      type="button"
                      key={b.code}
                      onClick={() => setBranch(b.code)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        branch.toUpperCase() === b.code
                          ? 'bg-[#191919] dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs scale-105'
                          : 'bg-[#fbfbfa] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {b.code}
                    </button>
                  ))}
                </div>

                {/* Custom branch input */}
                <input
                  type="text"
                  placeholder="Or type custom branch code (e.g. CSE, ECE, EE)"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full mt-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#fbfbfa] dark:bg-neutral-800/80 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition"
                />
              </div>

              {/* Field 2: Semester Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Semester <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {['1', '2', '3', '4', '5', '6', '7', '8'].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSem(s)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        sem === s
                          ? 'bg-[#191919] dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs scale-105'
                          : 'bg-[#fbfbfa] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      }`}
                    >
                      Sem {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 3: Subject / Topic with Autocomplete */}
              <div className="space-y-2 relative">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Subject / Course Name <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setSubject('PYQ')}
                    className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                  >
                    + Tag as PYQ
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Data Structures, Engineering Physics, PYQ..."
                    value={subject}
                    onFocus={() => setSubjectSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSubjectSearchFocused(false), 200)}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#fbfbfa] dark:bg-neutral-800/80 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition"
                  />
                </div>

                {/* Autocomplete Dropdown */}
                {subjectSearchFocused && filteredSubjects.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-30 left-0 right-0 top-full mt-1 bg-white dark:bg-[#202020] rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-lg p-2 max-h-48 overflow-y-auto space-y-1"
                  >
                    <div className="text-[10px] font-mono uppercase text-neutral-400 px-2 py-1">
                      Suggested Subjects
                    </div>
                    {filteredSubjects.map((item, idx) => (
                      <div
                        key={idx}
                        onMouseDown={() => setSubject(item.sub)}
                        className="px-3 py-1.5 text-xs rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer text-neutral-800 dark:text-neutral-200 flex items-center justify-between"
                      >
                        <span>{item.sub}</span>
                        <span className="text-[10px] text-neutral-400">Select &crarr;</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Field 4: Drag & Drop File Upload Area */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Document / PDF File <span className="text-red-500">*</span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  id="note-file-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!file ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                      isDragging
                        ? 'border-neutral-900 dark:border-white bg-neutral-100/70 dark:bg-neutral-800/80 scale-[1.01]'
                        : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 bg-[#fbfbfa] dark:bg-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/80'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 flex items-center justify-center text-2xl shadow-2xs">
                      📂
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                        Click to browse or drag &amp; drop file here
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                        PDF, JPG, PNG • Maximum size: 40 MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-[#fbfbfa] dark:bg-neutral-800/80 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-xl shrink-0">
                        📄
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                          {formatFileSize(file.size)} • Ready to upload
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Remove file"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                {isAuthenticated ? (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 font-semibold text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white dark:text-neutral-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Uploading Notes to Repository...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit &amp; Publish Notes</span>
                        <span>&rarr;</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <RegisterLink>
                      <div className="w-full py-3.5 px-6 rounded-2xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-md transition-all text-center cursor-pointer">
                        Sign up to Upload Notes
                      </div>
                    </RegisterLink>
                    <p className="text-center text-xs text-neutral-500">
                      Already have an account?{' '}
                      <LoginLink>
                        <span className="font-semibold text-neutral-900 dark:text-white underline cursor-pointer">
                          Sign in
                        </span>
                      </LoginLink>
                    </p>
                  </div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right Information & Guidelines Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Guidelines Card */}
            <div className="bg-white dark:bg-[#1b1b1b] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-xl">📋</span>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Upload Guidelines
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Follow these tips for best quality notes
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {[
                  {
                    icon: '🎯',
                    title: 'Accurate Department & Semester',
                    desc: 'Tag with the correct branch (e.g., CSE) and semester (1–8) so students can discover it easily.',
                  },
                  {
                    icon: '🏷️',
                    title: 'Clear File Naming & PYQs',
                    desc: 'Use descriptive names like "Maths_Unit2_Notes.pdf". For previous exam papers, tag the subject as "PYQ".',
                  },
                  {
                    icon: '📦',
                    title: '40 MB Size Limit',
                    desc: 'The max upload limit is 40 MB. For large scanned PDFs, consider using a PDF compressor before uploading.',
                  },
                  {
                    icon: '🔒',
                    title: 'Open Campus Knowledge',
                    desc: 'All notes are accessible to everyone in college under open knowledge sharing.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-[#fbfbfa] dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70 flex items-start gap-3"
                  >
                    <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contributor Impact Card */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🌟</span>
                <span className="text-[10px] font-mono uppercase bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                  Open Source
                </span>
              </div>
              <h3 className="text-lg font-bold">
                Empowering 1000+ NIT Jamshedpur Students
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Your contributions help classmates revise efficiently before midsems and endsems.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                <Link href="/usernotes" className="text-neutral-200 hover:text-white hover:underline flex items-center gap-1">
                  <span>View your uploaded notes</span>
                  <span>&rarr;</span>
                </Link>
                <Link href="/#notes" className="text-neutral-400 hover:text-white">
                  Browse Catalog
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Page;
