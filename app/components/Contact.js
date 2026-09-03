"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import useShowToast from '@/hooks/useShowToast';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const faqs = [
  {
    q: "What file formats are supported for notes?",
    a: "We support PDF documents (.pdf) as well as high-resolution scans (.jpg, .jpeg, .png) up to 40 MB.",
  },
  {
    q: "How can I find Previous Year Questions (PYQs)?",
    a: "Navigate to your branch and semester. PYQ files are tagged with 'pyq' in the file name for quick identification.",
  },
  {
    q: "Can I manage or delete the notes I uploaded?",
    a: "Yes, log in with your college account and visit your Profile page (/usernotes) to manage or delete your uploads.",
  },
];

const Contact = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useKindeBrowserClient();
  const showToast = useShowToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !message.trim()) {
      showToast('Validation Error', 'Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('message', `[Category: ${category}] ${message}`);
      formData.append('access_key', '52d56baf-e962-4370-9dd1-bf3c3dcb66a6');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showToast('Message Sent', 'Thank you! Your feedback has been received.', 'success');
        setName('');
        setMessage('');
      } else {
        console.error('Web3Forms Error', data);
        showToast('Error', data.message || 'Unable to send message.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error', 'Network error. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-[#fbfbfa] dark:bg-[#121212] border-t border-neutral-200/70 dark:border-neutral-800 transition-colors w-full overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2.5">
            <span>Get in Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Contact &amp; Support Hub
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Have questions, want to report missing notes, or suggest new features? Reach out directly or submit your thoughts below.
          </p>
        </div>

        {/* 2-Column Full-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Info & FAQs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            {/* Primary Contact Cards */}
            <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-2xl">
                    🏛️
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                      Innoreva Web Team
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      National Institute of Technology Jamshedpur
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full font-semibold">
                  Online
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <a
                  href="mailto:teaminnoreva@nitjsr.ac.in"
                  className="flex items-center gap-3 p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-700 bg-[#fbfbfa] dark:bg-neutral-800/70 hover:bg-neutral-100/70 dark:hover:bg-neutral-700/80 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-700 border border-neutral-200/80 dark:border-neutral-600 flex items-center justify-center text-neutral-700 dark:text-neutral-200 group-hover:scale-105 transition-transform">
                    <HiOutlineMail size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">Email</div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white truncate">teaminnoreva@nitjsr.ac.in</div>
                  </div>
                </a>

                <a
                  href="tel:+917004632130"
                  className="flex items-center gap-3 p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-700 bg-[#fbfbfa] dark:bg-neutral-800/70 hover:bg-neutral-100/70 dark:hover:bg-neutral-700/80 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-700 border border-neutral-200/80 dark:border-neutral-600 flex items-center justify-center text-neutral-700 dark:text-neutral-200 group-hover:scale-105 transition-transform">
                    <HiOutlinePhone size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">Helpline</div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">+91 7004632130</div>
                  </div>
                </a>
              </div>

              {/* Team Credits Link Card */}
              <Link
                href="/members"
                className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all group shadow-sm hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">👥</span>
                  <div>
                    <h4 className="text-sm font-semibold">Designed &amp; Developed by Web Team</h4>
                    <p className="text-xs text-neutral-400 dark:text-neutral-600">Meet the engineers and designers behind NoteShaala</p>
                  </div>
                </div>
                <span className="text-sm group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>

            {/* Quick FAQs */}
            <div className="p-6 sm:p-7 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] shadow-xs space-y-4 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <span>💡 Frequently Asked Questions</span>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#fbfbfa] dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70 space-y-1">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">{faq.q}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Full-Screen Message Form with matching height */}
          <div className="lg:col-span-6 flex flex-col h-full">
            <div className="p-6 sm:p-10 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] shadow-xs space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  Send Us a Message
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  We reply to student inquiries, content corrections, and feature requests.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-5">
                  {/* Category Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
                      Topic / Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Feedback', 'Missing Notes', 'Bug Report', 'General'].map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all ${
                            category === cat
                              ? 'bg-[#191919] dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs'
                              : 'bg-[#fbfbfa] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 bg-[#fbfbfa] dark:bg-neutral-800/80 transition"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex-1 flex flex-col">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what study materials you are looking for, or share your feedback..."
                      className="w-full flex-1 min-h-[140px] px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 bg-[#fbfbfa] dark:bg-neutral-800/80 transition resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  {isAuthenticated ? (
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 font-medium text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-all disabled:opacity-50 hover:scale-[1.01]"
                    >
                      {loading ? 'Sending Message...' : 'Submit Message'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        showToast('Authentication Required', 'Please sign in or register to submit feedback.', 'error')
                      }
                      className="w-full py-3.5 px-6 rounded-xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 font-medium text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-all hover:scale-[1.01]"
                    >
                      Submit Message
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


