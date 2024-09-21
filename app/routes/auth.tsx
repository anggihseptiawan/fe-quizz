import { ActionFunctionArgs, json } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { supabase } from "~/lib/supabase.server"
import { getUrl } from "~/utils/getUrl"

export async function loader() {
  const BE_URL = process.env.BACKEND_SERVICE!
  return json({ url: BE_URL })
}

export default function Auth() {
  const { url } = useLoaderData<typeof loader>()

  return (
    <div className="flex gap-8 py-8">
      <div className="w-1/2 bg-indigo-900 rounded-lg overflow-hidden">
        <img
          src={`${url}images/auth.jpg`}
          alt="3 people working together"
          className="w-full"
        />
      </div>
      <div className="w-1/2">
        <Form method="POST">
          <div className="grid gap-6 py-4">
            <div>
              <h1 className="font-bold text-2xl text-center mb-2">Sign In</h1>
              <p className="text-center">
                Enter your email and password to sign in.
              </p>
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                className="col-span-3"
                name="email"
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                className="col-span-3"
                name="password"
              />
            </div>
            <div>
              <small className="block mb-2">
                Sign In if you have an account, Sign Up if you don&apos;t have
                one.
              </small>
              <div className="flex gap-4">
                <Button
                  className="w-full font-semibold"
                  type="submit"
                  name="intent"
                  value="sign-in"
                >
                  Sign In
                </Button>
                <Button
                  className="w-full font-semibold"
                  type="submit"
                  name="intent"
                  value="sign-up"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent") as "sign-in" | "sign-up"

  const response = { data: null, message: "", status: 200 }
  try {
    if (intent === "sign-up") {
      const { error } = await supabase.auth.signUp({
        email: formData.get("email") as string,
        password: formData.get("intent") as string,
        options: {
          emailRedirectTo: `${getUrl()}/dashboard`,
        },
      })

      console.log("error signup", error)
      response.message = error
        ? error.message
        : "Successfully send confirmation link"
      response.status = error ? error.status || 400 : 200
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("intent") as string,
      })
      response.message = error ? error.message : "Successfully sign you in"
      response.status = error ? error.status || 400 : 200
    }
  } catch (error) {
    response.message = "Unknown error!"
  }

  return json(
    { data: response.data, message: response.message },
    { status: response.status }
  )
}
