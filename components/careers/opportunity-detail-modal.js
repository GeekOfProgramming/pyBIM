"use client";

import { useEffect, useRef, useId } from "react";
import { X, CheckCircle2, ArrowRight, Shield, Layers, FileCode2, Terminal, Info } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

/**
 * OpportunityDetailModal Component
 *
 * Founder-inspired accessible detail modal for pyBIM Open Roles & Collaborations.
 * Provides complete role briefs, technical requirements, portfolio guidance and application protocols.
 */
export default function OpportunityDetailModal({ role, onClose, onApplyRole }) {
  const { t } = useLanguage();
  const titleId = useId();
  const descId = useId();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  // Focus restoration & background scroll locking
  useEffect(() => {
    previousActiveElementRef.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (closeButtonRef.current) {
      closeButtonRef.current.focus({ preventScroll: true });
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      if (
        previousActiveElementRef.current &&
        typeof previousActiveElementRef.current.focus === "function" &&
        document.contains(previousActiveElementRef.current)
      ) {
        previousActiveElementRef.current.focus({ preventScroll: true });
      }
    };
  }, []);

  // Escape key & Tab focus trapping
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusableSelector =
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusables = Array.from(
          modalRef.current.querySelectorAll(focusableSelector)
        ).filter(
          (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true" && el.offsetParent !== null
        );

        if (focusables.length === 0) {
          e.preventDefault();
          modalRef.current.focus({ preventScroll: true });
          return;
        }

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus({ preventScroll: true });
          }
        } else {
          if (document.activeElement === lastElement || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus({ preventScroll: true });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!role) return null;

  const isActive = role.statusType === "active";
  const Icon = role.icon;

  const handleApplyClick = () => {
    if (onApplyRole) {
      onApplyRole(role.code);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1100] flex p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col m-auto border border-brand-border dark:border-slate-800 transition-colors focus:outline-none max-h-[90vh]"
      >
        {/* Modal Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-brand-border dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-mono font-bold tracking-wide uppercase border ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                  : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-blue-500"}`} aria-hidden="true" />
              {role.status}
            </span>
            <span className="font-mono text-caption text-brand-textSecondary">
              {t("careers.positions.modal.role_code") || "Role Code"}: <strong className="text-brand-textPrimary">{role.code}</strong>
            </span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            type="button"
            className="w-10 h-10 bg-brand-surface dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-brand-textPrimary border border-brand-border dark:border-slate-700 shadow-xs transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label={t("careers.positions.modal.close") || "Close modal"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="overflow-y-auto px-6 sm:px-8 lg:px-10 py-7 sm:py-8 space-y-8">
          {/* Title and Summary Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${role.iconWrapClass}`} aria-hidden="true">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-caption font-bold text-brand-primary tracking-wider uppercase block">
                  // {role.num} · {role.code}
                </span>
                <h3 id={titleId} className="text-2xl sm:text-3xl font-extrabold font-sans text-brand-textPrimary tracking-tight">
                  {role.title}
                </h3>
              </div>
            </div>
            <p id={descId} className="text-body sm:text-lead font-sans text-brand-textSecondary leading-relaxed mt-3">
              {role.overview}
            </p>
          </div>

          {/* Section: Typical Responsibilities */}
          <div className="rounded-2xl p-6 bg-brand-surface/60 border border-brand-border/80">
            <h4 className="text-caption font-mono font-bold tracking-wider text-brand-primary uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
              <span>{t("careers.positions.modal.responsibilities") || "Typical Responsibilities"}</span>
            </h4>
            <ul className="space-y-3">
              {role.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3 text-body-sm sm:text-body text-brand-textSecondary leading-relaxed">
                  <span className="flex items-center justify-center w-5 h-5 rounded-md bg-brand-cardElevated border border-brand-border text-brand-textPrimary font-mono text-caption font-bold shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Skills & Tools */}
          <div>
            <h4 className="text-caption font-mono font-bold tracking-wider text-brand-textSecondary uppercase mb-3">
              {t("careers.positions.modal.skills") || "Required & Valued Skills"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {role.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1.5 rounded-xl bg-brand-surface border border-brand-border/80 text-caption font-mono font-semibold text-brand-textPrimary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Evidence Guidance & Collaboration Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-brand-surface/40 border border-brand-border/80 flex flex-col justify-between">
              <div>
                <h5 className="text-caption font-mono font-bold tracking-wider text-brand-textPrimary uppercase mb-2 flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-brand-primary" />
                  <span>{t("careers.positions.modal.evidence") || "Portfolio & Evidence Guidance"}</span>
                </h5>
                <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                  {role.evidence}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-brand-surface/40 border border-brand-border/80 flex flex-col justify-between">
              <div>
                <h5 className="text-caption font-mono font-bold tracking-wider text-brand-textPrimary uppercase mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-primary" />
                  <span>{t("careers.positions.modal.context") || "Collaboration Context"}</span>
                </h5>
                <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                  {role.context}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Action CTA */}
          <div className="pt-6 border-t border-brand-border/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="text-caption font-mono text-brand-textSecondary">
              // Reference Role Code: <strong className="text-brand-primary">{role.code}</strong>
            </div>

            <button
              onClick={handleApplyClick}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-brand-actionOnPrimary font-bold text-caption tracking-wider uppercase transition-all shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <span>{t("careers.positions.modal.apply_btn") || "Apply for this Role"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
