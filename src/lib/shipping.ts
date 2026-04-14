export const shippingLocalities = [
  "General Madariaga",
  "Pinamar",
  "Villa Gesell",
  "Valeria del Mar",
  "Ostende",
  "Cariló",
  "Mar de las Pampas",
  "Mar Azul",
];

export function getShippingMessage(localidad?: string) {
  if (!localidad) {
    return "Hacemos envíos por Correo Argentino a la ciudad y a localidades cercanas sin complicaciones. La cotización online es orientativa.";
  }

  return `Realizamos envíos a ${localidad} por Correo Argentino y coordinamos entregas sin inconvenientes para localidades vecinas. La integración final quedará lista para una futura conexión real.`;
}

export function estimateShipping(localidad: string) {
  if (!localidad) {
    return null;
  }

  const normalized = localidad.toLowerCase();
  const nearby = ["general madariaga", "pinamar", "ostende", "valeria del mar", "cariló"].includes(normalized);

  return {
    service: "Correo Argentino",
    price: nearby ? 6200 : 7900,
    eta: nearby ? "24 a 72 hs hábiles" : "3 a 5 días hábiles",
  };
}
