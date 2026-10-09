"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * ArchitecturalCanvas — Original BIM-inspired isometric technical drawing.
 * 
 * Animation Stages:
 * 1. Coordinate origin & directional axis vectors draw outward
 * 2. Ground spatial coordination grid lines emerge
 * 3. Isometric volumetric prisms draw their structural wireframes
 * 4. Translucent spatial surfaces fade in & precision nodes highlight
 * 5. Full geometry settles into a stable, serene engineering presentation
 * 
 * Supports full light & dark theme styling and instant render when prefers-reduced-motion is active.
 */
export default function ArchitecturalCanvas({ className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const idPrefix = useId();

  // Animation variants respecting reduced motion
  const axisVariant = {
    hidden: { pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 0.7 : 0 },
    visible: {
      pathLength: 1,
      opacity: 0.75,
      transition: { duration: shouldReduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const gridLineVariant = {
    hidden: { pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 0.35 : 0 },
    visible: {
      pathLength: 1,
      opacity: 0.4,
      transition: { duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const wireframeVariant = {
    hidden: { pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 0.9 : 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.85, delay: shouldReduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const surfaceVariant = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" },
    },
  };

  const nodeVariant = {
    hidden: { scale: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 0.85 : 0 },
    visible: {
      scale: 1,
      opacity: 0.9,
      transition: { duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="0 0 760 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-slate-500 dark:text-blue-300 opacity-60 dark:opacity-80 transition-opacity duration-300"
      >
        <defs>
          {/* Surface Gradients */}
          <linearGradient id={`${idPrefix}-isoTop`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-isoFront`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-isoSide`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
          </linearGradient>

          {/* Cyan Highlighting Plane */}
          <linearGradient id={`${idPrefix}-cyanPlane`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* ================= 1. COORDINATE AXES (X, Y, Z) ================= */}
        <g>
          {/* Axis +X */}
          <motion.line
            x1="430"
            y1="350"
            x2="650"
            y2="475"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="4 4"
            variants={axisVariant}
            initial="hidden"
            animate="visible"
          />
          {/* Axis +Y */}
          <motion.line
            x1="430"
            y1="350"
            x2="210"
            y2="475"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="4 4"
            variants={axisVariant}
            initial="hidden"
            animate="visible"
          />
          {/* Axis +Z (Elevation) */}
          <motion.line
            x1="430"
            y1="350"
            x2="430"
            y2="110"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="4 4"
            variants={axisVariant}
            initial="hidden"
            animate="visible"
          />

          {/* Coordinate Vector Labels */}
          <motion.text
            x="658"
            y="485"
            fill="currentColor"
            fontSize="10"
            fontFamily="monospace"
            variants={surfaceVariant}
            initial="hidden"
            animate="visible"
            className="font-mono text-technical opacity-70"
          >
            +X
          </motion.text>
          <motion.text
            x="180"
            y="485"
            fill="currentColor"
            fontSize="10"
            fontFamily="monospace"
            variants={surfaceVariant}
            initial="hidden"
            animate="visible"
            className="font-mono text-technical opacity-70"
          >
            +Y
          </motion.text>
          <motion.text
            x="422"
            y="98"
            fill="currentColor"
            fontSize="10"
            fontFamily="monospace"
            variants={surfaceVariant}
            initial="hidden"
            animate="visible"
            className="font-mono text-technical opacity-70"
          >
            +Z
          </motion.text>
        </g>

        {/* ================= 2. ISOMETRIC GROUND SPATIAL GRID ================= */}
        <g stroke="currentColor" strokeWidth="0.75">
          <motion.line x1="280" y1="430" x2="540" y2="580" variants={gridLineVariant} initial="hidden" animate="visible" />
          <motion.line x1="330" y1="400" x2="590" y2="550" variants={gridLineVariant} initial="hidden" animate="visible" />
          <motion.line x1="380" y1="375" x2="640" y2="525" variants={gridLineVariant} initial="hidden" animate="visible" />
          <motion.line x1="430" y1="350" x2="690" y2="500" variants={gridLineVariant} initial="hidden" animate="visible" />

          <motion.line x1="500" y1="385" x2="240" y2="535" variants={gridLineVariant} initial="hidden" animate="visible" />
          <motion.line x1="550" y1="410" x2="290" y2="560" variants={gridLineVariant} initial="hidden" animate="visible" />
          <motion.line x1="600" y1="435" x2="340" y2="585" variants={gridLineVariant} initial="hidden" animate="visible" />
        </g>

        {/* ================= 3. BASE STRUCTURAL PRISM (LEVEL 00) ================= */}
        <g stroke="currentColor" strokeWidth="1.25">
          {/* Top Face */}
          <motion.polygon
            points="430,300 560,375 430,450 300,375"
            fill={`url(#${idPrefix}-isoTop)`}
            variants={surfaceVariant}
            initial="hidden"
            animate="visible"
          />
          {/* Left Face */}
          <motion.polygon
            points="300,375 430,450 430,515 300,440"
            fill={`url(#${idPrefix}-isoFront)`}
            variants={surfaceVariant}
            initial="hidden"
            animate="visible"
          />
          {/* Right Face */}
          <motion.polygon
            points="430,450 560,375 560,440 430,515"
            fill={`url(#${idPrefix}-isoSide)`}
            variants={surfaceVariant}
            initial="hidden"
            animate="visible"
          />
        </g>

        {/* ================= 4. CANTILEVERED OFFSET PRISM (LEVEL 01) ================= */}
        <g stroke="currentColor" strokeWidth="1.25">
          {/* Upper Cyan Accented Plane */}
          <motion.polygon
            points="460,185 620,275 460,365 300,275"
            fill={`url(#${idPrefix}-cyanPlane)`}
            stroke="#38bdf8"
            strokeWidth="1.3"
            variants={wireframeVariant}
            initial="hidden"
            animate="visible"
          />
          {/* Left Vertical Face */}
          <motion.polygon
            points="300,275 460,365 460,405 300,315"
            fill={`url(#${idPrefix}-isoFront)`}
            variants={surfaceVariant}
            initial="hidden"
            animate="visible"
          />
          {/* Right Vertical Face */}
          <motion.polygon
            points="460,365 620,275 620,315 460,405"
            fill={`url(#${idPrefix}-isoSide)`}
            variants={surfaceVariant}
            initial="hidden"
            animate="visible"
          />
        </g>

        {/* ================= 5. STRUCTURAL CORE TOWER (LEVEL 02) ================= */}
        <g stroke="currentColor" strokeWidth="1.25">
          <motion.polygon
            points="430,110 505,155 430,195 355,155"
            fill={`url(#${idPrefix}-isoTop)`}
            variants={wireframeVariant}
            initial="hidden"
            animate="visible"
          />
          <motion.polygon
            points="355,155 430,195 430,280 355,240"
            fill={`url(#${idPrefix}-isoFront)`}
            variants={surfaceVariant}
            initial="hidden"
            animate="visible"
          />
          <motion.polygon
            points="430,195 505,155 505,240 430,280"
            fill={`url(#${idPrefix}-isoSide)`}
            variants={surfaceVariant}
            initial="hidden"
            animate="visible"
          />
        </g>

        {/* Hidden Internal Structural Lines */}
        <motion.g
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          opacity="0.5"
          variants={wireframeVariant}
          initial="hidden"
          animate="visible"
        >
          <line x1="300" y1="375" x2="430" y2="445" />
          <line x1="430" y1="445" x2="560" y2="375" />
          <line x1="430" y1="445" x2="430" y2="515" />
        </motion.g>

        {/* ================= 6. DIMENSION WITNESS MARKS ================= */}
        <motion.g
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.65"
          variants={surfaceVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Level 02 Marker */}
          <line x1="505" y1="110" x2="610" y2="110" />
          <line x1="605" y1="105" x2="615" y2="115" strokeWidth="1.5" />
          <text x="622" y="113" fill="currentColor" fontSize="10" fontFamily="monospace" fontWeight="bold">LVL 02</text>

          {/* Level 01 Marker */}
          <line x1="620" y1="275" x2="700" y2="275" />
          <line x1="695" y1="270" x2="705" y2="280" strokeWidth="1.5" />
          <text x="712" y="278" fill="currentColor" fontSize="10" fontFamily="monospace" fontWeight="bold">LVL 01</text>

          {/* Base Datum Marker */}
          <line x1="560" y1="515" x2="650" y2="515" />
          <line x1="645" y1="510" x2="655" y2="520" strokeWidth="1.5" />
          <text x="662" y="518" fill="currentColor" fontSize="10" fontFamily="monospace">BASE</text>
        </motion.g>

        {/* ================= 7. PRECISION COORDINATE NODES ================= */}
        <g fill="currentColor">
          <motion.circle cx="430" cy="110" r="3" variants={nodeVariant} initial="hidden" animate="visible" />
          <motion.circle cx="460" cy="185" r="3" variants={nodeVariant} initial="hidden" animate="visible" />
          <motion.circle cx="620" cy="275" r="3.5" fill="#38bdf8" variants={nodeVariant} initial="hidden" animate="visible" />
          <motion.circle cx="300" cy="275" r="3" variants={nodeVariant} initial="hidden" animate="visible" />
          <motion.circle cx="460" cy="365" r="3.5" fill="#38bdf8" variants={nodeVariant} initial="hidden" animate="visible" />
          <motion.circle cx="430" cy="450" r="3" variants={nodeVariant} initial="hidden" animate="visible" />
          <motion.circle cx="430" cy="515" r="3" variants={nodeVariant} initial="hidden" animate="visible" />
        </g>
      </svg>
    </div>
  );
}
