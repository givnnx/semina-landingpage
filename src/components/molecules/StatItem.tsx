export default function StatItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-3xl font-bold text-navy">{value}</div>
      <p className="text-muted-light text-base font-medium">{label}</p>
    </div>
  );
}
