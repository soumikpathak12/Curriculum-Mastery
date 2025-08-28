import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json().catch(() => ({}))
  const { lessonId, type, fileKey, filename, size } = body as {
    lessonId?: string
    type?: 'PDF' | 'DOC' | 'DOCX'
    fileKey?: string
    filename?: string
    size?: number
  }

  if (!lessonId || !type || !fileKey || !filename || typeof size !== 'number') {
    return NextResponse.json({ error: 'lessonId, type, fileKey, filename, size required' }, { status: 400 })
  }

  try {
    const resource = await prisma.resource.create({
      data: { lessonId, type, fileKey, filename, size },
    })
    return NextResponse.json({ resource })
  } catch (e) {
    console.error('POST /api/admin/resources error', e)
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 })
  }
}
