import { Link } from "@remix-run/react"

export const Navbar = () => (
  <nav className="flex justify-between py-5">
    <Link to="/" className="font-bold">
      Quizz
    </Link>
    <div className="flex gap-8">
      <Link to="/create" className="font-semibold">
        Create
      </Link>
      <Link to="/join" className="font-semibold">
        Join
      </Link>
    </div>
  </nav>
)
