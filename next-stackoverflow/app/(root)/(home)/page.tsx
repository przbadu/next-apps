import Link from "next/link";

import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { HomePageFilters } from "@/constants/filters";
import Filter from "@/components/Filter";
import HomeFilter from "@/components/home/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";

export default function Home() {
  const questions = [
    {
      _id: 1,
      title:
        "The Lightning Component c:LWC_PizzaTracker generated invalid out put for field status. Error How to solve this",
      tags: [
        { _id: 1, name: "react.js" },
        { _id: 2, name: "javascript" },
        { _id: 3, name: "invalid fields" },
        { _id: 4, name: "salesforce" },
      ],
      answers: 900,
      votes: 1200,
      views: 5234,
      author: {
        _id: "1",
        name: "John Doe",
        picture: "/assets/icons/avatar.svg",
      },
      createdAt: new Date("2023-09-01T12:00:00.000Z"),
    },
    {
      _id: 2,
      title: "How to use React Query?",
      tags: [
        { _id: 1, name: "react.js" },
        { _id: 2, name: "javascript" },
      ],
      answers: 1300,
      votes: 10000,
      views: 503452,
      author: {
        _id: "2",
        name: "Jane Doe",
        picture: "/assets/icons/avatar.svg",
      },
      createdAt: new Date("2024-04-01T12:00:00.000Z"),
    },
  ];

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex flex-col justify-between gap-5 sm:flex-row md:flex-col md:items-center">
        <LocalSearch
          route="/"
          iconPosition="LEFT"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="w-full"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
        <HomeFilter />

        <div className="mt-10 flex w-full flex-col gap-6">
          {questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                answers={question.answers}
                votes={question.votes}
                views={question.views}
                author={question.author}
                createdAt={question.createdAt}
              />
            ))
          ) : (
            <NoResult
              title="There's no question to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the next big thing others learn from. Get involved! 💡"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          )}
        </div>
      </div>
    </>
  );
}
