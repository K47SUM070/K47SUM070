import Image from "next/image";
import Link from "next/link";
import { Camera, Mail, Music2, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/data/site";

const legalLinks = [
  { href: "/envios", label: "Politica de envios" },
  { href: "/legal/terminos", label: "Terminos y condiciones" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/cambios-devoluciones", label: "Cambios y devoluciones" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[radial-gradient(circle_at_top,rgba(242,192,107,0.12),transparent_30%),#050505]">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.3fr_0.9fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-1 shadow-[0_18px_36px_rgba(0,0,0,0.35)] backdrop-blur">
              <Image
                src="/brand-logo.png"
                alt={`Logo de ${siteConfig.name}`}
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </span>
            <p className="font-display text-sm uppercase tracking-[0.34em] text-amber-200/75">
              Deja Tu Huella
            </p>
          </div>
          <h3 className="font-display max-w-lg text-5xl leading-[0.88] text-white">
            Indumentaria urbana y sneakers originales con identidad fuerte y salida directa a venta.
          </h3>
          <p className="max-w-md text-sm leading-7 text-stone-300">
            Direccion visual oscura, tipografia fuerte y estructura lista para seguir sumando ropa, zapatillas, fotos y drops sin rehacer el sistema.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-display text-sm uppercase tracking-[0.28em] text-stone-400">Explorar</h4>
          <div className="flex flex-col gap-3 text-sm text-stone-300">
            <Link href="/catalogo" className="transition-colors hover:text-white">Catalogo</Link>
            <Link href="/categorias" className="transition-colors hover:text-white">Marcas</Link>
            <Link href="/faq" className="transition-colors hover:text-white">Preguntas frecuentes</Link>
            <Link href="/contacto" className="transition-colors hover:text-white">Contacto</Link>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-display text-sm uppercase tracking-[0.28em] text-stone-400">Canales</h4>
          <div className="space-y-3 text-sm text-stone-300">
            <ContactLink href={`mailto:${siteConfig.email}`} icon={Mail} text={siteConfig.email} />
            <ContactLink href={`https://wa.me/${siteConfig.whatsapp}`} icon={Phone} text={siteConfig.phone} />
            <ContactLink href={`https://instagram.com/${siteConfig.instagram}`} icon={Camera} text={`@${siteConfig.instagram}`} />
            <ContactLink href={siteConfig.tiktok} icon={Music2} text="@dejatuhuella_8" />
            <p className="pt-2 text-stone-500">{siteConfig.address}</p>
            <p className="text-stone-500">{siteConfig.hours}</p>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-white/8 py-6 text-xs text-stone-500 md:flex-row md:items-center md:justify-between">
        <p>{"\u00A9"} 2026 Deja Tu Huella. Tienda urbana lista para produccion.</p>
        <div className="flex flex-wrap gap-4">
          {legalLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}

function ContactLink({
  href,
  icon: Icon,
  text,
}: {
  href: string;
  icon: typeof Mail;
  text: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="flex items-center gap-3 transition-colors hover:text-white"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <Icon className="h-4 w-4" />
      </span>
      <span>{text}</span>
    </a>
  );
}
