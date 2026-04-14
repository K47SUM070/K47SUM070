import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { MotionFade } from "@/components/shared/motion-fade";
import { SectionHeading } from "@/components/shared/section-heading";
import { CategoryList } from "@/components/store/category-list";
import { ProductGrid } from "@/components/store/product-grid";
import { ShippingEstimator } from "@/components/store/shipping-estimator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { importedBackgroundImages } from "@/data/asset-manifest";
import { categories } from "@/data/products";
import { getFeaturedProducts, getNewProducts } from "@/lib/catalog";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6);
  const newProducts = getNewProducts().slice(0, 3);
  const heroPrimary = featured[0];
  const heroSecondary = featured[3] ?? featured[1];
  const heroBackdrop = importedBackgroundImages[0];
  const stripBackdrop = importedBackgroundImages[1] ?? importedBackgroundImages[0];

  return (
    <div className="space-y-24 pb-24">
      <section className="pt-8 sm:pt-12">
        <Container>
          <MotionFade>
            <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
              <Image
                src={heroBackdrop}
                alt="Fondo visual de indumentaria urbana"
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-18"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.22),transparent_26%),linear-gradient(120deg,rgba(0,0,0,0.96),rgba(0,0,0,0.7)_45%,rgba(0,0,0,0.86))]" />
              <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
                <div className="space-y-7">
                  <Badge variant="accent" className="w-fit">
                    Nuevo drop visual
                  </Badge>
                  <div className="space-y-5">
                    <h1 className="font-display max-w-3xl text-6xl leading-[0.86] text-white sm:text-7xl lg:text-[5.6rem]">
                      Indumentaria urbana y sneakers para destacar en la calle.
                    </h1>
                    <p className="max-w-xl text-[15px] leading-8 text-stone-300 sm:text-base">
                      Una seleccion de ropa urbana, zapatillas y drops originales con imagen real, contraste fuerte y una lectura clara entre producto, estilo y compra.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link href="/catalogo">
                      <Button size="lg" className="w-full sm:w-auto">
                        Ver catalogo
                      </Button>
                    </Link>
                    <Link href="/categorias">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        Explorar marcas
                      </Button>
                    </Link>
                  </div>
                  <div className="grid gap-4 pt-2 sm:grid-cols-3">
                    <TrustItem icon={Truck} title="Envio claro" text="Cobertura local para ropa urbana, sneakers y proximos drops." />
                    <TrustItem icon={ShieldCheck} title="Fotos reales" text="El catalogo se presenta con fotos directas de prendas y producto." />
                    <TrustItem icon={Sparkles} title="Marca mas clara" text="La home comunica mejor el universo completo de la tienda." />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <HeroShot product={heroPrimary} priority className="sm:col-span-2 lg:min-h-[360px]" />
                  <HeroShot product={heroSecondary} className="min-h-[240px]" />
                  <Card className="overflow-hidden border-amber-300/10 bg-[linear-gradient(135deg,rgba(249,115,22,0.18),rgba(255,255,255,0.04))]">
                    <CardContent className="relative space-y-4">
                      <Image
                        src={stripBackdrop}
                        alt="Textura de fondo"
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover opacity-10"
                      />
                      <div className="relative space-y-4">
                        <p className="font-display text-[11px] uppercase tracking-[0.3em] text-amber-100/80">
                          Direccion visual
                        </p>
                        <h2 className="font-display text-4xl leading-[0.9] text-white">
                          Fondos, tipografia y producto empujando la misma direccion.
                        </h2>
                        <p className="text-sm leading-7 text-stone-300">
                          La composicion editorial usa imagen de apoyo sin tapar el producto y deja claro que la propuesta mezcla ropa urbana y sneakers dentro de un mismo lenguaje visual.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </MotionFade>
        </Container>
      </section>

      <section>
        <Container className="space-y-8">
          <MotionFade>
            <SectionHeading
              eyebrow="Marcas"
              title="Tres frentes claros para navegar el drop"
              description="Marcas con impacto rapido para combinar sneakers, capas urbanas y una lectura mas amplia del estilo de la tienda."
            />
          </MotionFade>
          <MotionFade delay={0.05}>
            <CategoryList />
          </MotionFade>
        </Container>
      </section>

      <section>
        <Container className="space-y-8">
          <MotionFade>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Destacados"
                title="Destacados con una lectura mas editorial y urbana"
                description="La grilla sostiene mejor el ritmo visual con imagenes grandes, hover mas fino y mejor balance entre identidad, producto y estilo."
              />
              <Link href="/catalogo" className="inline-flex items-center gap-2 text-sm font-medium text-stone-100">
                Ver todo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </MotionFade>
          <MotionFade delay={0.05}>
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <ProductGrid products={featured.slice(0, 4)} />
              <div className="space-y-4">
                {featured.slice(4, 6).map((product) => (
                  <Card key={product.id} className="group overflow-hidden">
                    <CardContent className="grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)]">
                      <div className="relative h-36 overflow-hidden rounded-[24px] border border-white/10">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="140px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-3">
                        <p className="font-display text-[11px] uppercase tracking-[0.28em] text-stone-400">
                          {product.category}
                        </p>
                        <h3 className="font-display text-3xl leading-[0.92] text-white">{product.name}</h3>
                        <p className="text-sm leading-7 text-stone-300">{product.shortDescription}</p>
                        <Link href={`/producto/${product.slug}`} className="inline-flex items-center gap-2 text-sm text-amber-100">
                          Ver producto <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </MotionFade>
        </Container>
      </section>

      <section>
        <Container className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-5">
            <SectionHeading
              eyebrow="Nuevos ingresos"
              title="Rotacion visual lista para nuevos ingresos"
              description="La home ya puede destacar nuevas prendas, zapatillas y lanzamientos sin romper estructura ni duplicar componentes."
            />
            <div className="space-y-4">
              {newProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[22px] border border-white/10">
                      <Image src={product.image} alt={product.name} fill sizes="96px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-[10px] uppercase tracking-[0.28em] text-stone-400">
                        {product.category}
                      </p>
                      <p className="mt-1 font-display text-[1.75rem] leading-[0.9] text-white">{product.name}</p>
                      <p className="mt-2 text-sm text-stone-400">{product.shortDescription}</p>
                    </div>
                    <Link href={`/producto/${product.slug}`} className="text-sm font-medium text-stone-100">
                      Ver
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <ShippingEstimator />
        </Container>
      </section>

      <section>
        <Container>
          <div className="grid gap-5 rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 lg:grid-cols-3">
            <InfoCard
              title="Assets reales integrados"
              text="Las fotos, fondos y branding ya salen desde ideasnuevas con una sincronizacion reproducible."
            />
            <InfoCard
              title="UI mas consistente"
              text="Se ajustaron margenes, paddings y escalas tipograficas para una lectura mas pareja entre ropa y sneakers."
            />
            <InfoCard
              title="Responsive first"
              text="El rediseno prioriza contraste, ritmo visual y gesto comercial tanto en mobile como en desktop."
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid gap-6 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.slug}>
              <CardContent className="space-y-4">
                <p className="font-display text-[11px] uppercase tracking-[0.3em] text-stone-400">
                  {category.name}
                </p>
                <h3 className="font-display text-3xl leading-none text-white">{category.hero}</h3>
                <p className="text-sm leading-7 text-stone-300">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </Container>
      </section>
    </div>
  );
}

function TrustItem({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Truck;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
      <Icon className="h-5 w-5 text-amber-200" />
      <p className="mt-3 font-display text-[11px] uppercase tracking-[0.24em] text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-stone-300">{text}</p>
    </div>
  );
}

function HeroShot({
  product,
  priority = false,
  className,
}: {
  product: ReturnType<typeof getFeaturedProducts>[number];
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`group relative min-h-[280px] overflow-hidden rounded-[30px] border border-white/10 bg-black ${className ?? ""}`}>
      <Image
        src={product.image}
        alt={product.name}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 30vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.92))]" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-amber-100/80">
          {product.badge ?? product.category}
        </p>
        <h2 className="mt-2 font-display text-3xl leading-[0.9] text-white">{product.name}</h2>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] bg-black/20 p-5">
      <h3 className="font-display text-3xl leading-none text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-stone-300">{text}</p>
    </div>
  );
}
