import Image from "next/image";
import { works, WorkItem } from "@/lib/works";
import VideoEmbed from "./VideoEmbed";

export default function WorksGrid({
  category,
  aspect,
}: {
  category: string;
  aspect: string;
}) {
  const items = works.filter((w: WorkItem) => w.category === category);

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
            <Image src={item.src} alt="" fill className="object-cover" />
          </div>
        ) : null,
      )}
    </div>
  );
}
