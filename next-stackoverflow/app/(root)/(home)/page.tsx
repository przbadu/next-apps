import Link from "next/link"
import { Button } from "@/components/ui/button"
import LocalSearch from "@/components/shared/search/LocalSearch"
import { HomePageFilters } from "@/constants/filters"
import Filter from "@/components/Filter"
import RenderTag from "@/components/shared/RenderTag"
import HomeFilter from "@/components/home/HomeFilter"

export default function Home() {
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

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
        <HomeFilter />
      </div>
    </>
  )
}
