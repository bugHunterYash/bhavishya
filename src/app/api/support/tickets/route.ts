import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = await verifyAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const role = user.role;
    let whereClause: any = { schoolId: user.schoolId };

    if (role === 'PARENT' || role === 'STUDENT' || role === 'TEACHER') {
      whereClause.requesterId = user.id;
    }

    const tickets = await prisma.supportTicket.findMany({
      where: whereClause,
      include: {
        category: true,
        requester: { select: { name: true, role: true } },
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    
    // Generate a unique ticket number
    const count = await prisma.supportTicket.count();
    const ticketNumber = `BH-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;

    const ticket = await prisma.supportTicket.create({
      data: {
        ticketNumber,
        schoolId: user.schoolId,
        requesterId: user.id,
        categoryId: body.categoryId,
        studentId: body.studentId || null,
        subject: body.subject,
        description: body.description,
        priority: body.priority || 'NORMAL',
        status: 'OPEN',
      }
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}