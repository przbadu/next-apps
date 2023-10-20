import Link from "next/link"
import { Button } from "@/components/ui/button"
import LocalSearch from "@/components/shared/search/LocalSearch"
import RenderTag from "@/components/shared/RenderTag"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Home() {
  const filters = [
    { _id: 1, name: 'Newest' },
    { _id: 2, name: 'Recommended' },
    { _id: 3, name: 'Frequent' },
    { _id: 4, name: 'Unanswered' },
  ]

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link
          href='/ask-question'
          className='flex justify-end max-sm:w-full'
        >
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 flex-col sm:flex-row md:items-center md:flex-col">
        <LocalSearch
          route="/"
          iconPosition="LEFT"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses='w-full'
        />

        <div className="hidden md:flex flex-row gap-4 flex-1 w-full">
          {filters.map((filter) => (
            <RenderTag key={filter._id} _id={filter._id} name={filter.name} />
          ))}
        </div>

        <div className="w-full md:hidden">
          <Select>
            <SelectTrigger className="w-full sm:w-[130px] min-h-[56px] background-light800_darkgradient">
              <SelectValue placeholder="Select a Filter" />
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter) => (
                <SelectItem key={filter._id} value={filter._id.toString()}>
                  {filter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  )
}
