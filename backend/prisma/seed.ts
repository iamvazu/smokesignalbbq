import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

async function main() {
    const adminPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@smokesignal.com' },
        update: {},
        create: {
            email: 'admin@smokesignal.com',
            name: 'Super Admin',
            passwordHash: adminPassword,
            role: 'admin'
        }
    });

    console.log('Seeding finished:', admin.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
