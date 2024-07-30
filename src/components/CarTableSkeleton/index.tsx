export default function CarTableSkeleton() {
  return (
    <div className="relative overflow-hidden bg-gray-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent">
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="h-12 w-full border-b border-b-gray-700" />
      ))}
    </div>
  );
}
