"use client"

import UploadSVG from "@/app/_assets/UploadSVG";
import { editarNewWeblinkAction, editarWeblinkAction, insertarWeblinkAction } from "@/app/_lib/actions/weblinks.action";
import { ServerResponseType } from "@/app/_lib/schema/serverResponse.type";
import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState } from "react"
import toast from "react-hot-toast";
import SubmitBtn from "../SubmitBtn";
import AdminweblinkEditFormModal from "./Admin_weblink_EditForm_Modal";

const isSame = (oldLink: WeblinkType, newLink: WeblinkType) => {
  return (oldLink._id === newLink._id &&
    oldLink.href === newLink.href &&
    oldLink.imgData === newLink.imgData.substring(23))
}

export default function WeblinkEditForm({ weblink }: { weblink: WeblinkType }) {

  const [imgFile, setImgFile] = useState<File | null>(null)
  const [imgData, setImgData] = useState<string>(weblink.imgData ? "data:image/jpeg;base64," + weblink.imgData : "")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const baseURL = reader.result as string;
        setImgData(baseURL)
        setImgFile(file)
      };
    }
  }

  const [formState, formAction, isPending] = useActionState(async (prevState: ServerResponseType, formData: FormData) => {
    const newWeblink = Object.fromEntries(formData.entries()) as WeblinkType

    if (isSame(weblink, newWeblink)) return {
      success: false,
      prevState: { _id: newWeblink._id, href: newWeblink.href },
      message: "Los campos son iguales"
    }

    if (!imgData) {
      return {
        success: false,
        prevState: { _id: newWeblink._id, href: newWeblink.href },
        message: "No hay imagen"
      }
    }

    // si es link nuevo
    if (!weblink._id) {

      const serverResponse = await insertarWeblinkAction(newWeblink)
      if (serverResponse.success) {
        toast.success(serverResponse.message)
        router.push("/admin/weblinks")
      }
      return serverResponse
    }
    // si hay que editar
    else {
      const serverResponse2 = weblink._id === newWeblink._id
        ? await editarWeblinkAction(newWeblink)
        : await editarNewWeblinkAction(weblink, newWeblink)

      if (serverResponse2.success) {
        toast.success(serverResponse2.message)
        router.push("/admin/weblinks")
      }
      return serverResponse2
    }

  }, null)

  return (
    <>
      <form action={formAction} className="flex flex-col items-center justify-center gap-10 w-[40rem]">

        <p className="text-3xl font-bold tracking-wide py-4 my-4 border-b w-full">{weblink._id ? "Editar" : "Crear"} link :</p>

        <div className="w-full flex gap-4">

          <div className="flex flex-col gap-2 w-1/4 h-max">
            {
              imgData
                ? <AdminweblinkEditFormModal imgData={imgData} imgFileName={imgFile?.name ?? "image"} />
                // ? <div className="bg-slate-300 rounded-lg overflow-hidden w-[160px] h-[100px] relative">
                //   <Image src={imgData} alt={imgFile?.name ?? "image"} fill className="p-2 object-contain" />

                // </div>
                : <div className="w-[160px] h-[100px] bg-slate-300 rounded-lg overflow-hidden p-2"></div>}

            <label className="input input-bordered p-4 py-2 cursor-pointer flex justify-center items-center gap-2 w-full" htmlFor="file"><UploadSVG className="size-5 text-slate-300" currentColor="currentColor" />imagen</label>
            <input ref={inputRef} className={"hidden"} type="file" name="image" id="file" accept=".jpeg, .png, .jpg, .webp"
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex flex-col justify-between text-center gap-2">
            <input className="input text-right" type="text" name="_id" id="_id" defaultValue={formState?.prevState?._id ?? weblink._id} required />
            <input className="input text-right" type="text" name="href" id="href" defaultValue={formState?.prevState?.href ?? weblink.href} required />
            <input className="hidden" type="text" name="imgData" id="imgData" defaultValue={imgData} />
          </div>


        </div>

        <div className="w-full flex flex-col justify-end items-end gap-2">
          <div className="w-1/2 flex gap-2">
            <SubmitBtn text={"Upload"} isPending={isPending} />
            <Link className="btn btn-outline flex-1" href={"/admin/weblinks"} >Cancelar</Link>
          </div>
          {
            formState?.message
              ? <span className="text-yellow-700">{formState?.message}</span>
              : <span className="h-6"></span>
          }
        </div>

      </form>

    </>
  )
}