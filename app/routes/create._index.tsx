import { Link } from "@remix-run/react"
import { LayoutTemplateIcon, PlayIcon, ReplaceIcon } from "lucide-react"

export default function Index() {
  return (
    <div>
      <section className="w-full py-12 md:py-20">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 mb-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Create Your Own Quiz
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Become a quiz master and create your own engaging quizzes for
                your audience.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center space-y-2 bg-indigo-950 rounded-lg p-6">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground">
                  <LayoutTemplateIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Quiz Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from a variety of pre-designed quiz templates to get
                  started.
                </p>
                <Link
                  to="/#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Browse Templates
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 bg-indigo-950 rounded-lg p-6">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground">
                  <PlayIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Create from Scratch</h3>
                <p className="text-sm text-muted-foreground">
                  Build your own custom quiz from the ground up.
                </p>
                <Link
                  to="/create/quizz"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Create Quiz
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 bg-indigo-950 rounded-lg p-6">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground">
                  <ReplaceIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Customize Existing</h3>
                <p className="text-sm text-muted-foreground">
                  Modify and personalize pre-made quizzes to fit your needs.
                </p>
                <Link
                  to="/#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Customize Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
