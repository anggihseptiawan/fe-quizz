import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"

/* eslint-disable jsx-a11y/media-has-caption */
export default function Test() {
  return (
    <div className="w-full h-screen">
      <div className="flex items-center gap-4 mb-4">
        <p>🧘🏻 Pssttt!</p>
        <Link to="/live/OTg4Mjg1">
          <Button>Go!</Button>
        </Link>
      </div>
      <audio src="/aot.mp4" controls />
    </div>
  )
}
