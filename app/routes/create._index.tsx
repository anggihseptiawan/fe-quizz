import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"

export default function Index() {
  return (
    <div>
      <Link to="/create/quizz">
        <Button>Create a Quizz</Button>
      </Link>
    </div>
  )
}
