"use client";

import { useActionState } from "react";
import { addVideoAction } from "../actions";

export default function AddVideoForm() {
  const [state, formAction, pending] = useActionState(addVideoAction, null);

  return (
    <form action={formAction} className="space-y-5">
      {/* URL Input */}
      <div>
        <label htmlFor="video-url" className="block text-sm font-medium text-neutral-300 mb-2">
          URL Video
        </label>
        <input
          id="video-url"
          name="url"
          type="url"
          required
          placeholder="https://youtu.be/... atau https://tiktok.com/..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
        />
        <p className="text-neutral-600 text-xs mt-1.5">
          Mendukung: YouTube, TikTok, atau direct video URL (Cloudinary, dll.)
        </p>
      </div>

      {/* Platform hint */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "YouTube", icon: "🎬", example: "youtu.be/..." },
          { label: "TikTok", icon: "🎵", example: "tiktok.com/..." },
          { label: "Cloudinary", icon: "☁️", example: "cloudinary.com/..." },
        ].map((p) => (
          <div
            key={p.label}
            className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center"
          >
            <div className="text-2xl mb-1">{p.icon}</div>
            <div className="text-xs font-medium text-neutral-400">{p.label}</div>
            <div className="text-[10px] text-neutral-700 mt-0.5 truncate">{p.example}</div>
          </div>
        ))}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="video-category" className="block text-sm font-medium text-neutral-300 mb-2">
          Kategori
        </label>
        <select
          id="video-category"
          name="category"
          defaultValue="videos"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
        >
          <option value="videos" className="bg-neutral-900">Videos</option>
        </select>
      </div>

      {/* Error / Success */}
      {state?.error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-400 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className="text-red-400 text-sm">{state.error}</p>
        </div>
      )}

      {state?.success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-400 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-green-400 text-sm">Video berhasil ditambahkan!</p>
        </div>
      )}

      <button
        id="add-video-submit-btn"
        type="submit"
        disabled={pending}
        className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-100 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Menyimpan...
          </span>
        ) : (
          "Tambah Video"
        )}
      </button>
    </form>
  );
}
