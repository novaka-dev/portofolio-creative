import Link from "next/link";

export default function CategoryButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-6 w-full sm:w-64 px-6 py-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors"
    >
      <span className="font-bold uppercase tracking-wide text-white text-sm sm:text-base">
        {label}
      </span>
      <span className="text-white">→</span>
    </Link>
  );
}
