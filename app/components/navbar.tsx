import { Link } from "@remix-run/react"

export const Navbar = () => (
  <nav className="flex justify-between py-5">
    <Link to="/" className="flex gap-1 items-center">
      <span className="font-bold text-xl">Quizzy</span>
      <small className="bg-indigo-500 rounded-sm px-2 py-[2px] font-bold text-xs">
        Beta
      </small>
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
