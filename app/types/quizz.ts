export interface Questions {
  question: string
  answers: {
    id: number
    created_at: string
    content: string
    is_correct: boolean
    question_id: number
  }[]
}

export interface Player {
  id: number
  name: string
  hero: string
  player: string
  score: number
}
