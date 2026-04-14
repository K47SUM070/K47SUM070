import { importedProductCollections } from "@/data/asset-manifest";
import type { Product, ProductCategory } from "@/types";

function collection(slug: string) {
  const match = importedProductCollections.find((item) => item.slug === slug);

  if (!match) {
    throw new Error(`No se encontro la coleccion importada para ${slug}.`);
  }

  return match;
}

const samba = collection("adidas-samba-og-negro-blanco-suela-caramelo-36-36-36-37-37-39-horma-grande");
const dunkLow = collection("nike-dunk-low-negro-blanco-suela-caramelo-39-39-40-41-42");
const dunkBrown = collection("nike-sb-dunk-low-marron-con-beige-38-39-39-39-40-40-40-41-41-42-42-43");
const dunkBlack = collection("nike-sb-dunk-low-negra-con-blanco-39-39-39-40-40-40-41-41-42-42-43");
const knuSkool = collection("vans-knu-skool-total-black-38-39-40-40-40-41-42-42");
const sk8Hi = collection("vans-sk8-hi-negro-blanco-36-37");
const uplandGum = collection("vans-upland-blanco-negro-suela-caramelo-numero-40-horma-grande");
const uplandWhite = collection("vans-upland-white-39-40-41-horma-grande");

export const categories: ProductCategory[] = [
  {
    slug: "nike",
    name: "Nike",
    description: "Dunk y SB con contraste alto, perfiles limpios y drops que empujan el look.",
    hero: "Siluetas bajas con impacto visual inmediato.",
    image: dunkLow.images[0],
    accent: "linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(10, 10, 10, 0.95))",
  },
  {
    slug: "vans",
    name: "Vans",
    description: "Volumen noventoso, color blocking y pares pensados para banca diaria.",
    hero: "Skate attitude con horma protagonista.",
    image: uplandGum.images[0],
    accent: "linear-gradient(135deg, rgba(239, 68, 68, 0.24), rgba(10, 10, 10, 0.95))",
  },
  {
    slug: "adidas",
    name: "Adidas",
    description: "Una línea Samba con base negra y suela caramelo para un perfil clásico y filoso.",
    hero: "Heritage de cancha llevado a calle.",
    image: samba.images[0],
    accent: "linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(10, 10, 10, 0.95))",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "nike-dunk-low-black-gum",
    name: "Nike Dunk Low Black Gum",
    category: "nike",
    price: 129900,
    compareAtPrice: 149900,
    shortDescription: "Base negra, swoosh blanco y suela caramelo para rotación diaria.",
    description:
      "Un par bajo y contundente para outfits monocromos. El contraste entre capellada negra, swoosh blanco y suela gum lo hace fácil de combinar sin perder presencia.",
    materials: ["Capellada sintética premium", "Suela cupsole con grip", "Lengüeta acolchada"],
    fit: "Horma regular",
    colors: ["Negro", "Blanco", "Caramelo"],
    sizes: ["39", "40", "41", "42"],
    featured: true,
    isNew: true,
    badge: "Drop fuerte",
    image: dunkLow.images[0],
    gallery: dunkLow.images,
    variants: [
      { id: "p1-v1", color: "Negro", size: "39", stock: 2, sku: "NK-DUNK-BG-39" },
      { id: "p1-v2", color: "Negro", size: "40", stock: 1, sku: "NK-DUNK-BG-40" },
      { id: "p1-v3", color: "Negro", size: "41", stock: 1, sku: "NK-DUNK-BG-41" },
      { id: "p1-v4", color: "Negro", size: "42", stock: 1, sku: "NK-DUNK-BG-42" },
    ],
  },
  {
    id: "p2",
    slug: "nike-sb-dunk-low-earth",
    name: "Nike SB Dunk Low Earth",
    category: "nike",
    price: 136900,
    shortDescription: "Gama marrón y beige con lectura más cálida y textura skate.",
    description:
      "Una versión SB con tono tierra y look más cargado. Funciona bien con cargos, denim oscuro y capas neutras.",
    materials: ["Upper de acabado mate", "Paneles acolchados SB", "Suela resistente"],
    fit: "Horma regular con interior mullido",
    colors: ["Marrón", "Beige"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    featured: true,
    badge: "Skate line",
    image: dunkBrown.images[0],
    gallery: dunkBrown.images,
    variants: [
      { id: "p2-v1", color: "Marrón", size: "38", stock: 1, sku: "NK-SB-EARTH-38" },
      { id: "p2-v2", color: "Marrón", size: "39", stock: 3, sku: "NK-SB-EARTH-39" },
      { id: "p2-v3", color: "Marrón", size: "40", stock: 3, sku: "NK-SB-EARTH-40" },
      { id: "p2-v4", color: "Marrón", size: "41", stock: 2, sku: "NK-SB-EARTH-41" },
      { id: "p2-v5", color: "Marrón", size: "42", stock: 2, sku: "NK-SB-EARTH-42" },
      { id: "p2-v6", color: "Marrón", size: "43", stock: 1, sku: "NK-SB-EARTH-43" },
    ],
  },
  {
    id: "p3",
    slug: "nike-sb-dunk-low-black-white",
    name: "Nike SB Dunk Low Black White",
    category: "nike",
    price: 134900,
    shortDescription: "Versión SB en negro y blanco para un perfil sobrio pero agresivo.",
    description:
      "La silueta trae padding más marcado y una lectura más técnica. Ideal para quien quiere una Dunk con presencia sólida y sin ruido extra.",
    materials: ["Upper sintético", "Collar acolchado", "Suela de caucho"],
    fit: "Horma regular",
    colors: ["Negro", "Blanco"],
    sizes: ["39", "40", "41", "42", "43"],
    featured: false,
    image: dunkBlack.images[0],
    gallery: dunkBlack.images,
    variants: [
      { id: "p3-v1", color: "Negro", size: "39", stock: 3, sku: "NK-SB-BW-39" },
      { id: "p3-v2", color: "Negro", size: "40", stock: 3, sku: "NK-SB-BW-40" },
      { id: "p3-v3", color: "Negro", size: "41", stock: 2, sku: "NK-SB-BW-41" },
      { id: "p3-v4", color: "Negro", size: "42", stock: 2, sku: "NK-SB-BW-42" },
      { id: "p3-v5", color: "Negro", size: "43", stock: 1, sku: "NK-SB-BW-43" },
    ],
  },
  {
    id: "p4",
    slug: "vans-upland-black-gum",
    name: "Vans Upland Black Gum",
    category: "vans",
    price: 119900,
    compareAtPrice: 132900,
    shortDescription: "Paneles negros y blancos con base gum y volumen retro.",
    description:
      "Una Vans con presencia grande y carácter noventoso. Tiene lectura chunky sin perder limpieza visual, ideal para joggers, denim ancho o total black.",
    materials: ["Capellada sintética", "Suela waffle reforzada", "Lengüeta acolchada"],
    fit: "Horma grande",
    colors: ["Blanco", "Negro", "Caramelo"],
    sizes: ["40"],
    featured: true,
    isNew: true,
    badge: "Street icon",
    image: uplandGum.images[0],
    gallery: uplandGum.images,
    variants: [
      { id: "p4-v1", color: "Blanco", size: "40", stock: 1, sku: "VN-UP-BG-40" },
    ],
  },
  {
    id: "p5",
    slug: "vans-upland-white",
    name: "Vans Upland White",
    category: "vans",
    price: 117900,
    shortDescription: "Total white con líneas deportivas y horma amplia.",
    description:
      "Perfil limpio para outfits claros o contrastes fuertes. La horma amplia y el volumen de la silueta lo vuelven un par protagonista.",
    materials: ["Upper sintético", "Forro acolchado", "Suela waffle"],
    fit: "Horma grande",
    colors: ["Blanco"],
    sizes: ["39", "40", "41"],
    featured: true,
    image: uplandWhite.images[0],
    gallery: uplandWhite.images,
    variants: [
      { id: "p5-v1", color: "Blanco", size: "39", stock: 1, sku: "VN-UP-WH-39" },
      { id: "p5-v2", color: "Blanco", size: "40", stock: 1, sku: "VN-UP-WH-40" },
      { id: "p5-v3", color: "Blanco", size: "41", stock: 1, sku: "VN-UP-WH-41" },
    ],
  },
  {
    id: "p6",
    slug: "vans-knu-skool-total-black",
    name: "Vans Knu Skool Total Black",
    category: "vans",
    price: 124900,
    shortDescription: "Todo negro, lengüeta inflada y perfil skate contundente.",
    description:
      "Uno de los pares más pesados del drop. La construcción total black y la silueta chunky empujan una estética más dura y nocturna.",
    materials: ["Upper de acabado matte", "Lengüeta oversize", "Suela waffle negra"],
    fit: "Horma regular",
    colors: ["Negro"],
    sizes: ["38", "39", "40", "41", "42"],
    featured: false,
    badge: "All black",
    image: knuSkool.images[0],
    gallery: knuSkool.images,
    variants: [
      { id: "p6-v1", color: "Negro", size: "38", stock: 1, sku: "VN-KNU-BLK-38" },
      { id: "p6-v2", color: "Negro", size: "39", stock: 1, sku: "VN-KNU-BLK-39" },
      { id: "p6-v3", color: "Negro", size: "40", stock: 3, sku: "VN-KNU-BLK-40" },
      { id: "p6-v4", color: "Negro", size: "41", stock: 1, sku: "VN-KNU-BLK-41" },
      { id: "p6-v5", color: "Negro", size: "42", stock: 2, sku: "VN-KNU-BLK-42" },
    ],
  },
  {
    id: "p7",
    slug: "vans-sk8-hi-black-white",
    name: "Vans Sk8-Hi Black White",
    category: "vans",
    price: 112900,
    shortDescription: "Caña alta clásica en negro y blanco para rotación diaria.",
    description:
      "Una silueta histórica que sostiene el lenguaje skate de la tienda. La caña alta da estructura y suma lectura más clásica dentro del catálogo.",
    materials: ["Upper negro", "Panel lateral blanco", "Suela waffle"],
    fit: "Horma regular",
    colors: ["Negro", "Blanco"],
    sizes: ["36", "37"],
    featured: false,
    image: sk8Hi.images[0],
    gallery: sk8Hi.images,
    variants: [
      { id: "p7-v1", color: "Negro", size: "36", stock: 1, sku: "VN-SK8-BW-36" },
      { id: "p7-v2", color: "Negro", size: "37", stock: 1, sku: "VN-SK8-BW-37" },
    ],
  },
  {
    id: "p8",
    slug: "adidas-samba-og-black-gum",
    name: "Adidas Samba OG Black Gum",
    category: "adidas",
    price: 139900,
    compareAtPrice: 154900,
    shortDescription: "Perfil bajo con tres tiras blancas y suela caramelo clásica.",
    description:
      "La Samba más versátil del drop. Conserva ADN clásico de cancha pero entra perfecto en una estética callejera más filosa y actual.",
    materials: ["Capellada sintética", "Suela gum clásica", "Refuerzo frontal"],
    fit: "Horma grande",
    colors: ["Negro", "Blanco", "Caramelo"],
    sizes: ["36", "37", "39"],
    featured: true,
    isNew: true,
    badge: "Classic cut",
    image: samba.images[0],
    gallery: samba.images,
    variants: [
      { id: "p8-v1", color: "Negro", size: "36", stock: 3, sku: "AD-SAM-BG-36" },
      { id: "p8-v2", color: "Negro", size: "37", stock: 2, sku: "AD-SAM-BG-37" },
      { id: "p8-v3", color: "Negro", size: "39", stock: 1, sku: "AD-SAM-BG-39" },
    ],
  },
];
