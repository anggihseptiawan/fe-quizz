import { json, useLoaderData, useLocation, useNavigate } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { useSocket } from "~/context"
import { Player } from "~/types/quizz"

export async function loader() {
  const BE_URL = process.env.BACKEND_SERVICE!
  return json({ url: BE_URL })
}

export default function Index() {
  const { url } = useLoaderData<typeof loader>()
  const [players, setPlayers] = useState<Player[]>([])
  const location = useLocation()
  const encryptedRoom = location.pathname.split("/")[2]
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    if (!socket) return

    const room = atob(encryptedRoom)
    socket.emit("get-player", room)

    socket.on("get-player", (players: Player[]) => {
      setPlayers(players)
    })
  }, [socket])

  function startTheQuizz() {
    if (!socket) return

    const room = atob(encryptedRoom)
    socket.emit("start", room)
    navigate(`/leaderboard/${encryptedRoom}`, { replace: true })
  }

  return (
    <div className="py-10">
      <h1 className="text-4xl text-center font-bold mb-6">
        Room: {atob(encryptedRoom)}
      </h1>
      <div className="flex justify-between mb-4">
        <p className="font-bold text-xl">
          {players.length
            ? "List of Players"
            : "Waiting for the players to join..."}
        </p>
        {!!players.length && (
          <Button className="font-bold" onClick={startTheQuizz}>
            Start 🔥
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {players.map((player) => (
          <figure
            key={player.id}
            className="basis-[120px] sm:basis-[160px] flex-1"
          >
            <img
              src={`${url}images${player.hero}`}
              className="h-32 sm:h-40 w-full object-cover rounded-lg mb-2"
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
