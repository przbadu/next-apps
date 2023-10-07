import EditTopicForm from "@/components/edit-topic-form";

type ParamsType = {
  params: {
    id: String
  }
}

const getTopicById = async (id: String) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: 'no-cache'
    })

    if (!res.ok) {
      new Error('Unable to fetch topic')
    }

    return res.json()
  } catch (e) {
    console.log('error', e)
  }
}

export default async function EditTopic({ params }: ParamsType) {
  const { id } = params;
  const { topic } = await getTopicById(id)

  return <EditTopicForm topic={topic} />
}
