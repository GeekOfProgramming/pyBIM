"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

/**
 * Cloudflare Turnstile Client Component
 * Renders an accessible, managed Turnstile widget with automatic reset and callback handling.
 *
 * Production Safety:
 * - Production builds require NEXT_PUBLIC_TURNSTILE_SITE_KEY to be explicitly configured.
 * - Non-production environments fall back to Cloudflare's Always-Pass test key (1x00000000000000000000AA).
 * - Component uses callback refs to ensure parent component rerenders do not reset or re-mount the Turnstile iframe.
 * - Safely coordinates single script tag injection across multiple instances on the same page (e.g. Contact + Early Access).
 */
const TurnstileWidget = forwardRef(function TurnstileWidget(
  {
    onVerify,
    onError,
    onExpire,
    theme = "auto",
    action = "general",
    className = ""
  },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [siteKeyError, setSiteKeyError] = useState(false);

  // Keep latest callbacks in refs so changing function identity doesn't re-render or reset Turnstile
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  // Resolve sitekey: in production, require real sitekey; in dev/test, fallback to Always-Pass
  const isProduction = process.env.NODE_ENV === "production";
  const configuredKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const siteKey = configuredKey || (isProduction ? "" : "1x00000000000000000000AA");

  // Expose reset method to parent component via ref
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch {
          // ignore reset error
        }
      }
    }
  }));

  useEffect(() => {
    if (!siteKey) {
      if (isProduction) {
        console.error("[SECURITY ALERT] NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing in production.");
        setSiteKeyError(true);
      }
      return;
    }

    const SCRIPT_ID = "cloudflare-turnstile-script";

    const renderWidget = () => {
      if (typeof window !== "undefined" && window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme,
            action,
            callback: (token) => {
              if (onVerifyRef.current) onVerifyRef.current(token);
            },
            "error-callback": (err) => {
              if (onErrorRef.current) onErrorRef.current(err);
            },
            "expired-callback": () => {
              if (onExpireRef.current) onExpireRef.current();
            }
          });
        } catch (e) {
          console.warn("Turnstile render exception:", e);
        }
      }
    };

    if (typeof window !== "undefined") {
      if (window.turnstile) {
        renderWidget();
      } else {
        let script = document.getElementById(SCRIPT_ID);
        if (!script) {
          script = document.createElement("script");
          script.id = SCRIPT_ID;
          script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }

        script.addEventListener("load", renderWidget);
      }
    }

    return () => {
      const script = typeof document !== "undefined" ? document.getElementById(SCRIPT_ID) : null;
      if (script) {
        script.removeEventListener("load", renderWidget);
      }
      if (typeof window !== "undefined" && widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, [siteKey, theme, action, isProduction]);

  if (siteKeyError) {
    return (
      <div className="p-3 my-2 text-xs rounded-xl bg-red-500/10 border border-red-500/30 text-rose-500">
        Bot verification service is temporarily unavailable.
      </div>
    );
  }

  return (
    <div className={`turnstile-container my-3 min-h-[65px] flex justify-start items-center ${className}`}>
      <div ref={containerRef} />
    </div>
  );
});

export default TurnstileWidget;
