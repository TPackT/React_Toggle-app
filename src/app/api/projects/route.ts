import { createProject, getAllProjects, updateProject } from '@/serverCalls/projects'
import { revalidatePath } from 'next/cache'
import { generateUrl } from '@/helpers/generate_url'
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await getAllProjects()

  const data = await res.json()
  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const json = await request.json()
  const res = await createProject(json)
  if (res.ok) {
    revalidatePath(generateUrl('/projects'))
  }

  const data = await res.json()
  return NextResponse.json({ data })
}

export async function PUT(request: Request) {
  const json = await request.json()
  const res = await updateProject(json)
  if (res.ok) {
    revalidatePath(generateUrl('/projects'))
  }

  const data = await res.json()
  return NextResponse.json({ data })
}
