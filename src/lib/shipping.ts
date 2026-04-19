export const shippingLocalities = [
  "General Madariaga",
  "Pinamar",
  "Villa Gesell",
  "Mar del Plata",
  "CABA",
];

type ShippingEstimate = {
  service: string;
  price: number;
  eta: string;
};

const shippingByLocality: Record<string, ShippingEstimate> = {
  "General Madariaga": {
    service: "Retiro local coordinado",
    price: 0,
    eta: "Disponible en el dia",
  },
  Pinamar: {
    service: "Mensajeria local",
    price: 4500,
    eta: "24 a 48 hs",
  },
  "Villa Gesell": {
    service: "Correo Argentino",
    price: 6900,
    eta: "2 a 4 dias habiles",
  },
  "Mar del Plata": {
    service: "Correo Argentino",
    price: 7900,
    eta: "2 a 5 dias habiles",
  },
  CABA: {
    service: "Correo Argentino",
    price: 9900,
    eta: "3 a 6 dias habiles",
  },
};

export function estimateShipping(locality: string): ShippingEstimate | null {
  if (!locality) {
    return null;
  }

  return (
    shippingByLocality[locality] ?? {
      service: "Correo Argentino",
      price: 11900,
      eta: "3 a 7 dias habiles",
    }
  );
}

export function getShippingMessage(locality: string): string {
  if (!locality) {
    return "Selecciona tu localidad para ver costo y demora estimada.";
  }

  const result = estimateShipping(locality);
  if (!result) {
    return "No pudimos estimar el envio por ahora.";
  }

  if (result.price === 0) {
    return "Tenes retiro/local sin costo disponible para esta localidad.";
  }

  return `En ${locality} trabajamos con ${result.service}.`;
}
