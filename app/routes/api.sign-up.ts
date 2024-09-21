import { ActionFunctionArgs, json } from "@remix-run/node"
import { EmailOtpType } from "@supabase/supabase-js"
import { supabase } from "~/lib/supabase.server"

export async function action({ request }: ActionFunctionArgs) {
  const payload = (await request.json()) as { hash: string }
  const params = new URLSearchParams(payload.hash.replace("#", "?"))

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: payload.hash,
      type: params.get("type")! as EmailOtpType,
    })

    return json(
      {
        data,
        message: error ? error.message : "Succesfully send the magic link!",
      },
      { status: error ? error.status : 200 }
    )
  } catch (error) {
    console.log("request error", error)
  }
  return json({ data: null, message: "Unknown error!" })
}
