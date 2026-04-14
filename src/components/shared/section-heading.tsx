import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("space-y-3", align === "center" && "text-center")}>
      {eyebrow ? (
        <p className="font-accent text-[11px] uppercase tracking-[0.34em] text-amber-200/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl leading-none text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
