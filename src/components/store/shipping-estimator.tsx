"use client";

import { Truck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatCurrency } from "@/lib/format";
import { estimateShipping, getShippingMessage, shippingLocalities } from "@/lib/shipping";

export function ShippingEstimator() {
  const [localidad, setLocalidad] = useState("");
  const [cp, setCp] = useState("");

  const result = estimateShipping(localidad);

  return (
    <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/6 p-3 text-amber-200">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-3xl leading-none text-white">Estimador de envio</h3>
            <p className="mt-1 text-sm text-stone-400">
              Modulo listo para una integracion real con cotizacion automatica.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Select value={localidad} onChange={(event) => setLocalidad(event.target.value)}>
            <option value="">Selecciona tu localidad</option>
            {shippingLocalities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Input
            placeholder="Codigo postal"
            value={cp}
            onChange={(event) => setCp(event.target.value)}
          />
        </div>

        <p className="text-sm leading-7 text-stone-300">{getShippingMessage(localidad)}</p>

        {result ? (
          <div className="rounded-[24px] border border-white/10 bg-black/25 p-4 text-sm text-stone-300">
            <p className="font-medium text-white">{result.service}</p>
            <p>Costo estimado: {formatCurrency(result.price)}</p>
            <p>Demora estimada: {result.eta}</p>
          </div>
        ) : null}

        <Button variant="secondary" className="w-full sm:w-auto" type="button">
          Guardar para integracion futura
        </Button>
      </CardContent>
    </Card>
  );
}
