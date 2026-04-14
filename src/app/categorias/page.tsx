import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { CategoryList } from "@/components/store/category-list";

export default function CategoriesPage() {
  return (
    <Container className="space-y-10 py-10 sm:py-12">
      <SectionHeading
        eyebrow="Marcas"
        title="Explora el catalogo por identidad visual"
        description="Cada bloque se apoya en fotos reales del producto y una lectura clara para mobile y desktop."
      />
      <CategoryList />
    </Container>
  );
}
