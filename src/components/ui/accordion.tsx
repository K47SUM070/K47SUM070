import type { FAQItem } from "@/types";

export function Accordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5"
        >
          <summary className="cursor-pointer list-none font-medium text-white">
            <div className="flex items-center justify-between gap-4">
              <span>{item.question}</span>
              <span className="text-xl text-stone-500 transition-transform group-open:rotate-45">
                +
              </span>
            </div>
          </summary>
          <p className="pt-4 text-sm leading-7 text-stone-300">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
