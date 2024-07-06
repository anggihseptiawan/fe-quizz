import { ActionFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/react"
import { supabase } from "~/lib/supabase.server"

interface RequestPayload {
  pin: string
  questions: { pin: string; content: string }[]
  answers: { content: string; is_correct: boolean; question_id: number }[]
}

export async function action({ request }: ActionFunctionArgs) {
  const data = (await request.json()) as RequestPayload
  const { error } = await supabase.from("rooms").insert({ pin: data.pin })
  if (error) {
    return json({ message: error.message }, { status: 400 })
  }

  const { data: questionIds, error: errorQuestions } = await supabase
    .from("questions")
    .insert(data.questions)
    .select("id")

  if (errorQuestions) {
    return json({ message: errorQuestions.message }, { status: 400 })
  }

  const answers = data.answers.map((answer, idx) => {
    answer.question_id = questionIds[Math.floor(idx / 4)].id
    return answer
  })

  const { error: errorAnswers } = await supabase.from("answers").insert(answers)
  if (errorAnswers) {
    return json({ message: errorAnswers.message }, { status: 400 })
  }

  return json({ message: "success" })
}
