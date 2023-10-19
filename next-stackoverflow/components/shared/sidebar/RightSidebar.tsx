import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import RenderTag from '../RenderTag';

const RightSidebar = () => {
  const hotQuestions = [
    { _id: 1, title: 'How to use React Query with Next.js?' },
    { _id: 2, title: 'Cascading Deletes in SQLAlchemy?' },
    { _id: 3, title: 'How do I use express as a custom server in NextJS?' },
    { _id: 4, title: 'Redux Toolkit Not updating state as expected' },
  ];

  const popularTags = [
    { _id: 1, name: 'React', totalQuestions: 100 },
    { _id: 2, name: 'Next.js', totalQuestions: 5 },
    { _id: 3, name: 'TypeScript', totalQuestions: 30 },
    { _id: 4, name: 'JavaScript', totalQuestions: 20 },
    { _id: 5, name: 'Ruby', totalQuestions: 80 },
  ]

  return (
    <section className='max-xl:hidden lg:visible background-light900_dark200 light-border sticky right-0 top-0 flex flex-col h-screen overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[350px] custom-scrollbar'>
      <div>
        <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {hotQuestions.map(question => {
            return (
              <Link
                href={`/questions/${question._id}`}
                key={question._id}
                className='flex cursor-pointer items-center justify-between gap-7'
              >
                <p className='body-medium text-dark500_light700'>{question.title}</p>
                <Image
                  src='/assets/icons/chevron-right.svg'
                  alt='arrow-right'
                  width={20}
                  height={20}
                  className='invert-colors'
                />
              </Link>
            )
          })}
        </div>
      </div>

      <div className='mt-16'>
        <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
        <div className='mt-7 flex flex-col gap-4'>
          {popularTags.map(tag => {
            return <RenderTag
              key={tag._id}
              name={tag.name}
              _id={tag._id}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          })}
        </div>
      </div>
    </section>
  )
}

export default RightSidebar
