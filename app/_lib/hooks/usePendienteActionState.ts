import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { editarNewPendienteAction, editarPendienteAction } from "../actions/pendientes.action";
import toast from "react-hot-toast";
import { PagoType } from "../schema/pago.type";

const sameId = (prevData: PagoType, newPendiente: PagoType) => {

  return (newPendiente.rubro === prevData.rubro &&
    newPendiente.sector === prevData.sector &&
    newPendiente.vencimiento === prevData.vencimiento
  )
}

type UpdateResponseType = {
  success: boolean;
  prevState: PagoType;
  error: string;
} | null

export const usePendienteActionState = (pendiente: PagoType) => {
  const router = useRouter()

  const [formState, formAction, isPending] = useActionState(async (prevState: UpdateResponseType, formData: FormData) => {

    const newPendiente = Object.fromEntries(formData.entries()) as PagoType
    newPendiente._id = newPendiente.vencimiento + "-" + newPendiente.rubro + "-" + newPendiente.sector
    const updateResponse = {
      success: false,
      prevState: newPendiente,
      error: ""
    }

    const serverAction = sameId(pendiente, newPendiente)
      ? await editarPendienteAction(newPendiente)
      : await editarNewPendienteAction(pendiente._id ?? "", newPendiente)

    if (!serverAction?.success) {
      toast.error("No fue posible actualizar")
      return { ...updateResponse, error: serverAction?.error }
    }
    else {

      toast.success("Pago actualizado")
      router.push("/pendientes")

      return { ...updateResponse, success: true }
    }

  },
    null
  );

  return [formState, formAction, isPending] as const
}