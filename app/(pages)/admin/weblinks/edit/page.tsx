import getUserFromCookie from "@/app/_lib/utils/getUserFromCookies";
import { redirect } from "next/navigation";
import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import { getWeblinkByIdAction } from "@/app/_lib/actions/weblinks.action";
import WeblinkEditForm from "@/app/_components/Dashboard/Admin_Weblinks/Admin_Weblink_EditForm";

export default async function WeblinkEdit({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const id = (await searchParams)?.id || ""
  const weblink = await getWeblinkByIdAction(id) as WeblinkType

  let actualLink = { _id: "", href: "", imgData: "" }
  if (id) actualLink = { ...weblink }

  return (
    <section className="w-full main-height flex flex-col items-center justify-center">
      <WeblinkEditForm weblink={actualLink} />
    </section>
  )
}
