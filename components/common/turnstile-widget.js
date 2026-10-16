"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

/**
 * Cloudflare Turnstile Client Component
 * Renders an accessible, managed Turnstile widget with automatic reset and callback handling.
 * Works seamlessly in development/CI (graceful fallback if sitekey is absent or in test mode).
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
  const [isLoaded, setIsLoaded] = useState(false);

  // Cloudflare Turnstile Always-Pass test sitekey for non-production environments
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    "1x00000000000000000000AA"; // Cloudflare official Always-Pass test key

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
    // If running in browser and Turnstile script is not yet injected
    const SCRIPT_ID = "cloudflare-turnstile-script";

    const loadWidget = () => {
      if (typeof window !== "undefined" && window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme,
            action,
            callback: (token) => {
              if (onVerify) onVerify(token);
            },
            "error-callback": (err) => {
              if (onError) onError(err);
            },
            "expired-callback": () => {
              if (onExpire) onExpire();
            }
          });
          setIsLoaded(true);
        } catch (e) {
          console.warn("Turnstile render exception:", e);
        }
      }
    };

    if (typeof window !== "undefined") {
      if (!document.getElementById(SCRIPT_ID)) {
        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          loadWidget();
        };
        document.head.appendChild(script);
      } else if (window.turnstile) {
        loadWidget();
      } else {
        const existingScript = document.getElementById(SCRIPT_ID);
        existingScript.addEventListener("load", loadWidget);
      }
    }

    return () => {
      if (typeof window !== "undefined" && widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, [siteKey, theme, action, onVerify, onError, onExpire]);

  return (
    <div className={`turnstile-container my-3 min-h-[65px] flex justify-start items-center ${className}`}>
      <div ref={containerRef} />
    </div>
  );
});

export default TurnstileWidget;

