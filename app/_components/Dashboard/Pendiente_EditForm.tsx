"use client"

import { SectoresType } from "@/app/_lib/schema/sectores.type";
import { usePendienteActionState } from "@/app/_lib/hooks/usePendienteActionState";
import EditForm from "./EditForm";
import { PagoType } from "@/app/_lib/schema/pago.type";

export default function PendienteEditForm({ pendiente, sectoresReset }: { pendiente: PagoType, sectoresReset: SectoresType[] }) {

    const [formState, formAction, isPending] = usePendienteActionState(pendiente)

    return (
        <EditForm
            pagoType={"pendiente"}
            pago={pendiente}
            sectoresReset={sectoresReset}
            formState={formState}
            formAction={formAction}
            isPending={isPending}
        />
    )
}


