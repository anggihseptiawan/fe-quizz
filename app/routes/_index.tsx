import { Link } from "@remix-run/react"
import {
  Clapperboard,
  Dumbbell,
  FlaskConical,
  History,
  Map,
  SquareRadical,
} from "lucide-react"

export default function Index() {
  return (
    <div>
      <section className="w-full py-12 md:py-24">
        <div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-[4.5rem] 2xl:text-[5rem] text-primary-foreground mb-6">
                Unleash Your Knowledge with Quizzy
              </h1>
              <p className="mx-auto max-w-[700px] text-primary-foreground md:text-xl mb-8 opacity-80">
                Endless quizzes, no login required. Compete with friends or
                strangers in real-time. Challenge yourself and your friends in a
                variety of engaging topics.
              </p>
              <Link
                to="#"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                // prefetch={false}
              >
                Start Quiz
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="/hero-image-9.svg"
                width={600}
                height={400}
                alt="Hero"
                className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-4 px-0">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Explore Featured Quiz Categories
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse through a wide range of engaging quiz topics and
                challenge yourself.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center justify-center space-y-2 bg-indigo-950 rounded-lg p-6">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground">
                <FlaskConical />
              </div>
              <h3 className="text-lg font-bold">Science</h3>
              <p className="text-sm text-center text-muted-foreground">
                Test your knowledge on various scientific topics.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 bg-indigo-950 rounded-lg p-6">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground">
                <History />
              </div>
              <h3 className="text-lg font-bold">History</h3>
              <p className="text-sm text-center text-muted-foreground">
                Dive into the past and test your historical knowledge.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 bg-indigo-950 rounded-lg p-6">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground">
                <Dumbbell />
              </div>
              <h3 className="text-lg font-bold">Sports</h3>
              <p className="text-sm text-center text-muted-foreground">
                Challenge your sports trivia knowledge.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 bg-indigo-950 rounded-lg p-6">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground">
                <Map />
              </div>
              <h3 className="text-lg font-bold">Geography</h3>
              <p className="text-sm text-center text-muted-foreground">
                Explore the world and test your geographic knowledge.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 bg-indigo-950 rounded-lg p-6">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground">
                <Clapperboard />
              </div>
              <h3 className="text-lg font-bold">Entertainment</h3>
              <p className="text-sm text-center text-muted-foreground">
                Test your knowledge on movies, TV shows, and more.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 bg-indigo-950 rounded-lg p-6">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground">
                <SquareRadical />
              </div>
              <h3 className="text-lg font-bold">Math</h3>
              <p className="text-sm text-center text-muted-foreground">
                Challenge your mathematical skills and problem-solving
                abilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-0">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Popular Quizzes
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out some of the most popular quizzes on our platform.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="flex flex-col bg-indigo-950 rounded-lg overflow-hidden">
              <img
                src="/science.svg"
                width={300}
                height={200}
                alt="Quiz Thumbnail"
                className="aspect-[3/2] object-contain py-2 mx-auto"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div className="mb-3">
                  <h3 className="text-lg font-bold">Science Quiz</h3>
                  <p className="text-sm text-muted-foreground">
                    Test your knowledge on various scientific topics.
                  </p>
                </div>
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  // prefetch={false}
                >
                  Play
                </Link>
              </div>
            </div>
            <div className="flex flex-col bg-indigo-950 rounded-lg overflow-hidden">
              <img
                src="/history.svg"
                width={300}
                height={200}
                alt="Quiz Thumbnail"
                className="aspect-[3/2] object-contain py-2 mx-auto"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div className="mb-3">
                  <h3 className="text-lg font-bold">History Quiz</h3>
                  <p className="text-sm text-muted-foreground">
                    Dive into the past and test your historical knowledge.
                  </p>
                </div>
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  // prefetch={false}
                >
                  Play
                </Link>
              </div>
            </div>
            <div className="flex flex-col bg-indigo-950 rounded-lg overflow-hidden">
              <img
                src="/sport.svg"
                width={300}
                height={200}
                alt="Quiz Thumbnail"
                className="aspect-[3/2] object-contain py-2 mx-auto"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div className="mb-3">
                  <h3 className="text-lg font-bold">Sports Quiz</h3>
                  <p className="text-sm text-muted-foreground">
                    Challenge your sports trivia knowledge.
                  </p>
                </div>
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  // prefetch={false}
                >
                  Play
                </Link>
              </div>
            </div>
            <div className="flex flex-col bg-indigo-950 rounded-lg overflow-hidden">
              <img
                src="/geography.svg"
                width={300}
                height={200}
                alt="Quiz Thumbnail"
                className="aspect-[3/2] object-contain py-2 mx-auto"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div className="mb-3">
                  <h3 className="text-lg font-bold">Geography Quiz</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore the world and test your geographic knowledge.
                  </p>
                </div>
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  // prefetch={false}
                >
                  Play
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-muted-foreground px-0 py-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm">
          <div className="grid gap-1">
            <h3 className="font-bold mb-2">Company</h3>
            <Link to="#">About Us</Link>
            <Link to="#">Our Team</Link>
            <Link to="#">Careers</Link>
            <Link to="#">News</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-bold mb-2">Products</h3>
            <Link to="#">Quizzy</Link>
            <Link to="#">Leaderboards</Link>
            <Link to="#">Achievements</Link>
            <Link to="#">Customization</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-bold mb-2">Resources</h3>
            <Link to="#">Blog</Link>
            <Link to="#">Community</Link>
            <Link to="#">Support</Link>
            <Link to="#">FAQs</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-bold mb-2">Legal</h3>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Cookie Policy</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-bold mb-2">Contact</h3>
            <Link to="#">Support</Link>
            <Link to="#">Sales</Link>
            <Link to="#">Press</Link>
            <Link to="#">Partnerships</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
