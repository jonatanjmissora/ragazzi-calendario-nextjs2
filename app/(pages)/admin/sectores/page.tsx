import AdminSectoresList from "@/app/_components/Dashboard/AdminSectoresList";
import { getCachedSectoresActuales, getCachedSectoresReset } from "@/app/_lib/db/sectores.db";
import { SectoresType } from "@/app/_lib/schema/sectores.type";
import Link from "next/link";
import { Suspense } from "react";

export default async function AdminSectoresPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const type = (await searchParams)?.type || "actuales"
  const actualSectores = type === "actuales"
    ? await getCachedSectoresActuales() as SectoresType[]
    : await getCachedSectoresReset() as SectoresType[]

  return (
    <section className="w-full main-height flex">

      <aside className='bg-slate-800 flex flex-col gap-4 justify-center items-center leftAside-width'>
        <Link className={`w-3/4 ${type === "actuales" ? "btn btn-primary" : "btn btn-ghost"}`} href={"/admin/sectores?type=actuales"}>Sectores Actuales</Link>
        <Link className={`w-3/4 ${type === "constantes" ? "btn btn-primary" : "btn btn-ghost"}`} href={"/admin/sectores?type=constantes"}>Sectores Constantes</Link>
      </aside>

      <Suspense fallback={<span className="loading loading-spinner text-primary"></span>} >
        <AdminSectoresList sectoresList={actualSectores} />
      </Suspense>

    </section>
  )
}
