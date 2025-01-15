"use client"

import { eliminarPendienteAction, pagarPendienteAction } from '@/app/_lib/actions/pendientes.action'
import Link from 'next/link'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
// import ToastWithConfirm from '../ToastWithConfirm'
import EditSVG from '@/app/_assets/EditSVG'
import TrashSVG from '@/app/_assets/TrashSVG'
import DollarSVG from '@/app/_assets/DollarSVG'
import { PagoType } from '@/app/_lib/schema/pago.type'

export default function PagoAction({ pendiente }: { pendiente: PagoType }) {

  const handlePagar = async () => {
    const res = await pagarPendienteAction(pendiente)
    if (res?.success) {
      toast.success("Pago exitoso")
      // toast.custom((t: string) => (
      //   <div className="flex flex-col">
      //     <ToastWithConfirm t={t} title={"pendiente pagado"} content={JSON.stringify(pendiente)} />
      //   </div>
      // ))
    }
    else toast.error(res.errors)
  }

  return (
    <div className='flex justify-around items-center gap-1'>
      <button onClick={handlePagar}><DollarSVG className='size-6 text-[#00800075] hover:text-[#008000]' currentColor='currentColor' /></button>
      <Modal pendiente={pendiente} />
      <Link href={{
        pathname: '/pendientes/edit',
        query: { id: pendiente._id },
      }}
      >
        <EditSVG className='size-6 text-[#aaaaaa75] hover:text-[#aaaaaa]' currentColor='currentColor' />
      </Link>
    </div>
  )
}

const Modal = ({ pendiente }: { pendiente: PagoType }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleCloseYes = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    dialogRef.current?.close()

    const res = await eliminarPendienteAction(pendiente._id)
    if (res?.success) {
      toast.success("Pago borrado")
      // toast.custom((t: string) => (
      //   <div className="flex flex-col">
      //     <ToastWithConfirm t={t} title={"pendiente eliminado"} content={JSON.stringify(pendiente)} />
      //   </div>
      // ))
    }
    else toast.error(res.error)
  }

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <TrashSVG className='size-6 text-[#88000075] hover:text-[#880000]' currentColor='currentColor' />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="modal bg-black/50 backdrop-blur-sm">
        <div className="modal-box">
          <h3 className="font-bold text-lg">¿ Seguro desea elimiar</h3>
          <h3 className="font-bold text-lg">${pendiente._id} ?</h3>
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