"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import PagosHeader from "../Pagos_Header";
import { useState } from "react";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { shortVenc } from "@/app/_lib/utils/shortVenc";
import PendienteMovilAction from "./Pendiente_Movil_Action";

const movilTableHeader = ["", "venc", "rubro", "sector", "monto", "  "]

export default function PendienteListMovil({ pendientes }: { pendientes: PagoType[] }) {

  const [calcPagos, setCalcPagos] = useState<string[]>([])

  const handleChange = (id: string) => {
    if (calcPagos.includes(id)) {
      setCalcPagos(calcPagos.filter(p => p !== id))
    } else {
      setCalcPagos([...calcPagos, id])
    }
  }

  return (
    <article className="flex flex-col justify-center items-center w-full">

      <PagosHeader
        calcPagos={calcPagos}
        pendientes={pendientes}
      />

      <div className="table-container relative">

        <table className="table">
          {/* head */}
          <thead>
            <tr className='    font-bold tracking-wider border-b border-foreground25'>
              {
                movilTableHeader.map(thMovilName => <th key={thMovilName}>{thMovilName}</th>)
              }
            </tr>
          </thead>
          <tbody>

            {
              pendientes.map(pendiente =>
                <tr key={pendiente._id} className={`${pendiente.rubro} hover:brightness-75 border-b border-foreground25  `}>
                  <td>
                    <input
                      type="checkbox"
                      className={`${calcPagos.includes(pendiente._id) ? "opacity-100" : "opacity-20"}`}
                      defaultChecked={calcPagos.includes(pendiente._id)}
                      onChange={() => handleChange(pendiente._id)}
                    />
                  </td>
                  <td>{shortVenc(pendiente.vencimiento)}</td>
                  <td>{pendiente.rubro}</td>
                  <td>{pendiente.sector}</td>
                  <td>{montoFormat(Number(pendiente.monto))}</td>
                  <td className="p-0 m-0"><PendienteMovilAction pendiente={pendiente} /></td>
                </tr>
              )
            }

          </tbody>
        </table>

      </div>


    </article>
  )
}