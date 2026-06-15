import { PrismaClient, NodeType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'demo@mindai.dev' },
    update: {},
    create: { name: 'Demo User', email: 'demo@mindai.dev', password },
  });

  const map = await prisma.mindMap.create({
    data: {
      title: 'Full Stack Developer Roadmap',
      description: 'Sample roadmap for exploring StudyFlow.',
      userId: user.id,
    },
  });

  const root = await prisma.mindMapNode.create({
    data: {
      mindMapId: map.id,
      label: 'Full Stack Developer',
      description: 'A practical path from fundamentals to deployment.',
      type: NodeType.TOPIC,
      color: '#6366f1',
      xPosition: 160,
      yPosition: 160,
    },
  });

  await prisma.mindMapNode.createMany({
    data: [
      {
        mindMapId: map.id,
        parentId: root.id,
        label: 'React',
        description: 'Build interactive frontend applications.',
        type: NodeType.SUBTOPIC,
        color: '#10b981',
        xPosition: 440,
        yPosition: 80,
      },
      {
        mindMapId: map.id,
        parentId: root.id,
        label: 'NestJS',
        description: 'Create structured backend APIs.',
        type: NodeType.SUBTOPIC,
        color: '#06b6d4',
        xPosition: 440,
        yPosition: 260,
      },
    ],
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
