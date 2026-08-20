"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import Link from "next/link";

const SARCASTIC_HINTS = [
  "Hayoo tebak passwordnya 😂",
  "Akses terbatas. Mau nyoba your luck kah ? wkwkkw",
  "Bukan urusan lo passwordnya apa.",
  "Percaya diri banget lu mau masuk sini.",
  "Spoiler: bukan '123456'.",
];

const hint = SARCASTIC_HINTS[Math.floor(Math.random() * SARCASTIC_HINTS.length)];

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-sm relative">
        {/* Icon + heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Admin Only.</h1>
          <p className="text-neutral-600 text-xs mt-1.5 max-w-[220px] mx-auto leading-relaxed">
            {hint}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm">
          <form action={formAction} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-neutral-500 mb-2 tracking-widest uppercase"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                placeholder="••••••••••"
                className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
              />
            </div>

            {state?.error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
                <span className="text-base">💀</span>
                <p className="text-red-400 text-xs">{state.error} — salah lagi bro.</p>
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={pending}
              className="w-full bg-white text-black text-sm font-semibold py-3 rounded-xl hover:bg-neutral-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Cek dulu...
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-[10px] text-neutral-700 hover:text-neutral-500 transition-colors tracking-widest uppercase"
          >
            ← Balik dulu
          </Link>
        </div>
      </div>
    </div>
  );
}
