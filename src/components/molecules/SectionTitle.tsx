export default function SectionTitle({
  title,
  subTitle,
  id,
}: {
  title: string;
  subTitle: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-6">
      <span className="text-sm font-bold uppercase tracking-wider text-accent-magenta">
        {subTitle}
      </span>
      <h2 className="text-3xl font-bold text-navy mt-1">{title}</h2>
    </div>
  );
}
