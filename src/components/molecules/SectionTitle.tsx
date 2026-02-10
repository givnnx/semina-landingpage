export default function SectionTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <>
      <div className="text-[20px] font-semibold mb-1" id="grow-today">
        <span className="bg-clip-text text-transparent bg-[linear-gradient(113.4deg,#F32FB8_0%,#FDD7BE_100%)]">
          {subTitle}
        </span>
      </div>
      <div className="text-[32px] font-medium text-navy">{title}</div>
    </>
  );
}
