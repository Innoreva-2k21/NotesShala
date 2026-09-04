"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import useShowToast from '@/hooks/useShowToast';

const fallbackTestimonials = [
  {
    fullname: "Aditya Kumar",
    message: "NoteShaala made end-semester revisions 10x easier. All handwritten notes and PYQs in one place!",
    picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    fullname: "Sneha Roy",
    message: "The branch-wise organization is super intuitive. Found all 4th sem ECE lecture summaries easily.",
    picture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
  },
  {
    fullname: "Rohan Verma",
    message: "Contributing my notes felt great knowing it helps the juniors. Best initiative by the web team!",
    picture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
  },
];

const TestimonialCarousel = () => {
  const [users, setUsers] = useState(fallbackTestimonials);
  const [error, setError] = useState(null);

  const { isAuthenticated } = useKindeBrowserClient();
  const showToast = useShowToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        if (response.data.testimonials && response.data.testimonials.length > 0) {
          setUsers(response.data.testimonials);
        }
      } catch (err) {
        console.error(err);
        // Fallback already pre-set to keep UI beautiful
      }
    };

    fetchUsers();
  }, []);

  const handleUnauthClick = () => {
    showToast('Authentication Required', 'Please sign in or register to submit a testimonial.', 'error');
  };

  return (
    <section className="py-10 sm:py-14 bg-[#fbfbfa] dark:bg-[#121212] border-t border-neutral-200/70 dark:border-neutral-800 transition-colors overflow-hidden w-full">
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2.5">
            <span>Student Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Our Happy Students
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            See how NoteShaala is helping students across departments save study time and prepare better for exams.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-2 sm:px-12">
          <Carousel
            plugins={[Autoplay({ delay: 3500 })]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {Array.isArray(users) &&
                users.map((data, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="h-full p-6 sm:p-7 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1b1b1b] hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                      {/* Quote text */}
                      <div className="space-y-4">
                        <div className="text-amber-400 flex items-center gap-1 text-sm">
                          {"★".repeat(5)}
                        </div>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                          &ldquo;{data?.message}&rdquo;
                        </p>
                      </div>

                      {/* Author info */}
                      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3.5">
                        <img
                          className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                          src={
                            data?.picture ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          }
                          alt={data?.fullname || "Student avatar"}
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                            {data?.fullname}
                          </h4>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                            Verified Student
                          </span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="hidden sm:flex -left-6 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-xs" />
            <CarouselNext className="hidden sm:flex -right-6 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-xs" />
          </Carousel>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          {isAuthenticated ? (
            <Link
              href="/userTestimonial"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 font-medium text-sm sm:text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-all hover:scale-[1.02]"
            >
              <span>Share Your Experience</span>
              <span>&rarr;</span>
            </Link>
          ) : (
            <button
              onClick={handleUnauthClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#191919] dark:bg-white text-white dark:text-neutral-900 font-medium text-sm sm:text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-all hover:scale-[1.02]"
            >
              <span>Share Your Experience</span>
              <span>&rarr;</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;

