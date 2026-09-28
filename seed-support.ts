import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSupport() {
  console.log('Seeding support categories...');
  
  const categories = [
    { name: 'Attendance', description: 'Issues related to student attendance' },
    { name: 'Fees & Payments', description: 'Issues with fee payments and receipts' },
    { name: 'Academics', description: 'Academic inquiries and issues' },
    { name: 'Timetable', description: 'Timetable and schedule issues' },
    { name: 'Transport', description: 'Bus and tracking related issues' },
    { name: 'RFID / Smart ID', description: 'Issues with ID cards and entry/exit' },
    { name: 'Cafeteria', description: 'Cafeteria transactions and menu' },
    { name: 'Login & Account', description: 'Authentication and profile issues' },
    { name: 'Other', description: 'Other general issues' }
  ];

  for (const cat of categories) {
    await prisma.supportCategory.upsert({
      where: { id: cat.name.replace(/\s+/g, '-').toLowerCase() },
      update: {},
      create: {
        id: cat.name.replace(/\s+/g, '-').toLowerCase(),
        name: cat.name,
        description: cat.description
      }
    });
  }

  // Find a school and parent to create demo tickets
  const school = await prisma.school.findFirst();
  if (!school) return;
  
  const parent = await prisma.user.findFirst({ where: { role: 'PARENT', schoolId: school.id } });
  if (!parent) return;

  const student = await prisma.student.findFirst({ where: { schoolId: school.id } });

  console.log('Creating demo tickets...');
  const catAttendance = await prisma.supportCategory.findFirst({ where: { name: 'Attendance' } });
  const catFees = await prisma.supportCategory.findFirst({ where: { name: 'Fees & Payments' } });
  const catTransport = await prisma.supportCategory.findFirst({ where: { name: 'Transport' } });

  if (catAttendance) {
    await prisma.supportTicket.create({
      data: {
        ticketNumber: 'BH-2026-000181',
        schoolId: school.id,
        requesterId: parent.id,
        studentId: student?.id,
        categoryId: catAttendance.id,
        subject: 'Attendance marked absent incorrectly',
        description: "My child entered school at 8:18 AM but today's attendance is showing absent.",
        priority: 'NORMAL',
        status: 'RESOLVED',
        resolutionSummary: 'Attendance changed from Absent to Present.',
      }
    });
  }

  if (catFees) {
    await prisma.supportTicket.create({
      data: {
        ticketNumber: 'BH-2026-000182',
        schoolId: school.id,
        requesterId: parent.id,
        studentId: student?.id,
        categoryId: catFees.id,
        subject: 'Fee payment still showing pending',
        description: 'I paid the term fee yesterday but it still shows as pending in the app.',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
      }
    });
  }

  if (catTransport) {
    await prisma.supportTicket.create({
      data: {
        ticketNumber: 'BH-2026-000184',
        schoolId: school.id,
        requesterId: parent.id,
        studentId: student?.id,
        categoryId: catTransport.id,
        subject: 'School bus is not appearing',
        description: 'I cannot see the bus tracking on the map today.',
        priority: 'NORMAL',
        status: 'OPEN',
      }
    });
  }

  console.log('Support seeding completed.');
}

seedSupport()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
