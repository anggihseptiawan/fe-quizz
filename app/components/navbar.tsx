import { Link } from "@remix-run/react"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"

// <a href="https://www.freepik.com/free-ai-image/anime-style-character-space_122499675.htm#query=anime%20character&position=29&from_view=keyword&track=ais_hybrid&uuid=a9cb2992-df5f-4fda-9607-5f7c6ddd8296">Image by freepik</a>

export const Navbar = () => {
  const [email, setEmail] = useState("")

  async function signIn() {
    await axios
      .post("/api/sign-in", {
        email,
      })
      .then((res) => toast.success(res.data.message))
      .catch((error: AxiosError<{ data: unknown; message: string }>) => {
        console.log("error", error)
        toast.error(error.response?.data.message || "")
      })
  }

  return (
    <nav className="flex justify-between py-5">
      <Link to="/" className="flex gap-1 items-center">
        <span className="font-bold text-xl">Quizzy</span>
        <small className="bg-indigo-500 rounded-sm px-2 py-[2px] font-bold text-xs">
          Beta
        </small>
      </Link>
      <div className="flex gap-3 items-center sm:gap-8">
        <Link to="/create" className="font-semibold">
          Create
        </Link>
        <Link to="/join" className="font-semibold">
          Join
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Sign In</Button>
          </SheetTrigger>
          <SheetContent className="bg-indigo-950 border-l-indigo-500">
            <SheetHeader>
              <SheetTitle className="text-center text-white">
                Sign In
              </SheetTitle>
              <SheetDescription className="text-white text-left">
                We know that memorizing passwords is a pain, so we use magic
                link to sign you in.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  className="col-span-3"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <small className="block text-white mb-2">
              If your email isn&apos;t registered yet, no worries, we&apos;ll
              sign you up automatically.
            </small>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="w-full" onClick={signIn}>
                  Sign In
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
