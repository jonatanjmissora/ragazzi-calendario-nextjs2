import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { userSchema, UserType } from "../schema/user.type";
import { login } from "../actions/user.action";

type LoginRespType = {
  success: boolean;
  prevState: { username: string, userpassword: string };
  errors: { username: string, userpassword: string };
} | null

export const useLoginActionState = () => {
  const router = useRouter()

  const [formState, formAction, isPending] = useActionState(async (prevState: LoginRespType, formData: FormData) => {

    const { username, userpassword } = Object.fromEntries(formData.entries()) as { username: string, userpassword: string }

    const user = { username, userpassword } as UserType

    //client validation
    const { success, error } = userSchema.safeParse(user)
    if (!success) {
      const { username: usernameError, userpassword: userpasswordError } = error.flatten().fieldErrors
      return {
        success: false,
        prevState: { username, userpassword },
        errors: {
          username: usernameError ? usernameError[0] : "",
          userpassword: userpasswordError ? userpasswordError[0] : ""
        }
      }
    }

    const response = await login(user)

    if (!response.success) {
      return {
        success: false,
        prevState: { username, userpassword },
        errors: { ...response.errors }
      }
    }

    router.push('/pendientes')
    return { success: true, prevState: { username, userpassword }, errors: { username: "", userpassword: "" } }

  },
    null
  );

  return [formState, formAction, isPending] as const
}
