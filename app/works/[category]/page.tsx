import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { categories } from "@/lib/works";
import WorksGrid from "@/components/WorksGrid";
import WorksSkeleton from "@/components/WorksSkeleton";
import Contact from "@/components/Contact";

// Selalu render fresh agar data baru dari Supabase langsung tampil
export const dynamic = "force-dynamic";

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  design: {
    title: "Design",
    description:
      "Karya desain grafis Novaka: thumbnail YouTube, carousel IG, poster, dan banner.",
  },
  "pfp-samples": {
    title: "PFP Samples",
    description: "Koleksi profile picture (PFP) buatan Novaka.",
  },
  videos: {
    title: "Videos",
    description:
      "Karya video editing Novaka: YouTube, TikTok, dan project klien.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  return {
    title: meta?.title ?? category,
    description:
      meta?.description ?? `Karya ${category} oleh Novaka.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const current = categories.find((c) => c.slug === category);

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-xs font-bold uppercase mb-8 hover:bg-neutral-200 transition-colors"
      >
        ← Home
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black uppercase text-white mb-10">
        {current?.label ?? category}
      </h1>

      <Suspense fallback={<WorksSkeleton />}>
        <WorksGrid
          category={category}
          aspect={current?.aspect ?? "aspect-square"}
        />
      </Suspense>

      <div className="mt-16">
        <Contact />
      </div>
    </main>
  );
}
