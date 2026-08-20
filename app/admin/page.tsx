import { supabaseAdmin } from "@/lib/supabase-admin";
import { logoutAction } from "./actions";
import UploadPhotoForm from "./_components/UploadPhotoForm";
import AddVideoForm from "./_components/AddVideoForm";
import ItemsList from "./_components/ItemsList";
import type { DbWork } from "@/lib/supabase";
import Link from "next/link";

// Tab navigation (server-side via searchParams)
type Tab = "upload" | "video" | "manage";

async function getWorks(): Promise<DbWork[]> {
  const { data, error } = await supabaseAdmin
    .from("works")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching works:", error);
    return [];
  }
  return (data as DbWork[]) ?? [];
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const currentTab: Tab = (params.tab as Tab) ?? "upload";
  const works = await getWorks();

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "upload", label: "Upload Foto", icon: "📸" },
    { id: "video", label: "Tambah Video", icon: "🎬" },
    { id: "manage", label: `Kelola Item (${works.length})`, icon: "🗂️" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">Admin Dashboard</h1>
              <p className="text-[10px] text-neutral-500">Novaka Portfolio</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Lihat Porto
            </Link>
            <form action={logoutAction}>
              <button
                id="admin-logout-btn"
                type="submit"
                className="text-xs text-neutral-500 hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Item",
              value: works.length,
              icon: "🗂️",
              color: "from-violet-500/10",
            },
            {
              label: "Foto",
              value: works.filter((w) => w.type === "image").length,
              icon: "📸",
              color: "from-blue-500/10",
            },
            {
              label: "Video",
              value: works.filter((w) => w.type === "video").length,
              icon: "🎬",
              color: "from-orange-500/10",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} to-transparent border border-white/[0.06] rounded-2xl p-4`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-1 mb-6">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/admin?tab=${tab.id}`}
              id={`admin-tab-${tab.id}`}
              className={`flex-1 text-center text-sm py-2.5 px-3 rounded-xl font-medium transition-all ${
                currentTab === tab.id
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span className="mr-1.5">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </Link>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          {currentTab === "upload" && (
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Upload Foto</h2>
              <p className="text-neutral-500 text-sm mb-6">
                Upload gambar desain, PFP, atau karya lainnya ke portofolio.
              </p>
              <UploadPhotoForm />
            </div>
          )}

          {currentTab === "video" && (
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Tambah Video</h2>
              <p className="text-neutral-500 text-sm mb-6">
                Tambahkan link video YouTube, TikTok, atau Cloudinary ke portofolio.
              </p>
              <AddVideoForm />
            </div>
          )}

          {currentTab === "manage" && (
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Kelola Item</h2>
              <p className="text-neutral-500 text-sm mb-6">
                Item yang diupload lewat dashboard. Klik 🗑️ untuk menghapus.
              </p>
              <ItemsList items={works} />
            </div>
          )}
        </div>

        {/* Info box */}
        <div className="mt-4 bg-white/[0.02] border border-white/[0.04] rounded-xl px-4 py-3 flex items-start gap-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-neutral-600 text-xs leading-relaxed">
            Item yang diupload di sini akan muncul di portofolio bersama item lama dari <code className="text-neutral-500">works.ts</code>.
            Perubahan langsung tampil tanpa perlu deploy ulang.
          </p>
        </div>
      </main>
    </div>
  );
}
