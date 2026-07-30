import Link from "next/link";
import { categories } from "@/lib/works";
import WorksGrid from "@/components/WorksGrid";
import Contact from "@/components/Contact";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
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
        className="inline-flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-xs font-bold uppercase mb-8"
      >
        ← Home
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black uppercase text-white mb-10">
        {current?.label ?? category}
      </h1>

      <WorksGrid
        category={category}
        aspect={current?.aspect ?? "aspect-square"}
      />

      <div className="mt-16">
        <Contact />
      </div>
    </main>
  );
}
