import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@123'

  const passwordHash = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: Role.ADMIN },
    create: {
      email: adminEmail,
      name: 'Admin',
      passwordHash,
      role: Role.ADMIN,
    },
  })

  // Sample course with module, lesson, resource
  const course = await prisma.course.upsert({
    where: { slug: 'foundations-of-design' },
    update: {},
    create: {
      title: 'Foundations of Design',
      slug: 'foundations-of-design',
      description: 'Learn design fundamentals with practical assignments',
      price: 49900,
      currency: 'INR',
      modules: {
        create: [
          {
            title: 'Introduction',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'What is Design?',
                  order: 1,
                  resources: {
                    create: [
                      {
                        type: 'PDF',
                        fileKey: 'resources/intro/what-is-design.pdf',
                        filename: 'what-is-design.pdf',
                        size: 102400,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      assignments: {
        create: [
          {
            title: 'Design Brief 1',
            description: 'Submit a one-page design brief as PDF',
          },
        ],
      },
    },
    include: { modules: true },
  })

  console.log('Seed completed:', { admin: { email: admin.email }, course: { slug: course.slug } })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
