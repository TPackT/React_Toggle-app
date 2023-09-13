import { createTE, getAllTEs } from '@/serverCalls/timeEntries'
import { revalidatePath } from 'next/cache'
import { generateUrl } from '@/helpers/generate_url'
import { NextResponse } from 'next/server'

export async function GET() {
  return await getAllTEs()
}

export async function POST(request: Request) {
  const json = await request.json()
  const res = await createTE(json)
  if (res.ok) {
    revalidatePath(generateUrl('/time-entries'))
  }

  const data = await res.json()
  return NextResponse.json({ data })
}