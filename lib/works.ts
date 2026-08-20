export type DesignSubCategory =
  | "thumbnail"
  | "carousel"
  | "poster"
  | "banner"
  | "banner-youtube";

export type ImageWork = {
  id: string;
  type: "image";
  category: string;
  src: string;
  subCategory?: DesignSubCategory;
  groupName?: string;
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
  { slug: "design", label: "DESIGN", aspect: "aspect-video" },
  { slug: "pfp-samples", label: "PFP SAMPLES", aspect: "aspect-square" },
  { slug: "videos", label: "VIDEOS", aspect: "" },
];

export const works: WorkItem[] = [
  // --- DESIGN: Thumbnail (YouTube 16:9) ---
  {
    id: "t1",
    type: "image",
    category: "design",
    subCategory: "thumbnail",
    src: "/works/thumbnail/thumbnail fantasy 1.jpg",
  },
  {
    id: "t2",
    type: "image",
    category: "design",
    subCategory: "thumbnail",
    src: "/works/thumbnail/thumbnail live pinpin p2.png",
  },
  {
    id: "t3",
    type: "image",
    category: "design",
    subCategory: "thumbnail",
    src: "/works/thumbnail/maxresdefault.webp",
  },
  {
    id: "t4",
    type: "image",
    category: "design",
    subCategory: "thumbnail",
    src: "/works/thumbnail/thumbnail rombak akun.png",
  },

  // --- DESIGN: Carousel (geser kiri-kanan) ---
  // Masukkan semua desain carousel lo di sini (IG, TikTok, dll.)
  {
    id: "c1",
    type: "image",
    category: "design",
    subCategory: "carousel",
    src: "/works/carousel/carousel_01.gif",
  },
  {
    id: "c2",
    type: "image",
    category: "design",
    subCategory: "carousel",
    src: "/works/carousel/carousel_02.gif",
  },
  {
    id: "c3",
    type: "image",
    category: "design",
    subCategory: "carousel",
    src: "/works/carousel/carousel_03.gif",
  },
  {
    id: "c4",
    type: "image",
    category: "design",
    subCategory: "carousel",
    src: "/works/carousel/carousel_04.gif",
  },
  {
    id: "c5",
    type: "image",
    category: "design",
    subCategory: "carousel",
    src: "/works/carousel/carousel_05.gif",
  },
  {
    id: "c6",
    type: "image",
    category: "design",
    subCategory: "carousel",
    src: "/works/carousel/carousel_06.gif",
  },
  {
    id: "c7",
    type: "image",
    category: "design",
    subCategory: "carousel",
    src: "/works/carousel/carousel_07.gif",
  },

  // --- DESIGN: Poster (portrait / square) ---
  // Masukkan poster, flyer, konten portrait di sini
  {
    id: "pos1",
    type: "image",
    category: "design",
    subCategory: "poster",
    src: "/works/poster/Vintage Kenangan.jpg",
  },
  {
    id: "pos2",
    type: "image",
    category: "design",
    subCategory: "poster",
    src: "/works/carousel/carousel_01.gif",
  },
  {
    id: "pos3",
    type: "image",
    category: "design",
    subCategory: "poster",
    src: "/works/poster/masjid-finance.png",
  },

  // --- DESIGN: Banner ---
  {
    id: "b1",
    type: "image",
    category: "design",
    subCategory: "banner",
    src: "/works/banner/banner-anime-zenin2.png",
  },
  {
    id: "b2",
    type: "image",
    category: "design",
    subCategory: "banner",
    src: "/works/banner/Banner.png",
  },
  {
    id: "b3",
    type: "image",
    category: "design",
    subCategory: "banner",
    src: "/works/banner/Header Anime.png",
  },

  // --- DESIGN: Banner YouTube (channel art 16:9 safe zone) ---
  {
    id: "by1",
    type: "image",
    category: "design",
    subCategory: "banner-youtube",
    src: "/works/banner/yt/banner-anime.jpg",
  },

  { id: "p1", type: "image", category: "pfp-samples", src: "/works/pfp/5.png" },
  { id: "p2", type: "image", category: "pfp-samples", src: "/works/pfp/4.png" },
  // { id: "p2", type: "image", category: "pfp-samples", src: "" },
  // { id: "p3", type: "image", category: "pfp-samples", src: "" },
  // { id: "p4", type: "image", category: "pfp-samples", src: "" },

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
  {
    id: "v7",
    type: "video",
    category: "videos",
    platform: "tiktok",
    url: "https://www.tiktok.com/@pinpixmgce5/video/7670560178290314517?is_from_webapp=1&sender_device=pc", // ganti link TikTok kamu
  },
  {
    id: "v8",
    type: "video",
    category: "videos",
    platform: "tiktok",
    url: "https://www.tiktok.com/@pinpixmgce5/video/7671622030151994645?is_from_webapp=1&sender_device=pc", // ganti link TikTok kamu
  },
  {
    id: "v8",
    type: "video",
    category: "videos",
    platform: "youtube",
    url: "https://youtu.be/Vl_7DLbkCeg", // ganti link TikTok kamu
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
