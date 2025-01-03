"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function MenuLinks() {

  const pathname = usePathname()

  return (
    <nav className='flex flex-col gap-3'>
      <Link className={`w-full text-center font-bold tracking-wider px-2 py-1 rounded-xl ${pathname === "/pendientes" && "bg-slate-400 text-slate-900"}`} href={"/pendientes"}>pendientes</Link>
      <Link className={`w-full text-center font-bold tracking-wider px-2 py-1 rounded-xl ${pathname === "/realizados" && "bg-slate-400 text-slate-900"}`} href={"/realizados"}>realizados</Link>
      <Link className={`w-full text-center font-bold tracking-wider px-2 py-1 rounded-xl ${pathname === "/admin" && "bg-slate-400 text-slate-900"}`} href={"/admin"}>admin</Link>
      <div className={`${pathname.includes("/admin") ? "block" : "hidden"} text-xs w-full flex flex-col justify-end items-end gap-3`}>
        <Link className={`w-3/4 text-center font-bold tracking-wider rounded-xl ${pathname === "/admin/sectores" && "bg-slate-400 text-slate-900"}`} href={"/admin/sectores?type=actuales"}>sectores</Link>
        <Link className={`w-3/4 text-center font-bold tracking-wider rounded-xl ${pathname === "/admin/weblinks" && "bg-slate-400 text-slate-900"}`} href={"/admin/weblinks"}>weblinks</Link>
      </div>
    </nav>
  )
}
