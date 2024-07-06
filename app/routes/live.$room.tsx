import { useLocation, useNavigate } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { useSocket } from "~/context"
import { Player } from "~/types/quizz"

export default function Index() {
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
      <div className="flex justify-between mb-3">
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
      <div className="flex flex-wrap gap-6 mb-6">
        {players.map((player) => (
          <figure key={player.id}>
            <img
              src={player.hero}
              className="h-40 w-40 object-cover rounded-lg mb-2"
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
