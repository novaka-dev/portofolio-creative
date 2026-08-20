"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import { uploadImageAction } from "../actions";

const categories = [
  { value: "design", label: "Design" },
  { value: "pfp-samples", label: "PFP Samples" },
];

const subCategories: Record<string, { value: string; label: string }[]> = {
  design: [
    { value: "thumbnail", label: "Thumbnail" },
    { value: "carousel", label: "Carousel" },
    { value: "poster", label: "Poster" },
    { value: "banner", label: "Banner" },
    { value: "banner-youtube", label: "Banner YouTube" },
  ],
  "pfp-samples": [],
};

export default function UploadPhotoForm() {
  const [state, formAction, pending] = useActionState(uploadImageAction, null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("design");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  function handleSuccess() {
    if (state?.success) {
      setPreview(null);
      formRef.current?.reset();
    }
  }

  // Reset form setelah sukses
  if (state?.success && preview) {
    setPreview(null);
    setSelectedSubCategory("");
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {/* File picker */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          File Foto
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:border-white/20 transition-colors group"
        >
          {preview ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <Image src={preview} alt="preview" fill className="object-contain" unoptimized />
            </div>
          ) : (
            <div className="py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 mx-auto text-neutral-600 mb-3 group-hover:text-neutral-400 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <p className="text-neutral-500 text-sm">Klik untuk pilih foto</p>
              <p className="text-neutral-700 text-xs mt-1">JPG, PNG, WEBP, GIF — maks 10MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            id="upload-file-input"
            type="file"
            name="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="upload-category" className="block text-sm font-medium text-neutral-300 mb-2">
          Kategori
        </label>
        <select
          id="upload-category"
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value} className="bg-neutral-900">
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sub Category (conditional) */}
      {subCategories[selectedCategory]?.length > 0 && (
        <div>
          <label htmlFor="upload-subcat" className="block text-sm font-medium text-neutral-300 mb-2">
            Sub Kategori
          </label>
          <select
            id="upload-subcat"
            name="subCategory"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
          >
            <option value="" className="bg-neutral-900">— Tidak ada —</option>
            {subCategories[selectedCategory].map((sub) => (
              <option key={sub.value} value={sub.value} className="bg-neutral-900">
                {sub.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Group name — muncul hanya saat subCategory carousel */}
      {selectedSubCategory === "carousel" && (
        <div>
          <label htmlFor="upload-groupname" className="block text-sm font-medium text-neutral-300 mb-2">
            Nama Grup Carousel
            <span className="ml-2 text-[10px] text-neutral-600 font-normal tracking-wide">(misal: Kang Raka, Brand X)</span>
          </label>
          <input
            id="upload-groupname"
            name="groupName"
            type="text"
            placeholder="Nama klien atau tema carousel"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
          />
          <p className="mt-1.5 text-[11px] text-neutral-700">
            Slide dengan nama grup yang sama akan tampil dalam satu carousel di portofolio.
          </p>
        </div>
      )}

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
          <p className="text-green-400 text-sm">Foto berhasil diupload!</p>
        </div>
      )}

      <button
        id="upload-submit-btn"
        type="submit"
        disabled={pending || !preview}
        className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-100 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading...
          </span>
        ) : (
          "Upload Foto"
        )}
      </button>
    </form>
  );
}
