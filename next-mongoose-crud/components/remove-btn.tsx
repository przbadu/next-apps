'use client'

import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveBtn({ id }: { id: String }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure?')) {
      return;
    }

    await fetch(`http://localhost:3000/api/topics/${id}`, {
      method: 'DELETE',
    })

    router.refresh()
  }
  return (
    <button onClick={handleDelete} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  )
}
