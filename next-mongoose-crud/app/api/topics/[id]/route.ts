import connectMongoDb from "@/libs/mongodb"
import Topic from "@/models/topic"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

type ParamsType = {
  id: String
}


// GET /api/topics/:id
export async function GET(_request: NextApiRequest, { params }: { params: ParamsType }) {
  const { id } = params
  await connectMongoDb()
  const topic = await Topic.findOne({ _id: id })

  return NextResponse.json({ topic }, { status: 200 })
}

// PUT /api/topics/:id
export async function PUT(request: NextRequest, { params }: { params: ParamsType }) {
  const { id } = params
  const { title, description } = await request.json()
  await connectMongoDb()
  await Topic.findByIdAndUpdate(id, { title, description })

  return NextResponse.json({ message: 'Updated' }, { status: 200 })
}

// DELETE /api/topics/:id
export async function DELETE(_request: NextApiRequest, { params }: { params: ParamsType }) {
  const { id } = params
  await connectMongoDb()
  await Topic.findByIdAndDelete(id)

  return NextResponse.json({ message: 'Topic deleted' }, { status: 200 })
}
