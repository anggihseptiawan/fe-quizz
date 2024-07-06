/* eslint-disable jsx-a11y/media-has-caption */
import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData, useLocation } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { useSocket } from "~/context"
import { supabase } from "~/lib/supabase.server"
import type { Player } from "~/types/quizz"

export async function loader({ params }: LoaderFunctionArgs) {
  const room = atob(params.room || "")

  const { data, error: errorQuestions } = await supabase
    .from("wars")
    .select()
    .eq("room_id", room)

  if (errorQuestions) return json(null)

  return json(data as Player[])
}

export default function Index() {
  const allPlayers = useLoaderData<typeof loader>()
  const [players, setPlayers] = useState(allPlayers || [])
  const location = useLocation()
  const socket = useSocket()
  const encryptedRoom = location.pathname.split("/")[2]
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!socket) return

    const room = atob(encryptedRoom)
    socket.emit("leaderboard", room)

    socket.on("score", (data: Player[]) => {
      const modifieddPlayers = [...players]
      let targetIndex = -1
      const player = modifieddPlayers.find((player, idx) => {
        targetIndex = idx
        return player.id === data[0].id
      })
      if (player) {
        player.score = data[0].score
        modifieddPlayers.splice(targetIndex, 1, player)
        modifieddPlayers.sort((a, b) => b.score - a.score)
        setPlayers(modifieddPlayers)
      }
    })

    function playAudio() {
      audioRef.current?.play()
    }

    window.addEventListener("click", playAudio)

    return () => window.removeEventListener("click", playAudio)
  }, [socket])

  return (
    <div className="py-10">
      <h1 className="font-bold text-center text-2xl mb-6">
        Live Score Leaderboard
      </h1>
      <audio ref={audioRef} src="/aot.mp4"></audio>
      <section className="sm:w-2/3 mx-auto">
        {players?.map((player) => (
          <div
            key={player.id}
            className="flex justify-between mb-5"
            // style={{
            //   backgroundImage: `url(${player.hero})`,
            //   backgroundPosition: "center",
            // }}
          >
            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold w-32 -mt-4">
                {player.player.split("--")[0]}
              </p>
              <img
                src={player.hero}
                className="h-16 w-[460px] object-cover mb-2 shrink-0"
                alt={player.player}
              />
            </div>
            <p className="text-5xl font-bold">{player.score}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
