export type ImageWork = {
  id: string;
  type: "image";
  category: string;
  src: string;
};

export type VideoWork = {
  id: string;
  type: "video";
  category: string;
  platform: "youtube" | "tiktok" | "cloudinary";
  url: string;
};

export type WorkItem = ImageWork | VideoWork;

// aspect: dipakai buat nyeragamin ukuran card di grid per kategori
export const categories = [
  { slug: "thumbnails", label: "THUMBNAILS", aspect: "aspect-video" },
  { slug: "pfp-samples", label: "PFP SAMPLES", aspect: "aspect-square" },
  { slug: "videos", label: "VIDEOS", aspect: "" },
];

export const works: WorkItem[] = [
  {
    id: "t1",
    type: "image",
    category: "thumbnails",
    src: "/works/Thumbnail Fantasy 1.jpg",
  },
  {
    id: "t2",
    type: "image",
    category: "thumbnails",
    src: "/works/Thumbnail Fantasy 1.jpg",
  },
  {
    id: "t3",
    type: "image",
    category: "thumbnails",
    src: "/works/Thumbnail Fantasy 1.jpg",
  },
  {
    id: "t4",
    type: "image",
    category: "thumbnails",
    src: "/works/Thumbnail Fantasy 1.jpg",
  },

  { id: "p1", type: "image", category: "pfp-samples", src: "/works/pfp-1.jpg" },
  { id: "p2", type: "image", category: "pfp-samples", src: "/works/pfp-2.jpg" },
  { id: "p3", type: "image", category: "pfp-samples", src: "/works/pfp-3.jpg" },
  { id: "p4", type: "image", category: "pfp-samples", src: "/works/pfp-4.jpg" },

  {
    id: "v1",
    type: "video",
    category: "videos",
    platform: "youtube",
    url: "https://youtu.be/WfbismJA1y4?si=OV1t59diNNHxet0i", // ganti link YT kamu
  },
  {
    id: "v2",
    type: "video",
    category: "videos",
    platform: "tiktok",
    url: "https://www.tiktok.com/@vakure/video/7435215762664934674?is_from_webapp=1&sender_device=pc", // ganti link TikTok kamu
  },
  {
    id: "v3",
    type: "video",
    category: "videos",
    platform: "youtube",
    url: "https://youtu.be/OUo6RDpM3h4?si=7zIak-AlVjzr5wQT", // ganti link TikTok kamu
  },
  {
    id: "v4",
    type: "video",
    category: "videos",
    platform: "tiktok",
    url: "https://www.tiktok.com/@vakure/video/7511212286426631445?is_from_webapp=1&sender_device=pc", // ganti link TikTok kamu
  },
  {
    id: "v5",
    type: "video",
    category: "videos",
    platform: "tiktok",
    url: "https://www.tiktok.com/@vakure/video/7517518819678489861?is_from_webapp=1&sender_device=pc", // ganti link TikTok kamu
  },
  {
    id: "v6",
    type: "video",
    category: "videos",
    platform: "tiktok",
    url: "https://www.tiktok.com/@vakure/video/7550304711212207368?is_from_webapp=1&sender_device=pc", // ganti link TikTok kamu
  },

  // project pribadi kamu, taro di sini
  {
    id: "pr1",
    type: "video",
    category: "videos",
    platform: "cloudinary",
    url: "https://res.cloudinary.com/phnoxroh/video/upload/v1785394403/Portofolio%20Exstore/17%20FEB/OFFICIAL_MOMY_2_FINAL_a412ct.mp4",
  },
  {
    id: "pr2",
    type: "video",
    category: "videos",
    platform: "cloudinary",
    url: "https://res.cloudinary.com/phnoxroh/video/upload/v1785394064/Portofolio%20Exstore/18%20FEB/rev/EFOOTBALL_2_REV_u4mmjv.mp4",
  },
  {
    id: "pr3",
    type: "video",
    category: "videos",
    platform: "cloudinary",
    url: "https://res.cloudinary.com/phnoxroh/video/upload/v1785393880/Portofolio%20Exstore/02%20MARET/ML_10_FIN_mtjbxd.mp4",
  },
  {
    id: "pr4",
    type: "video",
    category: "videos",
    platform: "cloudinary",
    url: "https://res.cloudinary.com/phnoxroh/video/upload/v1785393974/Portofolio%20Exstore/03%20MARET/ML_11_FIN_ke7rsc.mp4",
  },
  {
    id: "pr5",
    type: "video",
    category: "videos",
    platform: "cloudinary",
    url: "https://res.cloudinary.com/phnoxroh/video/upload/v1785394005/Portofolio%20Exstore/20%20FEB/revisi/0219_1_1_1_imfzyg.mp4",
  },
  {
    id: "pr6",
    type: "video",
    category: "videos",
    platform: "cloudinary",
    url: "https://res.cloudinary.com/phnoxroh/video/upload/v1785394062/Portofolio%20Exstore/18%20FEB/rev/FREE_FIRE_2_REV_yqvcho.mp4",
  },
];
