import { MessageCircleMore } from "lucide-react";

import { siteConfig } from "@/data/site";

const whatsappMessage = encodeURIComponent(
  "Hola vengo de parte del sitio web. Me gustaria hacer una consulta \u{1F45F}",
);

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_28px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-105 hover:shadow-[0_18px_36px_rgba(37,211,102,0.45)]"
      aria-label="Escribir por WhatsApp"
    >
      <MessageCircleMore className="h-6 w-6" />
    </a>
  );
}
