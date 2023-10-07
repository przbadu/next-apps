'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTopic() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Title and description are required')
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description })
      })

      if (res.ok) {
        router.push('/')

      }

      throw new Error('Failed to create a topic')
    }
    catch (e) {
      console.log(e)
    }

    console.log('title', title)
    console.log('desc', description)
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

      <button type="submit" className="bg-green-500 font-bold text-white py-3 px-8 text-center w-fit">
        Add topic
      </button>
    </form>
  );
}
