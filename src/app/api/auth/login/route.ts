import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createSession } from '@/lib/session'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // For demo purposes, just finding by email since it's a seed dataset
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await createSession({
      userId: user.id,
      email: user.email!,
      role: user.role,
      schoolId: user.schoolId,
    })

    return NextResponse.json({ success: true, role: user.role })
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
