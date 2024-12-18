"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function RubroFilter() {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  if (pathname.includes("/admin")) return

  // const [actualFilter, setActualFilter] = useState<string>("todos")
  const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]

  const rubroFilter = searchParams.get("rubroFilter") || "todos"

  const handleClick = (filterName: string) => {
    const params = new URLSearchParams(searchParams);

    if (rubroFilter !== "") {
      params.set('rubroFilter', filterName);
    } else {
      params.delete('rubroFilter');
    }
    router.replace(`${pathname}?${params.toString()}`);

  }

  return (
    <ul className="flex flex-col gap-3">
      {
        filters.map(filter =>
          <li
            key={filter}
            className={`w-full badge badge-outline text-slate-600 ${filter === rubroFilter && "badge-primary"} px-5 py-3 text-base cursor-pointer`}
            onClick={() => handleClick(filter)}
          >
            {filter}
          </li>
        )
      }

    </ul>
  )
}
