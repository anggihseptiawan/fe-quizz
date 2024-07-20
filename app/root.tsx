import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"
import type { LinksFunction, MetaFunction } from "@remix-run/node"
import stylesheet from "~/tailwind.css?url"
import { Navbar } from "./components/navbar"
import { SocketProvider } from "./context"
import { useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
import { CloudOff } from "lucide-react"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
]

export const meta: MetaFunction = () => {
  return [
    { title: "Quizz" },
    { name: "description", content: "Welcome to Quizz!" },
  ]
}

export async function loader() {
  return json({ env: process.env.BACKEND_SERVICE })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOffLine, setIsOffLine] = useState(false)

  useEffect(() => {
    function handleOffline(status: boolean) {
      setIsOffLine(status)
    }

    window.addEventListener("offline", () => handleOffline(true))
    window.addEventListener("online", () => handleOffline(false))

    return () => {
      window.removeEventListener("offline", () => handleOffline(true))
      window.removeEventListener("online", () => handleOffline(false))
    }
  }, [])
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="text-white">
        {isOffLine && (
          <div className="bg-red-600 text-white py-2 px-6">
            <div className="flex gap-2">
              <CloudOff />
              <p className="font-semibold">
                Hey, there is a network issue, you are currently offline!
              </p>
            </div>
          </div>
        )}
        <div className="max-w-6xl mx-auto px-6">
          <Navbar />
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const socket = io(data.env || "")
    setSocket(socket)
    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on("confirmation", (data) => {
      console.log("", data)
    })
  }, [socket])

  return (
    <SocketProvider socket={socket}>
      <Outlet />
    </SocketProvider>
  )
}
