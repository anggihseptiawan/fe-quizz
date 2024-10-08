/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { heros } from "~/constants/hero"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { json, useLoaderData, useNavigate } from "@remix-run/react"
import { useSocket } from "~/context"

export async function loader() {
  const BE_URL = process.env.BACKEND_SERVICE!
  const randomId = Math.floor(Math.random() * 17)
  return json({ url: BE_URL, randomId })
}

function Hero({
  hero,
  isActive,
  handleClick,
}: {
  hero: string
  isActive: boolean
  handleClick: () => void
}) {
  return (
    <div className="relative basis-[120px] sm:basis-[160px] flex-1">
      <img
        src={hero}
        className={`h-32 sm:h-40 w-full object-cover rounded-lg cursor-pointer border-[7px] ${
          isActive ? "border-indigo-600" : "border-gray-100 opacity-60"
        }`}
        alt={hero}
        onClick={handleClick}
      />
    </div>
  )
}

const formSchema = z.object({
  room: z.string().min(6, "Room must be 6 characters."),
  name: z.string().min(1, "Name is required."),
})

export default function Index() {
  const { url, randomId } = useLoaderData<typeof loader>()
  const [activeId, setActiveId] = useState(randomId)
  const navigate = useNavigate()
  const socket = useSocket()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (!socket) return
    const uniqName = data.name + "--" + Math.random().toString().split(".")[1]
    const payload = {
      ...data,
      name: uniqName,
      hero: heros[activeId],
    }
    localStorage.setItem("name", uniqName)
    socket.emit("join", payload)
    navigate(`/waiting/${btoa(data.room)}`, { replace: true })
  }

  return (
    <div className="py-10">
      <h1 className="text-center text-2xl font-bold mb-5">Join a Quizz</h1>
      <p className="text-center mb-3">
        Enter the Room, pick your fighter, give it a name, and you&apos;re ready
        to go!
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center flex-wrap gap-2 mb-6">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder="Your name"
                      className="w-full min-w-40 sm:w-64 h-12 px-4 text-lg"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 mb-2">
              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot
                            className="w-12 h-12 sm:w-16 sm:h-16 text-xl"
                            index={0}
                          />
                          <InputOTPSlot
                            className="w-12 h-12 sm:w-16 sm:h-16 text-xl"
                            index={1}
                          />
                          <InputOTPSlot
                            className="w-12 h-12 sm:w-16 sm:h-16 text-xl"
                            index={2}
                          />
                          <InputOTPSlot
                            className="w-12 h-12 sm:w-16 sm:h-16 text-xl"
                            index={3}
                          />
                          <InputOTPSlot
                            className="w-12 h-12 sm:w-16 sm:h-16 text-xl"
                            index={4}
                          />
                          <InputOTPSlot
                            className="w-12 h-12 sm:w-16 sm:h-16 text-xl"
                            index={5}
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-1 sm:justify-end">
              <Button className="font-semibold px-6">Join</Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="flex flex-wrap gap-3">
        {heros.map((hero, idx) => (
          <Hero
            key={idx}
            hero={`${url}images${hero}`}
            handleClick={() => setActiveId(idx)}
            isActive={idx === activeId}
          />
        ))}
      </div>
    </div>
  )
}
