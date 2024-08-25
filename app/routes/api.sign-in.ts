import { ActionFunctionArgs, json } from "@remix-run/node"
import { supabase } from "~/lib/supabase.server"
import { getUrl } from "~/utils/getUrl"

export async function action({ request }: ActionFunctionArgs) {
  const payload = (await request.json()) as { email: string }
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: payload.email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${getUrl()}/auth/confirm`,
      },
    })

    return json(
      {
        data,
        message: !error
          ? "Succesfully send the magic link!"
          : error.code === "over_email_send_rate_limit"
          ? "Send email limit exceeded"
          : "User not found!",
      },
      { status: !error ? 200 : error.status }
    )
  } catch (error) {
    console.log("request error", error)
  }
  return json({ data: null, message: "Unknown error!" })
}
