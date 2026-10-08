export default function Loading() {
  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden px-6">
      {/* Ambient Radial Background Glow */}
      <div className="absolute h-72 w-72 rounded-full bg-gradient-to-tr from-purple-600/25 to-indigo-500/15 blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Futuristic Multi-Ring Spinner */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* Outer dashed tech orbit */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40 dark:border-purple-400/30 animate-[spin_8s_linear_infinite]" />

          {/* Glowing gradient spinner ring */}
          <div className="absolute inset-1 rounded-full border-[2.5px] border-transparent border-t-purple-600 border-r-indigo-500 dark:border-t-purple-400 dark:border-r-indigo-400 animate-[spin_1.2s_cubic-bezier(0.5,0,0.5,1)_infinite] drop-shadow-[0_0_14px_rgba(168,85,247,0.6)]" />

          {/* Counter-rotating subtle inner ring */}
          <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-blue-600/70 dark:border-b-blue-400/80 animate-[spin_1.8s_linear_infinite_reverse]" />

          {/* Core pulsing energy dot */}
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 shadow-[0_0_12px_#a855f7] animate-ping" />
          <div className="absolute h-2 w-2 rounded-full bg-purple-700 dark:bg-white shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
        </div>

        {/* Minimal Monospace High-Tech Status Badge */}
        <div className="flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase text-slate-700 dark:text-neutral-300 font-semibold px-4 py-1.5 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 shadow-sm backdrop-blur-md">
          <span className="inline-block h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
          <span>// <span className="normal-case">pyBIM</span>_KERNEL_SYNC</span>
        </div>
      </div>
    </div>
  );
}
