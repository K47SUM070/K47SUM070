"use client";

import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ShippingEstimator } from "@/components/store/shipping-estimator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/providers/cart-provider";
import type { CheckoutFormValues } from "@/types";

const checkoutSchema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre."),
  apellido: z.string().min(2, "Ingresa tu apellido."),
  email: z.string().email("Ingresa un email valido."),
  telefono: z.string().min(8, "Ingresa un telefono valido."),
  dni: z.string().min(7, "Ingresa un DNI valido."),
  localidad: z.string().min(2, "Ingresa tu localidad."),
  provincia: z.string().min(2, "Ingresa tu provincia."),
  codigoPostal: z.string().min(4, "Ingresa un codigo postal."),
  direccion: z.string().min(4, "Ingresa la direccion."),
  pisoDepartamento: z.string().optional(),
  notas: z.string().optional(),
  metodoEntrega: z.enum(["correo-argentino", "retiro-local"]),
  aceptaTerminos: z.boolean().refine((value) => value, {
    message: "Tienes que aceptar los terminos para continuar.",
  }),
});

type CheckoutSchema = z.infer<typeof checkoutSchema>;

export function CheckoutPageClient() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState<CheckoutFormValues | null>(null);

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      dni: "",
      localidad: "",
      provincia: "Buenos Aires",
      codigoPostal: "",
      direccion: "",
      pisoDepartamento: "",
      notas: "",
      metodoEntrega: "correo-argentino",
      aceptaTerminos: true,
    },
  });

  const shipping = items.length > 0 ? 6200 : 0;
  const total = subtotal + shipping;

  const onSubmit = (values: CheckoutSchema) => {
    setSubmitted(values);
    clearCart();
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="space-y-5 py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/12 text-emerald-200">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-5xl leading-none text-white">Pedido recibido</h1>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-stone-300">
              Gracias, {submitted.nombre}. El checkout quedo registrado como flujo MVP y ya esta listo para conectar pagos, ERP y logistica real.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 text-left text-sm text-stone-300">
            <p>
              Entrega seleccionada:{" "}
              <strong>
                {submitted.metodoEntrega === "correo-argentino"
                  ? "Correo Argentino"
                  : "Retiro en local"}
              </strong>
            </p>
            <p>
              Localidad: <strong>{submitted.localidad}</strong>
            </p>
            <p>
              Provincia: <strong>{submitted.provincia}</strong>
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/">
              <Button>Volver al inicio</Button>
            </Link>
            <Link href="/catalogo">
              <Button variant="outline">Seguir viendo productos</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-display text-5xl leading-none text-white">Checkout</h1>
            <p className="text-sm leading-7 text-stone-300">
              Flujo listo para conectar pagos y logistica real sin perder claridad comercial.
            </p>
          </div>

          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre" id="nombre" error={form.formState.errors.nombre?.message}>
                <Input id="nombre" {...form.register("nombre")} />
              </Field>
              <Field label="Apellido" id="apellido" error={form.formState.errors.apellido?.message}>
                <Input id="apellido" {...form.register("apellido")} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" id="email" error={form.formState.errors.email?.message}>
                <Input id="email" type="email" {...form.register("email")} />
              </Field>
              <Field label="Telefono" id="telefono" error={form.formState.errors.telefono?.message}>
                <Input id="telefono" {...form.register("telefono")} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="DNI" id="dni" error={form.formState.errors.dni?.message}>
                <Input id="dni" {...form.register("dni")} />
              </Field>
              <Field label="Metodo de entrega" id="metodoEntrega">
                <Select id="metodoEntrega" {...form.register("metodoEntrega")}>
                  <option value="correo-argentino">Correo Argentino</option>
                  <option value="retiro-local">Retiro en local</option>
                </Select>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Localidad" id="localidad" error={form.formState.errors.localidad?.message}>
                <Input id="localidad" {...form.register("localidad")} />
              </Field>
              <Field label="Provincia" id="provincia" error={form.formState.errors.provincia?.message}>
                <Input id="provincia" {...form.register("provincia")} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
              <Field label="Direccion" id="direccion" error={form.formState.errors.direccion?.message}>
                <Input id="direccion" {...form.register("direccion")} />
              </Field>
              <Field label="Codigo postal" id="codigoPostal" error={form.formState.errors.codigoPostal?.message}>
                <Input id="codigoPostal" {...form.register("codigoPostal")} />
              </Field>
            </div>

            <Field label="Piso / Depto" id="pisoDepartamento">
              <Input id="pisoDepartamento" {...form.register("pisoDepartamento")} />
            </Field>

            <Field label="Notas del pedido" id="notas">
              <Textarea id="notas" {...form.register("notas")} />
            </Field>

            <label className="flex items-start gap-3 rounded-[20px] border border-white/10 p-4 text-sm text-stone-300">
              <input
                type="checkbox"
                className="mt-1"
                {...form.register("aceptaTerminos")}
              />
              <span>
                Acepto los{" "}
                <Link href="/legal/terminos" className="font-medium text-white underline">
                  terminos y condiciones
                </Link>{" "}
                y entiendo que este checkout esta preparado para una futura integracion real.
              </span>
            </label>
            <FieldError message={form.formState.errors.aceptaTerminos?.message} />

            <Button className="w-full" size="lg" type="submit">
              Confirmar pedido
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-display text-3xl leading-none text-white">Resumen del pedido</h2>
            <div className="space-y-3 text-sm text-stone-300">
              {items.map((item) => (
                <div key={item.variantId} className="flex items-center justify-between gap-4">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>{formatCurrency(item.lineTotal)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Envio estimado</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <ShippingEstimator />

        <Card>
          <CardContent className="space-y-3 text-sm text-stone-300">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-amber-200" />
              <p>
                La tienda puede cubrir General Madariaga y localidades cercanas sin cambiar el flujo cuando llegue la integracion real.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white" htmlFor={id}>
        {label}
      </label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-xs text-red-300">{message}</p>;
}
