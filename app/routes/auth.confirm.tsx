import { useLocation } from "@remix-run/react"
import axios, { AxiosError } from "axios"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function Auth() {
  // 'http://localhost:5173/auth/confirm
  // #access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6Inh1Q2d1dWhUZFJTUFlKSDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2p2Y3liZHZ1Z2VvbWFuY3drZ3N0LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIwZjVlZWM4YS1hZDM1LTQwOTUtYTFiNi0zMDA2MGM5ZGQxNjAiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzI0NDk4NjMxLCJpYXQiOjE3MjQ0OTUwMzEsImVtYWlsIjoiYW5nZ2loZm9yZGV2dkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiYW5nZ2loZm9yZGV2dkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiMGY1ZWVjOGEtYWQzNS00MDk1LWExYjYtMzAwNjBjOWRkMTYwIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib3RwIiwidGltZXN0YW1wIjoxNzI0NDk1MDMxfV0sInNlc3Npb25faWQiOiJmMGE3MDNlMi0yNjJjLTRiZmEtYWQyNi0wZjVkZWFkYTgxNGUiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.yEBbdIPv7e7BR-X8UIobzEUlDeri7kCR9whk1-0KqY0
  // &expires_at=1724498631
  // &expires_in=3600
  // &refresh_token=1v2cdTuo_NZkj6y_sOUD_g
  // &token_type=bearer
  // &type=signup'
  const location = useLocation()

  useEffect(() => {
    const loading = toast.loading("Verifying your email")
    axios
      .post("/api/verify", { hash: location.hash })
      .then(() => {
        toast.success("Email verified!")
      })
      .catch((error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message || error.message)
      })
      .finally(() => toast.dismiss(loading))
  }, [])

  return (
    <div className="flex h-screen">
      <div className="w-full">
        <img src="/joins-forces.png" className="w-full" alt="join" />
      </div>
      <div className="w-full">
        <h1 className="text-2xl text-center font-bold">Sign In</h1>
      </div>
    </div>
  )
}
