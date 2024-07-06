import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Quizz" },
    { name: "description", content: "Welcome to Quizz!" },
  ]
}

export default function Index() {
  return (
    <div className="py-12">
      <h1 className="text-5xl text-center font-bold">Welcome to Quizz</h1>
    </div>
  )
}
