import Link from "next/link";
import { HiPencilAlt } from 'react-icons/hi'

import RemoveBtn from "./remove-btn";

const getTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topics', { cache: 'no-cache' })

    if (!res.ok) {
      throw new Error(`Failed to fetch topic`)
    }

    return res.json();
  }
  catch (e) {
    console.log(e)
  }
}

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map(topic => (
        <div key={`topic=${topic._id}`} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-bold text-2xl">{topic.title}</h2>
            <div>{topic.description}</div>
          </div>

          <div className="flex gap-2 items-center">
            <RemoveBtn id={topic._id} />
            <Link href={`/topics/${topic._id}/edit`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}
