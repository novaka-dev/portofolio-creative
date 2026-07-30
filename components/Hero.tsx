import Image from "next/image";
import CategoryButton from "./CategoryButton";
import { categories } from "@/lib/works";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(60,60,65,0.35), rgba(0,0,0,0) 70%), #000",
      }}
    >
      {/* Main content */}
      <div className="-translate-y-8 sm:-translate-y-12 flex flex-col items-center">
        {/* Profile */}
        <div
          className="
            relative w-40 h-40 rounded-4xl overflow-hidden mb-10
            transition-all duration-500 ease-out
            hover:scale-105
            hover:-translate-y-2
            hover:rotate-1
            hover:shadow-[0_20px_60px_rgba(255,255,255,0.12)]
          "
        >
          <Image
            src="/Novaka__-head.png"
            alt="Foto profil"
            fill
            sizes="160px"
            className="
              object-cover
              transition-transform duration-700 ease-out
              hover:scale-110
            "
          />
        </div>

        {/* Title */}
        <h1 className="font-black uppercase leading-[0.95] text-4xl sm:text-8xl">
          <span className="text-white">Hi I am NOVAKA</span>
          <br />
          <span className="text-neutral-600">
            Graphic Designer
            <br />- Editor
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 text-xs sm:text-sm tracking-[0.2em] text-neutral-500 uppercase max-w-xs">
          Contact me if you want to work with me
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
          {categories.map((c) => (
            <div
              key={c.slug}
              className="
                transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:scale-[1.03]
              "
            >
              <CategoryButton href={`/works/${c.slug}`} label={c.label} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-neutral-500">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14" />
          <path d="M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
