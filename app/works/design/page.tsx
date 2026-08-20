import { supabase } from "@/lib/supabase";
import { works } from "@/lib/works";
import type { DesignSubCategory } from "@/lib/works";
import DesignClient from "./_DesignClient";
import type { DesignItem } from "./_DesignClient";

// Fetch design items dari Supabase
async function getDbDesignItems(): Promise<DesignItem[]> {
  const { data, error } = await supabase
    .from("works")
    .select("id, src, sub_category, group_name")
    .eq("type", "image")
    .eq("category", "design")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching design works from DB:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    src: row.src ?? "",
    subCategory: (row.sub_category as DesignSubCategory) ?? undefined,
    groupName: row.group_name ?? undefined,
  }));
}


export default async function DesignPage() {
  // 1. Ambil data hardcoded dari works.ts
  const staticItems: DesignItem[] = works
    .filter((w) => w.type === "image" && w.category === "design")
    .map((w) => ({
      id: w.id,
      src: (w as { src: string }).src,
      subCategory: (w as { subCategory?: DesignSubCategory }).subCategory,
      groupName: (w as { groupName?: string }).groupName,
    }));

  // 2. Ambil data dari database
  const dbItems = await getDbDesignItems();

  // 3. Merge: static dulu, DB di belakang
  const allItems = [...staticItems, ...dbItems];

  // 4. Pisah banner-youtube
  const regularItems = allItems.filter((i) => i.subCategory !== "banner-youtube");
  const ytBannerItems = allItems.filter((i) => i.subCategory === "banner-youtube");

  return <DesignClient items={regularItems} ytBannerItems={ytBannerItems} />;
}
