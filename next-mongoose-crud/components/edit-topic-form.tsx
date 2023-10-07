'use client';

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function EditTopicForm({ topic }) {
  const [title, setTitle] = useState(topic.title)
  const [description, setDescription] = useState(topic.description)
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${topic._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })

      if (!res.ok) {
        throw new Error('Unable to update value')
      }

      router.push('/')
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <button className="bg-green-500 font-bold text-white py-3 px-8 text-center w-fit">Update topic</button>
    </form>
  )
}
