export default function WorksSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative w-full aspect-video rounded-2xl bg-neutral-900"
        />
      ))}
    </div>
  );
}

