import { json, useLoaderData, useLocation, useNavigate } from "@remix-run/react"
import { useEffect, useState } from "react"
import { useSocket } from "~/context"
import { Player } from "~/types/quizz"

export async function loader() {
  const BE_URL = process.env.BACKEND_SERVICE!
  return json({ url: BE_URL })
}

export default function Index() {
  const { url } = useLoaderData<typeof loader>()
  const socket = useSocket()
  const location = useLocation()
  const navigate = useNavigate()
  const encryptedRoom = location.pathname.split("/")[2]
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    if (!socket) return

    const room = atob(encryptedRoom)
    socket.emit("get-player", room)

    socket.on("get-player", (players: Player[]) => {
      setPlayers(players)
    })

    socket.on("start", () => {
      navigate(`/war/${encryptedRoom}`, { replace: true })
    })
  }, [socket])

  return (
    <div>
      <h1 className="text-center font-semibold text-2xl mb-4">Waiting Room</h1>

      <div className="flex gap-4 flex-wrap">
        {players.map((player, idx) => (
          <figure key={idx} className="basis-[120px] sm:basis-[160px] flex-1">
            <img
              src={`${url}images${player.hero}`}
              className="h-32 sm:h-40 w-full rounded-lg object-cover mb-2"
              alt={player.hero}
            />
            <figcaption className="text-center font-semibold">
              {player.player.split("--")[0]}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
