import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@remix-run/react"
import axios from "axios"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { emptyQuestion } from "~/constants/question"
import { Answer, Question } from "~/types/payload"

const inputSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer0: z.string().min(1, "Answer A is required"),
  answer1: z.string().min(1, "Answer B is required"),
  answer2: z.string().min(1, "Answer C is required"),
  answer3: z.string().min(1, "Answer D is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
})

const formSchema = z.object({ inputs: z.array(inputSchema) })

export default function Index() {
  const navigate = useNavigate()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputs: [emptyQuestion],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inputs",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const pin = String(Math.random()).split(".")[1].slice(0, 6)
    const { inputs } = values
    const questions: Question[] = []
    const answers: Answer[] = []

    for (let i = 0; i < inputs.length; i++) {
      questions.push({ pin, content: inputs[i].question })
      answers.push({
        content: inputs[i].answer0,
        is_correct: inputs[i].correctAnswer === "0",
      })
      answers.push({
        content: inputs[i].answer1,
        is_correct: inputs[i].correctAnswer === "1",
      })
      answers.push({
        content: inputs[i].answer2,
        is_correct: inputs[i].correctAnswer === "2",
      })
      answers.push({
        content: inputs[i].answer3,
        is_correct: inputs[i].correctAnswer === "3",
      })
    }

    try {
      const response = await axios.post("/launch", {
        pin,
        questions,
        answers,
      })
      console.log("response", response)
    } catch (error) {
      console.log("error")
    }
    navigate(`/live/${btoa(pin)}`, { replace: true })
  }

  console.log("error", errors)

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          {fields.map((_, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex gap-3 mb-3">
                <div className="w-full mb-4">
                  <Input
                    placeholder={`Question number ${idx + 1}`}
                    className={`px-4 h-12 ${
                      errors?.inputs && errors.inputs[idx]?.question
                        ? "border-destructive focus-visible:ring-0 focus-visible:ring-offset-0"
                        : ""
                    }`}
                    {...register(`inputs.${idx}.question`)}
                  />
                  {errors?.inputs && errors.inputs[idx]?.question && (
                    <small className="text-sm font-medium text-destructive">
                      {errors.inputs[idx]?.question?.message}
                    </small>
                  )}
                </div>
                <div>
                  <Controller
                    control={control}
                    name={`inputs.${idx}.correctAnswer`}
                    render={({ field }) => (
                      <>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger
                            className={`w-52 h-12 ${
                              errors?.inputs &&
                              errors.inputs[idx]?.correctAnswer
                                ? "border-destructive focus-visible:ring-0 focus-visible:ring-offset-0"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder="The correct answer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">A (Top left)</SelectItem>
                            <SelectItem value="1">B (Bottom left)</SelectItem>
                            <SelectItem value="2">C (Top right)</SelectItem>
                            <SelectItem value="3">D (Bottom right)</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  />
                  {errors?.inputs && errors.inputs[idx]?.correctAnswer && (
                    <small className="text-sm font-medium text-destructive">
                      {errors.inputs[idx]?.correctAnswer?.message}
                    </small>
                  )}
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="h-12 w-12"
                    size="icon"
                    onClick={() => remove(idx)}
                    type="button"
                  >
                    <img src="/icons/trash.svg" alt="delete-icon" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <div className="mb-2">
                    <Input
                      placeholder="Answer A"
                      className={`px-4 h-12 ${
                        errors?.inputs && errors.inputs[idx]?.answer0
                          ? "border-destructive focus-visible:ring-0 focus-visible:ring-offset-0"
                          : ""
                      }`}
                      {...register(`inputs.${idx}.answer0`)}
                    />
                    {errors?.inputs && errors.inputs[idx]?.answer0 && (
                      <small className="text-sm font-medium text-destructive">
                        {errors.inputs[idx]?.answer0?.message}
                      </small>
                    )}
                  </div>
                  <Input
                    placeholder="Answer B"
                    className={`px-4 h-12 ${
                      errors?.inputs && errors.inputs[idx]?.answer1
                        ? "border-destructive focus-visible:ring-0 focus-visible:ring-offset-0"
                        : ""
                    }`}
                    {...register(`inputs.${idx}.answer1`)}
                  />
                  {errors?.inputs && errors.inputs[idx]?.answer1 && (
                    <small className="text-sm font-medium text-destructive">
                      {errors.inputs[idx]?.answer1?.message}
                    </small>
                  )}
                </div>
                <div className="w-1/2">
                  <div className="mb-2">
                    <Input
                      placeholder="Answer C"
                      className={`px-4 h-12 ${
                        errors?.inputs && errors.inputs[idx]?.answer2
                          ? "border-destructive focus-visible:ring-0 focus-visible:ring-offset-0"
                          : ""
                      }`}
                      {...register(`inputs.${idx}.answer2`)}
                    />
                    {errors?.inputs && errors.inputs[idx]?.answer2 && (
                      <small className="text-sm font-medium text-destructive">
                        {errors.inputs[idx]?.answer2?.message}
                      </small>
                    )}
                  </div>
                  <Input
                    placeholder="Answer D"
                    className={`px-4 h-12 ${
                      errors?.inputs && errors.inputs[idx]?.answer3
                        ? "border-destructive focus-visible:ring-0 focus-visible:ring-offset-0"
                        : ""
                    }`}
                    {...register(`inputs.${idx}.answer3`)}
                  />
                  {errors?.inputs && errors.inputs[idx]?.answer3 && (
                    <small className="text-sm font-medium text-destructive">
                      {errors.inputs[idx]?.answer3?.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <div className="flex gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => append(emptyQuestion)}
            >
              Add more question
            </Button>
            <Button type="submit">Launch 🚀</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
