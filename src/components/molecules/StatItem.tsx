export default function StatItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-[32px] font-medium text-navy">{value}</div>
      <p className="text-gray-text text-base">{label}</p>
    </div>
  );
}
