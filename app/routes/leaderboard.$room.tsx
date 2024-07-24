/* eslint-disable jsx-a11y/media-has-caption */
import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData, useLocation } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { useSocket } from "~/context"
import { supabase } from "~/lib/supabase.server"
import Confetti from "react-confetti"
import type { Player } from "~/types/quizz"

export async function loader({ params }: LoaderFunctionArgs) {
  const room = atob(params.room || "")

  const { data, error: errorQuestions } = await supabase
    .from("wars")
    .select()
    .eq("room_id", room)

  if (errorQuestions) return json(null)
  data.sort((a, z) => z.score - a.score)
  return json(data as Player[])
}

export default function Index() {
  const allPlayers = useLoaderData<typeof loader>()
  const [players, setPlayers] = useState(allPlayers || [])
  const [isAllPlayerFinished, setIsAllPlayerFinished] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1440, height: 800 })
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

    socket.on("player-finish", (data: Player[]) => {
      const isAllFinished = data.every((player) => !!player.finish)
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      setIsAllPlayerFinished(isAllFinished)
      setTimeout(() => setIsAllPlayerFinished(false), 10000)
      setPlayers(data)
    })

    function playAudio() {
      audioRef.current?.play()
    }

    window.addEventListener("click", playAudio)

    return () => window.removeEventListener("click", playAudio)
  }, [socket])

  function renderPosition(position: number) {
    switch (position) {
      case 0:
        return <span>🏆</span>
      case 1:
        return <span>🥈</span>
      case 2:
        return <span>🥉</span>
      default:
        return <span>{position + 1}th</span>
    }
  }

  return (
    <>
      {isAllPlayerFinished && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      <div className="py-10">
        <h1 className="font-bold text-center text-2xl mb-6">
          Live Score Leaderboard
        </h1>
        <audio ref={audioRef} src="/aot.mp4"></audio>
        <section className="md:w-1/2 mx-auto pr-8 sm:pr-0">
          {players?.map((player, idx) => (
            <div
              key={player.id}
              className="relative w-full flex justify-between items-start p-1 mb-2 h-18 rounded-sm"
            >
              <span className="absolute top-1 z-10 bg-indigo-600 text-2xl font-bold px-2 rounded-sm">
                {player.player.split("--")[0]}
              </span>
              <img
                src={player.hero}
                className="absolute top-0 left-0 h-18 border border-indigo-600 w-full object-cover mb-2 rounded-sm"
                alt={player.player}
              />
              <span className="absolute top-1 right-1 bg-indigo-600 rounded-sm px-1 tabular-nums tracking-tight text-5xl font-bold">
                {player.score}
              </span>
              <div className="w-8 h-8 flex justify-center items-center absolute top-0 -right-10 bg-indigo-700 rounded-sm">
                {renderPosition(idx)}
              </div>
              <div className="w-8 h-8 flex justify-center items-center absolute top-10 -right-10 border border-indigo-500 rounded-sm">
                {player.finish ? <span>🎉</span> : <span>🧘🏻</span>}
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
