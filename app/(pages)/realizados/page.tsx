import { PagosTable } from "@/app/_components/Dashboard/PagosTable"
import RealizadosList from "@/app/_components/Dashboard/RealizadosList"
import LeftAsideRealizados from "@/app/_components/LeftAside/LeftAsideRealizados"
import { getCachedRealizados } from "@/app/_lib/db/realizados.db"
import { getFilteredPagos } from "@/app/_lib/utils/getFilteredPagos"
import { getLocaleDate } from "@/app/_lib/utils/getActualDate"
import getUserFromCookie from "@/app/_lib/utils/getUserFromCookies"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { RealizadoType } from "@/app/_lib/schema/realizado.type"

export default async function RealizadosPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const [year, month] = getLocaleDate()
  const monthStr = (month + 1) < 10 ? "0" + (month + 1) : (month + 1).toString()
  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const sectorFilter = (await searchParams)?.sectorFilter || "todos"
  const dateFilter = (await searchParams)?.dateFilter || year.toString() + "-" + monthStr

  const pagosRealizados = await getCachedRealizados() as RealizadoType[]
  const filteredRealizados = getFilteredPagos(pagosRealizados, rubroFilter, sectorFilter, dateFilter) as RealizadoType[]

  const tableHeader = ["histo", "vencimiento", "rubro", "sector", "monto", "pagado"]

  return (
    <section className="w-full main-height flex justify-center item-center">

      <aside className='bg-slate-800 flex flex-col gap-4 justify-center items-center leftAside-width'>
        <LeftAsideRealizados dateFilter={dateFilter} />
      </aside>

      <Suspense fallback={<span className="loading loading-spinner text-primary"></span>} >
        <PagosTable tableHeader={tableHeader}>
          <RealizadosList realizados={filteredRealizados} allRealizados={pagosRealizados} />
        </PagosTable>
      </Suspense>

    </section>
  );
}
