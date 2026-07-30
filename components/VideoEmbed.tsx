"use client";

import ReactPlayer from "react-player";

export default function VideoEmbed({
  platform,
  url,
}: {
  platform: "youtube" | "tiktok" | "cloudinary";
  url: string;
}) {
  if (platform === "cloudinary") {
    return (
      <div className="relative w-full aspect-[9/16] max-w-[300px] mx-auto rounded-2xl overflow-hidden bg-neutral-900">
        <video
          src={url}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  // youtube & tiktok — TIDAK DIUBAH
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-900">
      <ReactPlayer
        src={url}
        width="100%"
        height="100%"
        controls
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}
