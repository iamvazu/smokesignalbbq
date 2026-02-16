import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';


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

    console.log('Seeding admin user...');

    const products = [
        // SAUCES
        {
            name: 'Smokey Texas Sauce',
            description: 'The heart of the Lone Star State in a bottle. Deep, savory, and perfectly smoky.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            weight: 250,
            image: '/smokeytexas_saucebottle.png'
        },
        {
            name: 'Texas Style Saucy Wings',
            description: 'The ultimate wing glaze. Bold, tangy, and perfect for wings.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            weight: 250,
            image: '/saucywings_saucebottle.png'
        },
        {
            name: 'Pork Ribs Sauce',
            description: 'Engineered specifically for low & slow pork. The perfect companion for ribs.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            weight: 250,
            image: '/porkribs_saucebottle.png'
        },
        {
            name: 'The Brisket Sauce',
            description: 'Designed for the King of BBQ. Savory, peppery, and bold.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            weight: 250,
            image: '/brisket_saucebottle.png'
        },
        // WINGS
        {
            name: 'Texas Style Saucy Wings',
            description: 'Classic pitmaster style wings with a rich Texas glaze (8pcs).',
            category: 'bbq',
            subCategory: 'wings',
            price: 180,
            weight: 0,
            image: '/Saucy_Wings.jpg'
        },
        {
            name: 'BBQ Spicy Wings',
            description: 'Slow smoked wings with a fiery kick (8pcs).',
            category: 'bbq',
            subCategory: 'wings',
            price: 180,
            weight: 0,
            image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Peri Peri Wings',
            description: 'Zesty and spicy wings with a citrus punch (8pcs).',
            category: 'bbq',
            subCategory: 'wings',
            price: 180,
            weight: 0,
            image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=800&q=80'
        },
        // CHICKEN
        {
            name: 'Pepper Garlic Chicken Steak',
            description: 'Tender chicken steak infused with bold pepper and garlic.',
            category: 'bbq',
            subCategory: 'chicken',
            price: 250,
            weight: 200,
            image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Texas Chicken Steak',
            description: 'Classic Texas style smoked chicken steak.',
            category: 'bbq',
            subCategory: 'chicken',
            price: 250,
            weight: 200,
            image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80'
        },
        // BEEF
        {
            name: 'Beef Brisket',
            description: '12-hour slow smoked signature Texas brisket.',
            category: 'bbq',
            subCategory: 'beef',
            price: 360,
            weight: 200,
            image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Beef Pepper Garlic Steak',
            description: 'Savory beef steak with a robust pepper-garlic crust.',
            category: 'bbq',
            subCategory: 'beef',
            price: 360,
            weight: 200,
            image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Texas Beef Steak',
            description: 'Hardcore Texas flavor. Smoked and bold.',
            category: 'bbq',
            subCategory: 'beef',
            price: 360,
            weight: 200,
            image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80'
        },
        // PORK
        {
            name: 'Texas Smoked Pork Ribs',
            description: 'Fall-off-the-bone ribs with a sticky BBQ glaze.',
            category: 'bbq',
            subCategory: 'pork',
            price: 350,
            weight: 200,
            image: '/Pork_Ribs.jpg'
        },
        {
            name: 'Texas Smoked Pork Belly',
            description: 'Rich, juicy, and smoky pork belly slices.',
            category: 'bbq',
            subCategory: 'pork',
            price: 350,
            weight: 200,
            image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Smokey Spicy Pork',
            description: 'Infused with smoke and fire. A spicy pork delight.',
            category: 'bbq',
            subCategory: 'pork',
            price: 350,
            weight: 200,
            image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80'
        }
    ];

    const combos = [
        {
            name: 'Lone Star Solo',
            description: 'Beef Brisket (200g) + 1 Signature Sauce (250ml)',
            price: 549,
            originalPrice: 580,
            image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
            isMostPopular: true
        },
        {
            name: 'Peri Peri Punch',
            description: 'Peri Peri Wings (8pcs) + 1 Signature Sauce (250ml)',
            price: 379,
            originalPrice: 400,
            image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
            isMostPopular: false
        },
        {
            name: 'Garlic Glaze Chicken',
            description: 'Pepper Garlic Chicken Steak (200g) + 1 Signature Sauce (250ml)',
            price: 449,
            originalPrice: 470,
            image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
            isMostPopular: false
        },
        {
            name: 'Pitmaster Vanguard',
            description: 'Beef Brisket (200g) + Pork Ribs (200g) + 2 Signature Sauces',
            price: 1099,
            originalPrice: 1150,
            image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9460272?auto=format&fit=crop&w=800&q=80',
            isBestValue: true
        },
        {
            name: 'Texas Smoked Duo',
            description: 'Pork Belly (200g) + Texas Chicken Steak (200g) + 2 Signature Sauces',
            price: 999,
            originalPrice: 1040,
            image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
            isBestValue: true
        },
        {
            name: 'Double Heatseeker',
            description: 'Spicy Wings (8pcs) + Spicy Pork (200g) + 2 Signature Sauces',
            price: 929,
            originalPrice: 970,
            image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80',
            isBestValue: false
        }
    ];

    console.log('Clearing existing combos...');
    await prisma.comboItem.deleteMany({});
    await prisma.comboPack.deleteMany({});

    console.log('Seeding combos...');
    for (const c of combos) {
        await prisma.comboPack.create({
            data: {
                id: crypto.randomUUID(),
                name: c.name,
                description: c.description,
                price: c.price,
                originalPrice: c.originalPrice,
                image: c.image,
                isMostPopular: c.isMostPopular || false,
                isBestValue: c.isBestValue || false,
                status: 'active'
            }
        });
    }

    console.log('Seeding products...');
    for (const p of products) {
        await prisma.product.upsert({
            where: { sku: p.name.toLowerCase().replace(/ /g, '-') },
            update: {
                description: p.description,
                price: p.price,
                weight: p.weight,
                category: p.category,
                subCategory: p.subCategory,
            },
            create: {
                id: crypto.randomUUID(),
                name: p.name,
                sku: p.name.toLowerCase().replace(/ /g, '-'),
                description: p.description,
                category: p.category || 'bbq',
                subCategory: p.subCategory || 'all',
                price: p.price,
                weight: p.weight,
                stock: 100,
                status: 'active',
                images: {
                    create: [{ imageUrl: p.image }]
                }
            }
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
