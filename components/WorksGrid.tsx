import Image from "next/image";
import { works as staticWorks, WorkItem } from "@/lib/works";
import VideoEmbed from "./VideoEmbed";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { DbWork } from "@/lib/supabase";

// Konversi DbWork dari Supabase ke WorkItem
function dbToWorkItem(dbWork: DbWork): WorkItem {
  if (dbWork.type === "image") {
    return {
      id: dbWork.id,
      type: "image",
      category: dbWork.category,
      subCategory: dbWork.sub_category as
        | "thumbnail"
        | "carousel"
        | "poster"
        | "banner"
        | "banner-youtube"
        | undefined,
      src: dbWork.src ?? "",
    };
  }
  return {
    id: dbWork.id,
    type: "video",
    category: dbWork.category,
    platform: (dbWork.platform ?? "cloudinary") as "youtube" | "tiktok" | "cloudinary",
    url: dbWork.url ?? "",
  };
}

async function fetchDbWorks(category: string): Promise<WorkItem[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("works")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[WorksGrid] Supabase error:", error.message);
      return [];
    }
    if (!data) return [];
    return (data as DbWork[]).map(dbToWorkItem);
  } catch (e) {
    // Kalau Supabase belum di-setup, fallback ke data kosong
    console.error("[WorksGrid] fetch failed:", e);
    return [];
  }
}

export default async function WorksGrid({
  category,
  aspect,
}: {
  category: string;
  aspect: string;
}) {
  // Fetch dari Supabase (data baru dari dashboard)
  const dbItems = await fetchDbWorks(category);

  // Gabungkan: data baru dari DB di depan, data lama dari works.ts di belakang
  const staticItems = staticWorks.filter((w: WorkItem) => w.category === category);
  const items: WorkItem[] = [...dbItems, ...staticItems];

  if (items.length === 0) {
    return <p className="text-sm text-neutral-500">No works yet.</p>;
  }

  if (category === "videos") {
    const youtubeItems = items.filter(
      (item) => item.type === "video" && item.platform === "youtube",
    );
    const tiktokItems = items.filter(
      (item) => item.type === "video" && item.platform === "tiktok",
    );
    const projectItems = items.filter(
      (item) => item.type === "video" && item.platform === "cloudinary",
    );

    return (
      <div className="flex flex-col gap-16">
        {youtubeItems.length > 0 && (
          <div>
            <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-5">
              YouTube
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {youtubeItems.map((item) =>
                item.type === "video" ? (
                  <VideoEmbed
                    key={item.id}
                    platform={item.platform}
                    url={item.url}
                  />
                ) : null,
              )}
            </div>
          </div>
        )}

        {tiktokItems.length > 0 && (
          <div>
            <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-5">
              TikTok
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tiktokItems.map((item) =>
                item.type === "video" ? (
                  <VideoEmbed
                    key={item.id}
                    platform={item.platform}
                    url={item.url}
                  />
                ) : null,
              )}
            </div>
          </div>
        )}

        {projectItems.length > 0 && (
          <div>
            <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-5">
              Projects
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {projectItems.map((item) =>
                item.type === "video" ? (
                  <VideoEmbed
                    key={item.id}
                    platform={item.platform}
                    url={item.url}
                  />
                ) : null,
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {items.map((item) =>
        item.type === "image" ? (
          <div
            key={item.id}
            className={`relative w-full ${aspect} rounded-2xl overflow-hidden`}
          >
            <Image src={item.src} alt="" fill className="object-cover" unoptimized={item.src.startsWith("https://")} />
          </div>
        ) : null,
      )}
    </div>
  );
}
