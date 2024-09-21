/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from "react"
import Hls from "hls.js"

export const VideoPlayer = ({ url }: { url: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(`${url}videos/stream.m3u8`)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play()
      })
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = `${url}videos/stream.m3u8`
      video.addEventListener("loadedmetadata", function () {
        video.play()
      })
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 w-full opacity-55">
      <video ref={videoRef} className="w-full" />
    </div>
  )
}
