import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const school = await prisma.school.findFirst({ where: { name: 'School 01 International' }})
  if (!school) return console.log('School not found')

  const class8A = await prisma.class.findFirst({ where: { name: 'Class 8-A', schoolId: school.id }})
  if (!class8A) return console.log('Class not found')

  const mathTeacher = await prisma.teacher.findFirst({ where: { name: 'Teacher 1 (Sch 1)', schoolId: school.id }})
  const englishTeacher = await prisma.teacher.findFirst({ where: { name: 'Teacher 2 (Sch 1)', schoolId: school.id }})

  const mathSubject = await prisma.subject.findFirst({ where: { name: 'Mathematics', schoolId: school.id }})
  const engSubject = await prisma.subject.findFirst({ where: { name: 'English', schoolId: school.id }})

  if (!mathTeacher || !mathSubject || !englishTeacher || !engSubject) {
    return console.log('Teachers or subjects missing')
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const times = [
    { period: '1st Period', start: '08:00 AM', end: '08:45 AM' },
    { period: '2nd Period', start: '08:45 AM', end: '09:30 AM' },
    { period: 'Break', start: '09:30 AM', end: '09:45 AM', isBreak: true },
    { period: '3rd Period', start: '09:45 AM', end: '10:30 AM' },
    { period: '4th Period', start: '10:30 AM', end: '11:15 AM' },
    { period: 'Lunch', start: '11:15 AM', end: '12:00 PM', isBreak: true },
    { period: '5th Period', start: '12:00 PM', end: '12:45 PM' }
  ]

  console.log('Seeding timetable for Class 8-A...')

  // Clean existing
  await prisma.timetableEntry.deleteMany({ where: { classId: class8A.id } })

  for (const day of days) {
    for (const time of times) {
      if (time.isBreak) continue

      const isMath = Math.random() > 0.5
      const teacher = isMath ? mathTeacher : englishTeacher
      const subject = isMath ? mathSubject : engSubject

      await prisma.timetableEntry.create({
        data: {
          schoolId: school.id,
          classId: class8A.id,
          teacherId: teacher.id,
          subjectId: subject.id,
          day: day,
          startTime: time.start,
          endTime: time.end
        }
      })
    }
  }

  console.log('Timetable seeded!')
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
