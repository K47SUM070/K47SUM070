import { Clock3, Mail, MapPin, MessageCircleMore } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site";

export default function ContactPage() {
  return (
    <Container className="space-y-10 py-10 sm:py-12">
      <SectionHeading
        eyebrow="Contacto"
        title="Atencion directa, como en el local"
        description="La pagina mantiene una salida rapida a WhatsApp y deja visible direccion, horarios y redes sin ruido extra."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardContent className="space-y-5">
            <ContactItem icon={MapPin} title="Direccion" text={siteConfig.address} />
            <ContactItem icon={Clock3} title="Horarios" text={siteConfig.hours} />
            <ContactItem icon={Mail} title="Email" text={siteConfig.email} />
            <ContactItem icon={MessageCircleMore} title="WhatsApp" text={siteConfig.phone} />
            <ContactItem icon={MessageCircleMore} title="Instagram" text={`@${siteConfig.instagram}`} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-5">
            <h2 className="font-display text-4xl leading-none text-white">Mensaje para clientes de la zona</h2>
            <p className="text-sm leading-7 text-stone-300">
              Si vivis en General Madariaga o en una localidad cercana, podes comprar online sin problema.
              Hacemos despachos por Correo Argentino y tambien coordinamos retiro en el local.
            </p>
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-5 text-sm leading-7 text-stone-300">
              <p>
                Localidades habituales: General Madariaga, Pinamar, Villa Gesell, Ostende, Valeria del Mar, Carilo y alrededores.
              </p>
            </div>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              className="font-accent inline-flex rounded-full border border-amber-300/30 bg-[linear-gradient(135deg,#f97316,#f2c06b)] px-5 py-3 text-[12px] uppercase tracking-[0.18em] text-black"
            >
              Escribir por WhatsApp
            </a>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

function ContactItem({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof MapPin;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
        <Icon className="h-5 w-5 text-amber-200" />
      </div>
      <div>
        <p className="font-accent text-[11px] uppercase tracking-[0.24em] text-stone-400">{title}</p>
        <p className="mt-2 text-sm leading-7 text-stone-200">{text}</p>
      </div>
    </div>
  );
}
