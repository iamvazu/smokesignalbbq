import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const sauces = [
        {
            name: 'BBQ Texas Sauce',
            description: 'The heart of the Lone Star State in a bottle. Deep, savory, and perfectly smoky.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            weight: 250,
            image: '/Texas_Sauce.jpg'
        },
        {
            name: 'BBQ Spicy Mango Sauce',
            description: 'Tropical sweetness meets high-country heat. Real sun-ripened mangoes with habanero.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            weight: 250,
            image: 'https://images.unsplash.com/photo-1478144592103-258219070793?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Smokey Pepper Garlic Sauce',
            description: 'A robust powerhouse infused with double-roasted garlic and freshly cracked black pepper.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            weight: 250,
            image: 'https://images.unsplash.com/photo-1631402242084-3c66289f81da?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Peri Peri Sauce',
            description: 'Zesty, citrusy, and undeniably hot. Our take on the classic African bird\'s eye chili.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            weight: 250,
            image: 'https://images.unsplash.com/photo-1598511796318-7b82ea7bc88c?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'BBQ Hot Sauce',
            description: 'The Pitmaster\'s choice for heat seekers. A concentrated explosion of fire and flavor.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            weight: 250,
            image: '/brisket_sauce.jpg'
        }
    ];

    console.log('--- Adding Sauces ---');

    for (const sauce of sauces) {
        // Find if already exists
        const existing = await prisma.product.findFirst({
            where: { name: sauce.name }
        });

        if (existing) {
            console.log(`Updating ${sauce.name}...`);
            await prisma.product.update({
                where: { id: existing.id },
                data: {
                    description: sauce.description,
                    price: sauce.price,
                    weight: sauce.weight,
                    category: sauce.category,
                    subCategory: sauce.subCategory,
                    images: {
                        deleteMany: {},
                        create: [{ imageUrl: sauce.image }]
                    }
                }
            });
        } else {
            console.log(`Creating ${sauce.name}...`);
            await prisma.product.create({
                data: {
                    name: sauce.name,
                    description: sauce.description,
                    category: sauce.category,
                    subCategory: sauce.subCategory,
                    price: sauce.price,
                    weight: sauce.weight,
                    stock: 100,
                    status: 'active',
                    images: {
                        create: [{ imageUrl: sauce.image }]
                    }
                }
            });
        }
    }

    console.log('--- Sauces Added ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
