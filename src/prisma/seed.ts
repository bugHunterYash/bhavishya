const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.auditLog.deleteMany()
  await prisma.communityPost.deleteMany()
  await prisma.communityMember.deleteMany()
  await prisma.community.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.cafeteriaTransaction.deleteMany()
  await prisma.busEvent.deleteMany()
  await prisma.bus.deleteMany()
  await prisma.route.deleteMany()
  await prisma.schoolEvent.deleteMany()
  await prisma.idCard.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.feeInvoice.deleteMany()
  await prisma.mark.deleteMany()
  await prisma.exam.deleteMany()
  await prisma.lessonLog.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.timetableEntry.deleteMany()
  await prisma.teacherAssignment.deleteMany()
  await prisma.subject.deleteMany()
  await prisma.class.deleteMany()
  await prisma.teacher.deleteMany()
  await prisma.parentStudent.deleteMany()
  await prisma.parent.deleteMany()
  await prisma.student.deleteMany()
  await prisma.user.deleteMany()
  await prisma.school.deleteMany()

  // Generate SUPER_ADMIN
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@bhavishya.demo',
      passwordHash: 'hashed_password_for_demo',
      role: 'SUPER_ADMIN'
    }
  })

  // We will generate 10 schools
  for (let s = 1; s <= 10; s++) {
    const school = await prisma.school.create({
      data: {
        name: `School ${s.toString().padStart(2, '0')} International`,
        code: `SCH${s.toString().padStart(2, '0')}`,
        address: `${s} Education Lane, Demo City`
      }
    })

    // Create Principal
    const principalUser = await prisma.user.create({
      data: {
        email: `principal.school${s.toString().padStart(2, '0')}@bhavishya.demo`,
        passwordHash: 'hashed_password_for_demo',
        role: 'PRINCIPAL',
        schoolId: school.id
      }
    })

    // Create Classes
    const classA = await prisma.class.create({
      data: {
        schoolId: school.id,
        name: 'Class 8-A',
        grade: '8',
        section: 'A',
        academicYear: '2026-2027'
      }
    })

    const classB = await prisma.class.create({
      data: {
        schoolId: school.id,
        name: 'Class 9-A',
        grade: '9',
        section: 'A',
        academicYear: '2026-2027'
      }
    })

    // Create Subjects
    const subjects = []
    const subjectNames = ['Mathematics', 'Science', 'English', 'History']
    for (const subName of subjectNames) {
      subjects.push(await prisma.subject.create({
        data: {
          schoolId: school.id,
          name: subName,
          code: `${subName.substring(0, 3).toUpperCase()}-101`
        }
      }))
    }

    // Create Teachers (2-3 per school)
    for (let t = 1; t <= 3; t++) {
      const teacherUser = await prisma.user.create({
        data: {
          email: `teacher${t}.school${s.toString().padStart(2, '0')}@bhavishya.demo`,
          passwordHash: 'hashed_password_for_demo',
          role: 'TEACHER',
          schoolId: school.id
        }
      })

      const teacher = await prisma.teacher.create({
        data: {
          schoolId: school.id,
          userId: teacherUser.id,
          employeeCode: `EMP${s}${t}`,
          name: `Teacher ${t} (Sch ${s})`
        }
      })

      // Assign teacher to subjects and classes
      await prisma.teacherAssignment.create({
        data: {
          teacherId: teacher.id,
          classId: t === 1 ? classA.id : classB.id,
          subjectId: subjects[t % subjects.length].id
        }
      })
    }

    // Create Students (10 per school)
    for (let st = 1; st <= 10; st++) {
      const studentClass = st <= 5 ? classA : classB

      const studentUser = await prisma.user.create({
        data: {
          email: `student${st}.school${s.toString().padStart(2, '0')}@bhavishya.demo`,
          passwordHash: 'hashed_password_for_demo',
          role: 'STUDENT',
          schoolId: school.id
        }
      })

      const student = await prisma.student.create({
        data: {
          schoolId: school.id,
          admissionNo: `ADM${s}${st}`,
          userId: studentUser.id,
          classId: studentClass.id,
          name: `Student ${st} (Sch ${s})`,
          dob: new Date('2013-05-10')
        }
      })

      // Parent
      const parentUser = await prisma.user.create({
        data: {
          email: `parent${st}.school${s.toString().padStart(2, '0')}@bhavishya.demo`,
          passwordHash: 'hashed_password_for_demo',
          role: 'PARENT',
          schoolId: school.id
        }
      })

      const parent = await prisma.parent.create({
        data: {
          schoolId: school.id,
          userId: parentUser.id,
          name: `Parent of Student ${st}`,
          contact: `+9198765432${st.toString().padStart(2, '0')}`
        }
      })

      await prisma.parentStudent.create({
        data: {
          parentId: parent.id,
          studentId: student.id,
          relationship: 'FATHER'
        }
      })

      // Add dummy attendance for today
      await prisma.attendance.create({
        data: {
          schoolId: school.id,
          studentId: student.id,
          date: new Date(),
          status: 'PRESENT',
          source: 'SYSTEM'
        }
      })

      // Add some cafeteria trans
      await prisma.cafeteriaTransaction.create({
        data: {
          schoolId: school.id,
          studentId: student.id,
          item: 'Vegetable Sandwich',
          amount: 60,
        }
      })

      // Add Fee invoice
      await prisma.feeInvoice.create({
        data: {
          schoolId: school.id,
          studentId: student.id,
          amount: 15000,
          dueDate: new Date(),
          status: 'PENDING'
        }
      })
    }
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
