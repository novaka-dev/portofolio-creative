import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, ArrowUpRight } from "lucide-react";

// ── Marquee ─────────────────────────────────────────────────────────────────
const MARQUEE = [
  "GRAPHIC DESIGN",
  "VIDEO EDITING",
  "THUMBNAIL",
  "CAROUSEL",
  "POSTER",
  "BANNER",
  "YOUTUBE",
  "TIKTOK",
  "MOTION GRAPHIC",
  "BRAND VISUAL",
];

// ── Style constants ──────────────────────────────────────────────────────────
const OUTLINE_TEXT: CSSProperties = {
  WebkitTextStroke: "1.5px rgba(255,255,255,0.2)",
  color: "transparent",
};

const GRAIN: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "200px 200px",
  opacity: 0.03,
};

// ── Preview images for Design panel ─────────────────────────────────────────
const DESIGN_PREVIEWS = [
  "/works/thumbnail/thumbnail fantasy 1.jpg",
  "/works/carousel/carousel_01.gif",
  "/works/poster/Vintage Kenangan.jpg",
];

// ───────────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <div className="bg-black text-white overflow-x-hidden">

      {/* Grain overlay — fixed, behind everything interactive */}
      <div aria-hidden className="fixed inset-0 z-50 pointer-events-none" style={GRAIN} />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* HEADER                                                             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 sm:px-10 py-4 border-b border-white/[0.06]">
        {/* Left: photo + name */}
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/20 flex-shrink-0">
            <Image
              src="/Novaka__-head.png"
              alt="Novaka"
              fill
              sizes="28px"
              className="object-cover"
              priority
            />
          </div>
          <span className="text-[11px] tracking-[0.35em] text-neutral-400 uppercase font-medium">
            Novaka
          </span>
        </div>

        {/* Right: badge + admin */}
        <div className="flex items-center gap-5">
          <span className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.25em] text-emerald-400/80 uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available
          </span>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1 text-[10px] text-neutral-800 hover:text-neutral-500 transition-colors duration-300 tracking-[0.2em] uppercase"
          >
            <Lock size={9} />
            admin
          </Link>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SPLIT PANEL — Graphic Designer  |  Video Editor                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <main className="grid grid-cols-1 md:grid-cols-2">

        {/* ── LEFT: Graphic Designer ─────────────────────────────────────── */}
        <Link
          href="/works/design"
          className="
            group relative flex flex-col justify-between gap-8
            min-h-[75vh] md:min-h-[calc(100vh-57px)]
            px-7 sm:px-10 md:px-12 py-8 md:py-14
            border-b md:border-b-0 md:border-r border-white/[0.06]
            overflow-hidden
            transition-colors duration-500
            hover:bg-neutral-950/60
          "
        >
          {/* Ambient glow on hover */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 20% 50%, rgba(255,255,255,0.03), transparent 70%)",
            }}
          />

          {/* Top row: index + arrow */}
          <div className="flex items-start justify-between">
            <span className="text-[10px] tracking-[0.45em] text-neutral-700 uppercase font-medium">
              01 / Design
            </span>
            <ArrowUpRight
              size={18}
              className="text-neutral-700 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
            />
          </div>

          {/* Center: big type */}
          <div className="flex flex-col">
            <span
              className="font-black uppercase tracking-tight leading-none text-white"
              style={{ fontSize: "clamp(3.5rem, 20vw, 9vw)" }}
            >
              GRAPHIC
            </span>
            <span
              className="font-black uppercase tracking-tight leading-none"
              style={{
                fontSize: "clamp(3.5rem, 20vw, 9vw)",
                ...OUTLINE_TEXT,
              }}
            >
              DESIGNER
            </span>

            {/* Sub-label */}
            <p className="mt-5 text-[10px] sm:text-[11px] tracking-[0.3em] text-neutral-600 uppercase">
              Thumbnail · Carousel · Poster · Banner
            </p>
          </div>

          {/* Bottom: preview images + CTA */}
          <div className="flex flex-col gap-4">
            {/* 3 preview thumbnails — large desktop only */}
            <div className="hidden lg:grid grid-cols-3 gap-2.5">
              {DESIGN_PREVIEWS.map((src) => (
                <div
                  key={src}
                  className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 ring-1 ring-white/[0.06]"
                >
                  <Image
                    src={src}
                    alt="Karya desain Novaka"
                    fill
                    unoptimized
                    className="object-cover opacity-55 group-hover:opacity-85 transition-opacity duration-500"
                  />
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] tracking-[0.25em] text-neutral-600 uppercase group-hover:text-white transition-colors duration-300">
                View Design Work
              </span>
              <span className="text-neutral-700 group-hover:text-white transition-colors duration-300 text-sm">
                →
              </span>
            </div>
          </div>
        </Link>

        {/* ── RIGHT: Video Editor ───────────────────────────────────────── */}
        <Link
          href="/works/videos"
          className="
            group relative flex flex-col justify-between gap-8
            min-h-[75vh] md:min-h-[calc(100vh-57px)]
            px-7 sm:px-10 md:px-12 py-8 md:py-14
            overflow-hidden
            transition-colors duration-500
            hover:bg-neutral-950/60
          "
        >
          {/* Ambient glow on hover */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(255,255,255,0.03), transparent 70%)",
            }}
          />

          {/* Top row: index + arrow */}
          <div className="flex items-start justify-between">
            <span className="text-[10px] tracking-[0.45em] text-neutral-700 uppercase font-medium">
              02 / Video
            </span>
            <ArrowUpRight
              size={18}
              className="text-neutral-700 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
            />
          </div>

          {/* Center: big type */}
          <div className="flex flex-col">
            <span
              className="font-black uppercase tracking-tight leading-none text-white"
              style={{ fontSize: "clamp(3.5rem, 20vw, 11vw)" }}
            >
              VIDEO
            </span>
            <span
              className="font-black uppercase tracking-tight leading-none"
              style={{
                fontSize: "clamp(3.5rem, 20vw, 11vw)",
                ...OUTLINE_TEXT,
              }}
            >
              EDITOR
            </span>

            {/* Sub-label */}
            <p className="mt-5 text-[10px] sm:text-[11px] tracking-[0.3em] text-neutral-600 uppercase">
              YouTube · TikTok · Project
            </p>
          </div>

          {/* Bottom: video preview + CTA */}
          <div className="flex flex-col gap-4">
            {/* Video preview — large desktop only */}
            <div className="hidden lg:block relative aspect-video rounded-xl overflow-hidden bg-neutral-900 ring-1 ring-white/[0.06]">
              <Image
                src="/works/thumbnail/maxresdefault.webp"
                alt="Video editing preview"
                fill
                unoptimized
                className="object-cover opacity-55 group-hover:opacity-85 transition-opacity duration-500"
              />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center group-hover:scale-110 group-hover:bg-black/70 transition-all duration-300">
                  <svg
                    width="13"
                    height="15"
                    viewBox="0 0 12 14"
                    fill="currentColor"
                    className="text-white/60 group-hover:text-white ml-0.5 transition-colors duration-300"
                  >
                    <path d="M0 0l12 7-12 7V0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] tracking-[0.25em] text-neutral-600 uppercase group-hover:text-white transition-colors duration-300">
                View Videos
              </span>
              <span className="text-neutral-700 group-hover:text-white transition-colors duration-300 text-sm">
                →
              </span>
            </div>
          </div>
        </Link>
      </main>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* MARQUEE STRIP                                                       */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.06] py-4 overflow-hidden bg-neutral-950/60 backdrop-blur-sm">
        <div className="flex animate-marquee will-change-transform">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 flex items-center gap-5 px-5 text-[10px] tracking-[0.3em] text-neutral-700 uppercase font-medium"
            >
              {item}
              <span className="text-neutral-800">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
