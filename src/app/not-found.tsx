import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <p className="font-accent text-[11px] uppercase tracking-[0.34em] text-stone-500">404</p>
      <h1 className="font-display text-6xl leading-none text-white">Pagina no encontrada</h1>
      <p className="max-w-xl text-sm leading-7 text-stone-300">
        La ruta no existe o el producto ya no esta disponible en este catalogo.
      </p>
      <Link href="/">
        <Button>Volver al inicio</Button>
      </Link>
    </Container>
  );
}
