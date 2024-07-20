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
import { useNavigate } from "@remix-run/react"
import { useSocket } from "~/context"

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
    <div className="relative basis-[160px] flex-1">
      <img
        src={hero}
        className={`h-40 w-full object-cover rounded-lg mb-2 cursor-pointer ${
          isActive
            ? "transition-[border] duration-300 border-[5px] border-indigo-500"
            : ""
        }`}
        alt={hero}
        onClick={handleClick}
      />
      {/* {isActive && <span className="absolute top-14 left-16 text-3xl">🤞</span>} */}
    </div>
  )
}

const formSchema = z.object({
  room: z.string().min(6, "Room must be 6 characters."),
  name: z.string().min(1, "Name is required."),
})

export default function Index() {
  const [activeId, setActiveId] = useState(0)
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
    <div>
      <h1 className="text-center text-2xl font-bold mb-5">Join a Quizz</h1>
      <p className="text-center mb-3">
        Enter the Room, pick your hero, give it a name, and you&apos;re ready to
        go!
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
                      className="w-full sm:w-64 h-12 px-4 text-lg"
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
                            className="w-16 h-16 text-xl"
                            index={0}
                          />
                          <InputOTPSlot
                            className="w-16 h-16 text-xl"
                            index={1}
                          />
                          <InputOTPSlot
                            className="w-16 h-16 text-xl"
                            index={2}
                          />
                          <InputOTPSlot
                            className="w-16 h-16 text-xl"
                            index={3}
                          />
                          <InputOTPSlot
                            className="w-16 h-16 text-xl"
                            index={4}
                          />
                          <InputOTPSlot
                            className="w-16 h-16 text-xl"
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

      <div className="flex flex-wrap gap-6">
        {heros.map((hero, idx) => (
          <Hero
            key={idx}
            hero={hero}
            handleClick={() => setActiveId(idx)}
            isActive={idx === activeId}
          />
        ))}
      </div>
    </div>
  )
}
