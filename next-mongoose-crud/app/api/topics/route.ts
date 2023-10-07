import connectMongoDb from "@/libs/mongodb"
import Topic from "@/models/topic"
import { NextRequest, NextResponse } from "next/server"

// POST /api/topics
export async function POST(request: NextRequest) {
  const { title, description } = await request.json()
  await connectMongoDb()
  await Topic.create({ title, description })
  return NextResponse.json({ message: 'Topic created successfully!' }, { status: 201 })
}

// GET /api/topics
export async function GET() {
  await connectMongoDb()
  const topics = await Topic.find()
  return NextResponse.json({ topics }, { status: 200 })
}

