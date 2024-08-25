export const getUrl = () => {
  return process.env.NODE_ENV
    ? "http://localhost:5173"
    : "https://quizclashs.vercel.app"
}
