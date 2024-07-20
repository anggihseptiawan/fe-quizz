/* eslint-disable jsx-a11y/media-has-caption */
import { LoaderFunctionArgs } from "@remix-run/node"
import { json, useLoaderData, useNavigate } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { supabase } from "~/lib/supabase.server"
import { Questions } from "~/types/quizz"
import { useSocket } from "~/context"

export async function loader({ params }: LoaderFunctionArgs) {
  const { data: dataQuestions, error } = await supabase
    .from("questions")
    .select()
    .eq("pin", atob(params.room as string))
  if (error) return json({ questions: [], room: params.room })

  const finalData: Questions[] = []
  for (let i = 0; i < dataQuestions.length; i++) {
    const { data: dataAnswers, error } = await supabase
      .from("answers")
      .select()
      .eq("question_id", dataQuestions[i].id)

    if (error) return json({ questions: [], room: params.room })
    const data = {
      question: dataQuestions[i].content,
      answers: dataAnswers,
    }
    finalData.push(data)
  }

  return json({ questions: finalData, room: params.room })
}

const DEFAULT_TIMER = 30
export default function Index() {
  const { questions, room } = useLoaderData<typeof loader>()
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [isShowCorrectAnswer, setIsShowCorrectAnswer] = useState(false)
  const [timer, setTimer] = useState(DEFAULT_TIMER)
  const [startTime, setStartTime] = useState(Date.now())
  const navigate = useNavigate()
  const socket = useSocket()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const current = Math.max(0, prevTimer - 1)
        if (current === 0) {
          setActiveQuestion((prev) => {
            const current = prev + 1
            if (current === questions.length) {
              navigate("/join", { replace: true })
            }
            return current
          })
          return DEFAULT_TIMER
        }
        return current
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      socket?.close()
    }
  }, [socket])

  function handleClick(result: boolean) {
    if (!socket) return
    const workTime = Date.now() - startTime
    const maxTime = DEFAULT_TIMER * 1000
    const point = result ? Math.floor((maxTime - workTime) / 100) : 0
    setStartTime(Date.now())
    socket.emit("set-score", {
      room: atob(room as string),
      name: localStorage.getItem("name"),
      score: point,
    })
    setIsShowCorrectAnswer(true)
    setTimeout(() => {
      setActiveQuestion((prev) => {
        const current = prev + 1
        if (current === questions.length) {
          if (socket) {
            socket.emit("finish", {
              room: atob(room as string),
              name: localStorage.getItem("name"),
            })
          }
          localStorage.removeItem("name")
          navigate("/join", { replace: true })
        }
        return current
      })
      setIsShowCorrectAnswer(false)
      setTimer(DEFAULT_TIMER)
    }, 600)
  }

  return (
    <div className="py-10">
      <div className="flex justify-between mb-10">
        <p>
          <span className="font-semibold">{activeQuestion + 1}</span> out of{" "}
          <span className="font-semibold">{questions.length}</span> questions
        </p>
        <div className="h-14 w-14 flex justify-center items-center bg-primary rounded-md">
          <span className="text-white text-2xl font-bold">{timer}</span>
        </div>
      </div>
      <div>
        {questions
          .filter((_, idx) => idx === activeQuestion)
          .map((question, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between h-96 w-full"
            >
              <h1 className="text-center text-3xl font-bold">
                {question?.question}
              </h1>
              <div className="flex flex-wrap justify-between w-full">
                {question?.answers.map((answer, idx) => (
                  <div key={idx} className="w-[49%] mb-4">
                    <Button
                      className={`block w-full h-16 text-lg ${
                        isShowCorrectAnswer
                          ? answer.is_correct
                            ? "hover:bg-indigo-800 bg-indigo-800 border-2 border-indigo-800"
                            : "hover:bg-indigo-400 bg-indigo-400 border-2 border-indigo-800"
                          : ""
                      }`}
                      onClick={() => handleClick(answer.is_correct)}
                    >
                      {answer.content}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
