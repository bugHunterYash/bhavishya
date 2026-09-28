import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await verifyAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const ticket = await prisma.supportTicket.findUnique({
      where: { id: params.id }
    });

    if (!ticket || ticket.schoolId !== user.schoolId) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    if ((user.role === 'PARENT' || user.role === 'STUDENT' || user.role === 'TEACHER') && ticket.requesterId !== user.id) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();

    const message = await prisma.supportTicketMessage.create({
      data: {
        ticketId: ticket.id,
        authorId: user.id,
        body: body.body,
        isInternalNote: body.isInternalNote || false
      }
    });

    // Update ticket status if replied by agent/admin
    if (user.role === 'PRINCIPAL' || user.role === 'SUPER_ADMIN' || user.role === 'SUPPORT') {
      await prisma.supportTicket.update({
        where: { id: ticket.id },
        data: { status: 'WAITING_FOR_USER' }
      });
    }

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
