// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
enum linkedPrecedence {
    primary = "PRIMARY",
    secondary = "SECONDARY"
}
const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`);

    await prisma.contact.deleteMany({});

    const primaryContact = await prisma.contact.create({
        data: {
            email: "lorraine@hillvalley.edu",
            phoneNumber: "1234567890",
            linkPrecedence: linkedPrecedence.primary,
        },
    });
   await prisma.contact.create({
        data: {
            email: "lorraine@hillvalley.edu",
            phoneNumber: "0987654321",
            linkedId: primaryContact.id,
            linkPrecedence: linkedPrecedence.secondary,
        },
    });


    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
