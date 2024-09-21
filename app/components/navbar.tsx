import { Link } from "@remix-run/react"
// <a href="https://www.freepik.com/free-ai-image/anime-style-character-space_122499675.htm#query=anime%20character&position=29&from_view=keyword&track=ais_hybrid&uuid=a9cb2992-df5f-4fda-9607-5f7c6ddd8296">Image by freepik</a>

export const Navbar = () => (
  <nav className="flex justify-between py-5">
    <Link to="/" className="flex gap-1 items-center">
      <span className="font-bold text-xl">Quizzy</span>
      <small className="bg-indigo-500 rounded-sm px-2 py-[2px] font-bold text-xs">
        Beta
      </small>
    </Link>
    <div className="flex gap-3 items-center sm:gap-10">
      <Link to="/create" className="font-semibold">
        Create
      </Link>
      <Link to="/join" className="font-semibold">
        Join
      </Link>
      <Link to="/auth" className="font-semibold">
        Sign In
      </Link>
    </div>
  </nav>
)
