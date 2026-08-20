"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { DesignSubCategory } from "@/lib/works";
import DesignCarousel from "@/components/DesignCarousel";
import Contact from "@/components/Contact";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// ---------------------------------------------------------------------------
// Sub-category configuration
// ---------------------------------------------------------------------------
type SubCatConfig = {
  id: DesignSubCategory;
  label: string;
  description: string;
  layout: "grid" | "carousel" | "masonry";
  aspect: string;
  carouselMaxWidth?: string;
  gridCols?: string;
};

const SUB_CATS: SubCatConfig[] = [
  {
    id: "thumbnail",
    label: "Thumbnail",
    description: "YouTube thumbnail",
    layout: "grid",
    aspect: "aspect-video",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
  {
    id: "carousel",
    label: "Carousel",
    description: "Carousel slide — IG, TikTok, Reels",
    layout: "carousel",
    aspect: "aspect-[4/5]",
    carouselMaxWidth: "w-[240px]",
  },
  {
    id: "poster",
    label: "Poster",
    description: "Poster & flyer",
    layout: "masonry",
    aspect: "",
  },
  {
    id: "banner",
    label: "Banner",
    description: "all banner",
    layout: "grid",
    aspect: "aspect-[3/1]",
    gridCols: "grid-cols-1",
  },
];

// ---------------------------------------------------------------------------
// Size presets
// ---------------------------------------------------------------------------
type SizeKey = "sm" | "md" | "lg";
const SIZE_OPTIONS: { key: SizeKey; label: string }[] = [
  { key: "sm", label: "S" },
  { key: "md", label: "M" },
  { key: "lg", label: "L" },
];
const GRID_SIZE: Record<SizeKey, string> = {
  sm: "grid-cols-2 sm:grid-cols-3",
  md: "grid-cols-1 sm:grid-cols-2",
  lg: "grid-cols-1",
};
const YT_GRID_SIZE: Record<SizeKey, string> = {
  sm: "grid-cols-2",
  md: "grid-cols-1",
  lg: "grid-cols-1",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type TabId = "thumbnail" | "carousel" | "poster" | "banner";

export type DesignItem = {
  id: string;
  src: string;
  subCategory?: DesignSubCategory;
  groupName?: string;
};

export type DesignClientProps = {
  items: DesignItem[];
  ytBannerItems: DesignItem[];
};

// ---------------------------------------------------------------------------
// Helper — group carousel items by groupName
// ---------------------------------------------------------------------------
function groupCarouselItems(items: DesignItem[]): { label: string; slides: DesignItem[] }[] {
  const map = new Map<string, DesignItem[]>();
  for (const item of items) {
    const key = item.groupName?.trim() || "__ungrouped__";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  const result: { label: string; slides: DesignItem[] }[] = [];
  // Ungrouped dulu (dari works.ts lama), lalu yang punya nama
  if (map.has("__ungrouped__")) {
    result.push({ label: "", slides: map.get("__ungrouped__")! });
    map.delete("__ungrouped__");
  }
  for (const [label, slides] of map) {
    result.push({ label, slides });
  }
  return result;
}

// ---------------------------------------------------------------------------
// Client Component
// ---------------------------------------------------------------------------
export default function DesignClient({ items, ytBannerItems }: DesignClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("thumbnail");
  const [size, setSize] = useState<SizeKey>("md");
  const [ytSize, setYtSize] = useState<SizeKey>("md");

  const currentConfig = SUB_CATS.find((c) => c.id === activeTab)!;
  const tabItems = items.filter((w) => w.subCategory === activeTab);

  const isCarousel = currentConfig.layout === "carousel";
  const isMasonry = currentConfig.layout === "masonry";
  const isGrid = currentConfig.layout === "grid";
  const gridCols = isGrid
    ? GRID_SIZE[size] ?? currentConfig.gridCols ?? "grid-cols-1 sm:grid-cols-2"
    : "";
  const ytGridCols = YT_GRID_SIZE[ytSize];

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-10">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-xs font-bold uppercase mb-8 hover:bg-neutral-200 transition-colors"
      >
        ← Home
      </Link>

      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
          Design
        </h1>
        <p className="mt-2 text-xs tracking-[0.2em] text-neutral-500 uppercase">
          Thumbnail · Carousel · Poster · Banner
        </p>
      </div>

      {/* ---- Tab bar ---- */}
      <div className="flex gap-2 flex-wrap mb-8">
        {SUB_CATS.map((cat) => {
          const isActive = activeTab === (cat.id as TabId);
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as TabId)}
              className={`
                px-4 py-2 rounded-full text-xs font-bold uppercase
                transition-all duration-200
                ${
                  isActive
                    ? "bg-white text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-white"
                }
              `}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ---- Sub-category header ---- */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">
            {currentConfig.description}
            {activeTab === "banner" && ""}
          </p>
          <p className="text-neutral-600 text-xs mt-1">
            {activeTab === "banner"
              ? `${tabItems.length + ytBannerItems.length} item${tabItems.length + ytBannerItems.length !== 1 ? "s" : ""}`
              : `${tabItems.length} item${tabItems.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Size picker — only show for grid layouts */}
        {isGrid && (
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-full p-1">
            {SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSize(opt.key)}
                className={`
                  w-8 h-8 rounded-full text-xs font-bold transition-all duration-150
                  ${
                    size === opt.key
                      ? "bg-white text-black"
                      : "text-neutral-500 hover:text-white"
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Swipe hint — only show for carousel */}
        {isCarousel && (
          <p className="text-[11px] text-neutral-600 tracking-widest uppercase flex items-center gap-1">
            ← geser →
          </p>
        )}
      </div>

      {/* ---- Content area ---- */}
      {isCarousel ? (
        // Carousel — render per grup
        tabItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-neutral-600 text-sm">Belum ada karya di sini.</p>
            <p className="text-neutral-700 text-xs mt-1">Tambahkan lewat Admin Dashboard</p>
          </div>
        ) : (
          <div className="flex flex-col gap-14">
            {groupCarouselItems(tabItems).map((group, idx) => (
              <div key={group.label || `__group_${idx}`}>
                {/* Label grup — hanya tampil kalau ada nama */}
                {group.label && (
                  <div className="flex items-center gap-3 mb-5">
                    <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase font-medium">
                      {group.label}
                    </p>
                    <span className="flex-1 h-px bg-neutral-800" />
                    <p className="text-[10px] text-neutral-700">
                      {group.slides.length} slide
                    </p>
                  </div>
                )}
                <div className="px-4">
                  <DesignCarousel
                    items={group.slides.map((i) => ({ id: i.id, src: i.src }))}
                    slideAspect={currentConfig.aspect}
                    desktopSlides={3}
                    mobileSlides={1}
                  />
                </div>
              </div>
            ))}
          </div>
        )
      ) : isMasonry ? (
        tabItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-neutral-600 text-sm">Belum ada karya di sini.</p>
            <p className="text-neutral-700 text-xs mt-1">Tambahkan lewat Admin Dashboard</p>
          </div>
        ) : (
          <PhotoProvider
            maskOpacity={0.85}
            bannerVisible={false}
            toolbarRender={() => null}
          >
            <div
              style={{ columns: "2", columnGap: "1rem" }}
              className="sm:[columns:3]"
            >
              {tabItems.map((item) => (
                <PhotoView key={item.id} src={item.src}>
                  <div className="break-inside-avoid mb-4 rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-white/5 group cursor-zoom-in">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt=""
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        )
      ) : activeTab === "banner" ? (
        <div className="flex flex-col gap-12">
          {/* Section 1: Banner biasa */}
          <div>
            <p className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase mb-4">
              Social Media / Web Banner — 3 : 1
            </p>
            {tabItems.length === 0 ? (
              <p className="text-neutral-700 text-sm py-6">Belum ada banner. Tambahkan lewat Admin Dashboard</p>
            ) : (
              <PhotoProvider maskOpacity={0.85} bannerVisible={false} toolbarRender={() => null}>
                <div className={`grid ${gridCols} gap-4`}>
                  {tabItems.map((item) => (
                    <PhotoView key={item.id} src={item.src}>
                      <div className="relative w-full aspect-[3/1] rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-white/5 group cursor-zoom-in">
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </PhotoView>
                  ))}
                </div>
              </PhotoProvider>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-800" />

          {/* Section 2: Banner YouTube */}
          <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
              <p className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
                Banner YouTube
              </p>
              <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-full p-1">
                {SIZE_OPTIONS.filter((o) => o.key !== "lg").map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setYtSize(opt.key)}
                    className={`
                      w-8 h-8 rounded-full text-xs font-bold transition-all duration-150
                      ${
                        ytSize === opt.key
                          ? "bg-white text-black"
                          : "text-neutral-500 hover:text-white"
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-neutral-700 mb-4">
              2560 × 1440 px · safe zone ~2560 × 423 px
            </p>
            {ytBannerItems.length === 0 ? (
              <p className="text-neutral-700 text-sm py-6">Belum ada banner YouTube. Tambahkan lewat Admin Dashboard</p>
            ) : (
              <PhotoProvider maskOpacity={0.85} bannerVisible={false} toolbarRender={() => null}>
                <div className={`grid ${ytGridCols} gap-4 transition-all duration-300`}>
                  {ytBannerItems.map((item) => (
                    <PhotoView key={item.id} src={item.src}>
                      <div className="relative w-full aspect-[6/1] rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-white/5 group cursor-zoom-in">
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </PhotoView>
                  ))}
                </div>
              </PhotoProvider>
            )}
          </div>
        </div>
      ) : (
        /* Grid layout — thumbnail */
        tabItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-neutral-600 text-sm">Belum ada karya di sini.</p>
            <p className="text-neutral-700 text-xs mt-1">Tambahkan lewat Admin Dashboard</p>
          </div>
        ) : (
          <PhotoProvider maskOpacity={0.85} bannerVisible={false} toolbarRender={() => null}>
            <div className={`grid ${gridCols} gap-4 transition-all duration-300`}>
              {tabItems.map((item) => (
                <PhotoView key={item.id} src={item.src}>
                  <div
                    className={`relative w-full ${currentConfig.aspect} rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-white/5 group cursor-zoom-in`}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        )
      )}

      {/* Contact */}
      <div className="mt-24">
        <Contact />
      </div>
    </main>
  );
}
