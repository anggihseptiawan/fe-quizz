import { Link } from "@remix-run/react"

export const Navbar = () => (
  <nav className="flex justify-between py-5">
    <Link to="/" className="font-bold">
      Quizzy
    </Link>
    <div className="flex gap-8">
      <Link to="/create" className="font-semibold">
        Create
      </Link>
      <Link to="/join" className="font-semibold">
        Join
      </Link>
      <Link to="/signin" className="font-semibold">
        Sign In
      </Link>
    </div>
  </nav>
)
