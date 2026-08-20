import { createClient } from "@supabase/supabase-js";

// Client publik - untuk read data di frontend
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type DbWork = {
  id: string;
  type: "image" | "video";
  category: string;
  sub_category: string | null;
  src: string | null;
  platform: "youtube" | "tiktok" | "cloudinary" | null;
  url: string | null;
  group_name: string | null;
  created_at: string;
};
