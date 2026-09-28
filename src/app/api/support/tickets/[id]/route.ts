import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await verifyAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const ticket = await prisma.supportTicket.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        requester: { select: { name: true, role: true } },
        assignedTo: { select: { name: true, role: true } },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            author: { select: { name: true, role: true } }
          }
        },
      }
    });

    if (!ticket) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Tenant isolation
    if (ticket.schoolId !== user.schoolId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Role-based access logic
    if ((user.role === 'PARENT' || user.role === 'STUDENT' || user.role === 'TEACHER') && ticket.requesterId !== user.id) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Filter out internal notes for end users
    if (user.role === 'PARENT' || user.role === 'STUDENT') {
      ticket.messages = ticket.messages.filter(m => !m.isInternalNote);
    }

    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await verifyAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    
    // Simplistic access control for update
    if (user.role === 'PARENT' || user.role === 'STUDENT') {
      // Users can only change status to closed or reopen
      if (!['CLOSED', 'OPEN'].includes(body.status)) {
        return NextResponse.json({ error: 'Unauthorized modification' }, { status: 403 });
      }
    }

    const updatedTicket = await prisma.supportTicket.update({
      where: { id: params.id },
      data: {
        status: body.status,
      }
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
