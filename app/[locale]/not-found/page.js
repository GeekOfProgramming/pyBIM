import Link from "next/link";
import Image from "next/image";
import { RotateCcw } from "lucide-react";

export default function NotFound() {
  return (
    <main className="fixed inset-0 z-[9999] bg-black overflow-hidden font-sans">
      {/* Background Image Container (Top Half fading to black) */}
      <div className="absolute top-0 left-0 right-0 h-[65vh] z-0">
        <Image
          src="/hero-poster.jpg"
          alt="Sito in costruzione o sfondo"
          fill
          className="object-cover opacity-60"
          quality={100}
        />
        {/* Gradient that fades image to black smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-[5vh] md:pt-[8vh] text-center px-4 w-full">
        {/* Huge 404 Text - Bigger and Shinier */}
        <h1 
          className="text-[200px] md:text-[320px] lg:text-[450px] font-black leading-none text-white/50 tracking-tighter select-none"
          style={{ textShadow: "0 0 60px rgba(255,255,255,0.3), 0 20px 40px rgba(0,0,0,0.8)" }}
        >
          404
        </h1>
        
        {/* Title Text */}
        <h2 className="text-2xl md:text-5xl font-bold text-white mt-4 md:mt-8 tracking-widest uppercase drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)] z-10">
          Sorry, Page Not Found !
        </h2>

        {/* Description Text */}
        <p className="mt-8 md:mt-10 max-w-lg text-gray-300 text-sm md:text-base px-4 drop-shadow-md">
          La pagina che stai cercando non esiste o è stata spostata. 
          Ti invitiamo a tornare alla pagina principale per continuare la navigazione.
        </p>

        {/* Back to Home Button */}
        <Link 
          href="/" 
          className="mt-10 flex items-center justify-center gap-2 rounded bg-[#ffb703] hover:bg-[#fb8500] transition-colors px-10 py-4 text-sm md:text-base font-bold uppercase text-black w-auto shadow-[0_0_30px_rgba(255,183,3,0.4)]"
        >
          Torna Alla Home
          <RotateCcw className="w-5 h-5" />
        </Link>
      </div>
    </main>
  );
}
