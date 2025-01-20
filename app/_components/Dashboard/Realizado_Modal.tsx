"use client"

import TrashSVG from "@/app/_assets/TrashSVG"
import { eliminarRealizadoAction } from "@/app/_lib/actions/realizados.action"
import { PagoType } from "@/app/_lib/schema/pago.type"
import { useRef } from "react"
import toast from "react-hot-toast"

export const RealizadoModal = ({ realizado }: { realizado: PagoType }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleCloseYes = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    dialogRef.current?.close()

    const res = await eliminarRealizadoAction(realizado)
    if (res?.success) {
      toast.success(res.message)
    }
    else toast.error(res.message)
  }

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <TrashSVG className='size-6 text-[#88000075] hover:text-[#880000]' currentColor='currentColor' />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="p-10 bg-slate-900 w-1/3 rounded-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="flex gap-2 flex-wrap">
            <span className="font-bold text-xl text-center tracking-widest">¿ Seguro desea elimiar</span>
            <span className="font-bold text-xl text-center tracking-widest">{realizado._id} ?</span>
          </div>
          <div className="modal-action">
            <form onSubmit={handleCloseYes} method="dialog flex">
              <button className="btn btn-primary w-[6rem]" type="submit" >Si</button>
              <button onClick={() => dialogRef.current?.close()} type="button" className="btn btn-error w-[6rem] mx-6">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
