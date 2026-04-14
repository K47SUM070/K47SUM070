import { CircleCheckBig, MapPinned, PackageCheck, Truck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ShippingEstimator } from "@/components/store/shipping-estimator";
import { Card, CardContent } from "@/components/ui/card";

export default function ShippingPage() {
  return (
    <Container className="space-y-10 py-10 sm:py-12">
      <SectionHeading
        eyebrow="Envios"
        title="Cobertura clara y mensaje comercial directo"
        description="El flujo mantiene Correo Argentino como base y deja abierta la integracion con cotizacion y tracking real."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <ShippingCard
          icon={Truck}
          title="Operador principal"
          text="Correo Argentino como servicio base para despachar pedidos."
        />
        <ShippingCard
          icon={MapPinned}
          title="Cobertura regional"
          text="General Madariaga, Pinamar, Villa Gesell, Carilo, Ostende y localidades vecinas."
        />
        <ShippingCard
          icon={PackageCheck}
          title="Preparacion"
          text="Los pedidos se preparan en 24 a 48 hs habiles."
        />
        <ShippingCard
          icon={CircleCheckBig}
          title="Listo para crecer"
          text="La capa de shipping ya deja lugar a APIs reales y reglas futuras."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card>
          <CardContent className="space-y-5">
            <h2 className="font-display text-3xl leading-none text-white">Informacion clara para tus clientes</h2>
            <div className="space-y-3 text-sm leading-7 text-stone-300">
              <p>
                El sitio comunica de forma explicita que los envios regionales estan disponibles sin gestiones especiales.
              </p>
              <p>
                Si el cliente vive en un pueblo vecino, puede comprar con normalidad y elegir entrega por correo o retiro.
              </p>
              <p>
                El costo mostrado en este MVP es orientativo y funciona como placeholder tecnico hasta integrar una tarifa real.
              </p>
            </div>
          </CardContent>
        </Card>

        <ShippingEstimator />
      </div>
    </Container>
  );
}

function ShippingCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Truck;
  title: string;
  text: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <Icon className="h-5 w-5 text-amber-200" />
        <h2 className="font-display text-3xl leading-none text-white">{title}</h2>
        <p className="text-sm leading-7 text-stone-300">{text}</p>
      </CardContent>
    </Card>
  );
}
