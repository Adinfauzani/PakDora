import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const courseId = formData.get('courseId') as string
    const week = formData.get('week') as string
    const type = formData.get('type') as string

    if (!file || !courseId || !week || !type) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const ext = path.extname(file.name)
    const fileName = type === 'pdf' ? `minggu${week}-slides.pdf` : `minggu${week}-presentasi${ext}`
    const dir = path.join(process.cwd(), 'public', 'static', 'materi', courseId, 'tugas')
    await mkdir(dir, { recursive: true })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(path.join(dir, '..', fileName), buffer)

    return NextResponse.json({ success: true, fileName })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
