"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

function CountUp({ target, suffix = "", duration = 1400 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(16, Math.floor(duration / Math.max(target, 1)));
    const timer = setInterval(() => {
      start += target > 100 ? Math.ceil(target / 50) : 1;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count}{suffix}</span>;
}

export default function AnimatedStatsSection() {
  const { t } = useLanguage();
  
  const stats = [
    { value: 12, suffix: "+", label: t("home.stats.years") },
    { value: 700, suffix: "+", label: t("home.stats.projects") },
    { value: 100, suffix: "%", label: t("home.stats.satisfaction") },
    { value: 24, suffix: "/7", label: t("home.trust.stats.support") }
  ];

  return (
    <section className="bg-[#111827] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/5 bg-[#1f2937]/50 p-8 text-center shadow-lg hover:border-brand-accent/30 transition-colors">
              <div className="text-4xl font-bold text-white mb-2">
                <CountUp target={item.value} suffix={item.suffix} />
              </div>
              <div className="text-sm font-medium text-white/70">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
