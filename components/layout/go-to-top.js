"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when scrolling down 1 viewport height
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 lg:bottom-5 right-5 z-40 inline-flex items-center justify-center rounded-full bg-brand-accent p-3 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] transition hover:bg-brand-accent hover:translate-y-[-2px]"
      aria-label="Go to top"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
