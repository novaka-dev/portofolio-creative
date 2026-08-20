"use client";

import { useTransition } from "react";
import Image from "next/image";
import { deleteItemAction } from "../actions";
import type { DbWork } from "@/lib/supabase";

function getVideoLabel(platform: string) {
  const map: Record<string, string> = {
    youtube: "YouTube",
    tiktok: "TikTok",
    cloudinary: "Cloud Video",
  };
  return map[platform] ?? platform;
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    design: "bg-purple-500/15 text-purple-300 border-purple-500/20",
    "pfp-samples": "bg-blue-500/15 text-blue-300 border-blue-500/20",
    videos: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${colors[category] ?? "bg-white/5 text-white/50 border-white/10"}`}>
      {category}
    </span>
  );
}

function ItemCard({ item }: { item: DbWork }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Hapus item ini dari portfolio?")) return;
    startTransition(async () => {
      await deleteItemAction(item.id, item.src);
    });
  }

  return (
    <div className={`relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all ${isPending ? "opacity-40 scale-95" : ""}`}>
      {/* Preview */}
      {item.type === "image" && item.src ? (
        <div className="relative aspect-video w-full bg-neutral-900">
          <Image
            src={item.src}
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-neutral-900 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-1">
              {item.platform === "youtube" ? "🎬" : item.platform === "tiktok" ? "🎵" : "☁️"}
            </div>
            <p className="text-xs text-neutral-500">{getVideoLabel(item.platform ?? "")}</p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <CategoryBadge category={item.category} />
            {item.sub_category && (
              <span className="text-[10px] text-neutral-600">{item.sub_category}</span>
            )}
          </div>
          <button
            id={`delete-item-${item.id}`}
            onClick={handleDelete}
            disabled={isPending}
            className="flex-shrink-0 p-1.5 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
            title="Hapus item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>

        {/* URL snippet untuk video */}
        {item.type === "video" && item.url && (
          <p className="text-[10px] text-neutral-700 mt-1.5 truncate">{item.url}</p>
        )}
      </div>

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
          <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function ItemsList({ items }: { items: DbWork[] }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-3">📭</div>
        <p className="text-neutral-500 text-sm">Belum ada item yang diupload lewat dashboard.</p>
        <p className="text-neutral-700 text-xs mt-1">Item lama dari works.ts tetap tampil di portfolio.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
