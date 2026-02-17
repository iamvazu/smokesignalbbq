import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Database Cleanup ---');
    try {
        await prisma.orderItem.deleteMany({});
        await prisma.inventoryLog.deleteMany({});
        await prisma.productImage.deleteMany({});
        await prisma.comboItem.deleteMany({});
        await prisma.comboPack.deleteMany({});
        await prisma.product.deleteMany({});
    } catch (e) {
        console.log('Cleanup step skipped (tables might be empty or missing)');
    }

    console.log('--- Seeding Admin ---');
    const adminPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@smokesignal.com' },
        update: { passwordHash: adminPassword },
        create: {
            email: 'admin@smokesignal.com',
            name: 'Super Admin',
            passwordHash: adminPassword,
            role: 'admin'
        }
    });

    const products = [
        // SAUCES
        {
            name: 'Smokey Texas Sauce',
            description: 'Classic pitmaster style. Smokey, rich, authentic.',
            longDescription: 'The heart of the Lone Star State in a bottle. Deep, savory, and perfectly smoky with a rich tomato base and a secret blend of spices that have been a Texas legend for generations.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            volume: '250ml',
            image: '/smokeytexas_saucebottle.png',
            badges: ['Pitmaster Crafted', 'Best Seller'],
            ingredients: 'Tomato paste, molasses, apple cider vinegar, hickory smoke, secret spice blend.',
            storageInstructions: 'Refrigerate after opening. Shake well before use.'
        },
        {
            name: 'Texas Style Wing Sauce',
            description: 'Bold, tangy, and perfect for wings.',
            longDescription: 'The ultimate wing glaze. Designed specifically for our signature wings, this sauce balances heat, tang, and sweetness for that authentic Texas-style kick.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            volume: '250ml',
            image: '/saucywings_saucebottle.png',
            badges: ['Pitmaster Crafted', 'Wing King'],
            ingredients: 'Hot sauce base, honey, vinegar, secret spices, butter flavor.',
            storageInstructions: 'Refrigerate after opening.'
        },
        {
            name: 'Pork Ribs Sauce',
            description: 'The perfect companion for ribs.',
            longDescription: 'Engineered specifically for low & slow pork. This sauce penetrates deep into the meat, adding a layer of sweet-smokey complexity that makes ribs truly unforgettable.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            volume: '250ml',
            image: '/porkribs_saucebottle.png',
            badges: ['Pitmaster Crafted', 'Rib Master'],
            ingredients: 'Tomato concentrate, brown sugar, apple juice, cider vinegar, pork-friendly spice blend.',
            storageInstructions: 'Refrigerate after opening.'
        },
        {
            name: 'The Brisket Sauce',
            description: 'Designed for the King of BBQ.',
            longDescription: 'A sophisticated, less-sweet sauce designed to complement the rich, fatty goodness of slow-smoked beef brisket. Peppery, savory, and bold.',
            category: 'sauce',
            subCategory: 'sauces',
            price: 220,
            volume: '250ml',
            image: '/brisket_saucebottle.png',
            badges: ['Pitmaster Crafted', 'Beef Specialist'],
            ingredients: 'Beef stock, black pepper, garlic, onion, Worcestershire, minimal sugar.',
            storageInstructions: 'Refrigerate after opening.'
        },
        // WINGS
        {
            name: 'Texas Style Saucy Wings',
            description: 'Classic pitmaster style wings with a rich Texas glaze (8pcs).',
            longDescription: 'Our Texas Style Saucy Wings are slow-smoked over premium charcoal for hours, then tossed in a bold, savory BBQ glaze that captures the heart of Texas BBQ.',
            category: 'bbq',
            subCategory: 'wings',
            price: 180,
            weight: '8pcs',
            image: '/texasstylesaucywings.png',
            badges: ['Slow Smoked', 'Ready to Heat & Serve', 'Best Seller'],
            heatingInstructions: 'Microwave for 2 mins or oven bake at 180°C for 5 mins until sizzling.',
            ingredients: 'Chicken wings, signature Texas BBQ glaze, garlic, onion, charcoal smoke.',
            storageInstructions: 'Store in refrigerator at 0-4°C. Good for 5 days.',
            isMostPopular: true
        },
        {
            name: 'BBQ Spicy Wings',
            description: 'Slow smoked wings with a fiery kick (8pcs).',
            longDescription: 'For those who crave heat, these wings are marinated in a spicy BBQ blend and smoked to perfection. Every bite delivers a punch of flavor and fire.',
            category: 'bbq',
            subCategory: 'wings',
            price: 180,
            weight: '8pcs',
            image: '/bbqspicywings.png',
            badges: ['Slow Smoked', 'Ready to Heat & Serve'],
            heatingInstructions: 'Microwave for 2 mins or pan-sear for a crispy finish.',
            ingredients: 'Chicken wings, cayenne pepper, paprika, molasses, vinegar, spices.',
            storageInstructions: 'Keep chilled. Use within 5 days.'
        },
        {
            name: 'Peri Peri Wings',
            description: 'Zesty and spicy wings with a citrus punch (8pcs).',
            longDescription: 'Flame-grilled flavor meets slow-smoked tenderness. Our Peri Peri wings are infused with bird\'s eye chili, citrus, and herbs for a refreshing yet spicy experience.',
            category: 'bbq',
            subCategory: 'wings',
            price: 180,
            weight: '8pcs',
            image: '/periperiwings.png',
            badges: ['Slow Smoked', 'Ready to Heat & Serve'],
            heatingInstructions: 'Best enjoyed after heating in an oven at 200°C for 4 mins.',
            ingredients: 'Chicken wings, peri-peri chili, lemon juice, garlic, oil, herbs.',
            storageInstructions: 'Store at 0-4°C. Do not freeze after thawing.'
        },
        // BEEF
        {
            name: 'Beef Brisket',
            description: '12-hour slow smoked signature Texas brisket.',
            longDescription: 'The King of BBQ. Our beef brisket is slow-smoked for 12 hours over oak charcoal, resulting in a deep smoke ring and melt-in-your-mouth texture.',
            category: 'bbq',
            subCategory: 'beef',
            price: 360,
            weight: '200g',
            image: '/beefbrisket.png',
            badges: ['Best Seller', 'Slow Smoked', 'Ready to Heat & Serve'],
            heatingInstructions: 'Wrap in foil and heat in oven at 150°C for 10-15 mins to maintain juiciness.',
            ingredients: 'Premium beef brisket, salt, black pepper, smoke.',
            storageInstructions: 'Vacuum sealed. Keep refrigerated for up to 7 days.'
        },
        {
            name: 'Beef Pepper Garlic Steak',
            description: 'Savory beef steak with a robust pepper-garlic crust.',
            longDescription: 'A bold take on beef steak. Sliced from premium cuts, this steak is seasoned with a thick layer of crushed pepper and garlic, then smoked to medium-well perfection.',
            category: 'bbq',
            subCategory: 'beef',
            price: 360,
            weight: '200g',
            image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=800&q=80',
            badges: ['Slow Smoked', 'Ready to Heat & Serve'],
            heatingInstructions: 'Quickly pan-sear for 1-2 mins on each side over high heat.',
            ingredients: 'Beef steak, black pepper, garlic, salt, Worcestershire sauce.',
            storageInstructions: 'Keep at 0-4°C.'
        },
        {
            name: 'Texas Beef Steak',
            description: 'Hardcore Texas flavor. Smoked and bold.',
            longDescription: 'Deep, smoky, and intensely flavorful. This beef steak is treated with a traditional Texas rub and smoked over hardwood for a truly authentic ranch experience.',
            category: 'bbq',
            subCategory: 'beef',
            price: 360,
            weight: '200g',
            image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
            badges: ['Slow Smoked', 'Ready to Heat & Serve'],
            heatingInstructions: 'Oven bake at 180°C for 6-8 mins or grill for 3 mins.',
            ingredients: 'Beef, paprika, cumin, brown sugar, salt, coffee-infused smoke.',
            storageInstructions: 'Refrigerate immediately.'
        },
        // PORK
        {
            name: 'Texas Smoked Pork Ribs',
            description: 'Fall-off-the-bone ribs with a sticky BBQ glaze.',
            longDescription: 'Our award-winning pork ribs are slow-smoked until they are incredibly tender. Finished with a glaze that balances sweet and savory perfectly.',
            category: 'bbq',
            subCategory: 'pork',
            price: 350,
            weight: '200g',
            image: '/texassmokedporkedribs.png',
            badges: ['Most Popular', 'Slow Smoked', 'Ready to Heat & Serve'],
            heatingInstructions: 'Oven bake at 160°C for 10 mins covered with foil.',
            ingredients: 'Pork ribs, BBQ sauce, molasses, apple cider vinegar, salt.',
            storageInstructions: 'Keep chilled. Use within 5 days.',
            isMostPopular: true
        },
        {
            name: 'Texas Smoked Pork Belly',
            description: 'Rich, juicy, and smoky pork belly slices.',
            longDescription: 'Decadent layers of fat and meat, smoked slowly to render the fat and infuse deep charcoal flavor. It\'s the ultimate comfort BBQ.',
            category: 'bbq',
            subCategory: 'pork',
            price: 350,
            weight: '200g',
            image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=800&q=80',
            badges: ['Slow Smoked', 'Ready to Heat & Serve'],
            heatingInstructions: 'Pan-fry for 2 mins per side to crisp up the edges.',
            ingredients: 'Pork belly, brown sugar rub, smoked paprika, garlic powder.',
            storageInstructions: 'Store in refrigerator. Consumption within 3 days recommended.'
        },
        {
            name: 'Smokey Spicy Pork',
            description: 'Infused with smoke and fire. A spicy pork delight.',
            longDescription: 'This isn\'t for the faint of heart. Our spicy pork is rubbed with a blend of dried chilies and smoked over hot coals for a lingering, deep heat.',
            category: 'bbq',
            subCategory: 'pork',
            price: 350,
            weight: '200g',
            image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80',
            badges: ['Slow Smoked', 'Ready to Heat & Serve'],
            heatingInstructions: 'Heat in microwave for 3 mins or stir-fry briefly.',
            ingredients: 'Pork, chili pepper flakes, habanero powder, garlic, vinegar.',
            storageInstructions: 'Keep at 0-4°C.'
        },
        // CHICKEN
        {
            name: 'Pepper Garlic Chicken Steak',
            description: 'Tender chicken steak infused with bold pepper and garlic.',
            longDescription: 'A pitmaster favorite. This juicy chicken steak is marinated in crushed black pepper and roasted garlic, then smoked until it reaches peak tenderness.',
            category: 'bbq',
            subCategory: 'chicken',
            price: 250,
            weight: '200g',
            image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
            badges: ['Slow Smoked', 'Ready to Heat & Serve'],
            heatingInstructions: 'Heat on a skillet with a dash of butter for 3-4 mins per side.',
            ingredients: 'Chicken breast, black pepper, roasted garlic, sea salt, olive oil.',
            storageInstructions: 'Keep refrigerated. Consume within 48 hours of opening.'
        },
        {
            name: 'Texas Chicken Steak',
            description: 'Classic Texas style smoked chicken steak.',
            longDescription: 'Smoked over premium charcoal, this chicken steak is seasoned with our signature Texas dry rub for an authentic smokehouse flavor.',
            category: 'bbq',
            subCategory: 'chicken',
            price: 250,
            weight: '200g',
            image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
            badges: ['Slow Smoked', 'Ready to Heat & Serve'],
            heatingInstructions: 'Heat on a skillet or oven warm for 5 minutes.',
            ingredients: 'Chicken breast, Texas rub, salt, pepper, smoke.',
            storageInstructions: 'Keep refrigerated.'
        }
    ];

    console.log('--- Seeding Products ---');
    for (const p of products) {
        const productSku = `${p.category}-${p.name.toLowerCase().replace(/ /g, '-')}`;
        await prisma.product.create({
            data: {
                id: crypto.randomUUID(),
                name: p.name,
                sku: productSku,
                description: p.description,
                longDescription: p.longDescription,
                category: p.category,
                subCategory: p.subCategory,
                price: p.price,
                weight: p.weight,
                volume: p.volume,
                stock: 100,
                status: 'active',
                isMostPopular: (p as any).isMostPopular || false,
                isBestValue: (p as any).isBestValue || false,
                badges: (p as any).badges || [],
                heatingInstructions: (p as any).heatingInstructions,
                ingredients: p.ingredients,
                storageInstructions: p.storageInstructions,
                images: {
                    create: [{ imageUrl: p.image }]
                }
            }
        });
    }

    const combos = [
        {
            name: 'The Lone Star Solo Combo',
            description: 'Beef Brisket (200g) + 1 Signature Sauce (250ml)',
            longDescription: 'The ultimate Texas power meal. Our signature 12-hour smoked beef brisket paired with your choice of any handcrafted bottle of sauce. This solo feast brings the heart of the pitmaster direct to your table.',
            heatingInstructions: 'Heat brisket in foil (150°C, 10m). Serve sauce at room temp.',
            ingredients: 'Beef Brisket, Signature Rub, Choice of Signature Sauce.',
            storageInstructions: 'Refrigerate meat and sauce separately. Consume meat within 3 days.',
            price: 549,
            originalPrice: 580,
            image: '/TheLoneStarSolo.png',
            isMostPopular: true
        },
        {
            name: 'Peri Peri Punch Combo',
            description: 'Peri Peri Wings (8pcs) + 1 Signature Sauce (250ml)',
            longDescription: 'A citrusy, spicy explosion. Authentic slow-smoked Peri Peri wings served alongside a full 250ml bottle of your favorite sauce. Perfect for those who love a zesty kick.',
            heatingInstructions: 'Microwave wings for 2-3 minutes or oven crisp at 180°C. Shake sauce well.',
            ingredients: 'Smoked Chicken Wings, Peri Peri Marinade, Choice of Signature Sauce.',
            storageInstructions: 'Refrigerate. Best consumed within 5 days.',
            price: 379,
            originalPrice: 400,
            image: '/combo4.jpg',
            isMostPopular: false
        },
        {
            name: 'Garlic Glaze Chicken Combo',
            description: 'Pepper Garlic Chicken Steak (200g) + 1 Signature Sauce (250ml)',
            longDescription: 'For the garlic lovers. A juicy, smoke-kissed chicken steak paired with a bottle of our umami-rich signature sauce. A sophisticated balance of bold aromatics and wood-fired flavor.',
            heatingInstructions: 'Pan-fry chicken steak with a dash of butter for 2 mins each side. Enjoy with room temp sauce.',
            ingredients: 'Chicken Breast, Black Pepper, Roasted Garlic, Choice of Signature Sauce.',
            storageInstructions: 'Refrigerate. Use within 48 hours for best quality.',
            price: 449,
            originalPrice: 470,
            image: '/combo5.png',
            isMostPopular: false
        },
        {
            name: 'Pitmaster Vanguard Feast',
            description: 'Beef Brisket (200g) + Pork Ribs (200g) + 2 Signature Sauces',
            longDescription: 'The heavy-hitters. A massive combination of our king brisket and fall-off-the-bone ribs, rounded out with two full bottles of sauce for the ultimate variety. Built for sharing, or one very serious pitmaster.',
            heatingInstructions: 'Oven warm ribs in foil (160°C, 10m) and brisket (150°C, 10m). Let rest for 2 mins before serving.',
            ingredients: 'Beef Brisket, Pork Ribs, BBQ Glaze, 2x Choice of Signature Sauce.',
            storageInstructions: 'Refrigerate meats in airtight containers. Sauces good for 3 months refrigerated.',
            price: 1099,
            originalPrice: 1150,
            image: '/combo3.png',
            isBestValue: true
        },
        {
            name: 'Texas Smoked Duo Combo',
            description: 'Pork Belly (200g) + Texas Chicken Steak (200g) + 2 Signature Sauces',
            longDescription: 'The perfect double-team. Rich, melting pork belly paired with our signature Texas chicken steak and two full 250ml bottles of sauce. A true journey through the smokehouses of the Hill Country.',
            heatingInstructions: 'Crisp pork belly on a skillet (2m/side). Oven warm chicken steak. Mix and match with the 2 included sauces.',
            ingredients: 'Pork Belly, Texas Rub, Chicken Steak, 2x Choice of Signature Sauce.',
            storageInstructions: 'Keep refrigerated at 0-4°C. Best consumed within 3 days.',
            price: 999,
            originalPrice: 1040,
            image: '/TexasSmokedDuo.png',
            isBestValue: true
        },
        {
            name: 'Double Heatseeker Feast',
            description: 'Spicy Wings (8pcs) + Spicy Pork (200g) + 2 Signature Sauces',
            longDescription: 'For the thrill-seekers. Our fiery wings and smokey spicy pork, locked and loaded with two bottles of our hottest sauces. Not for the faint of heart, but addictive for the true spice enthusiast.',
            heatingInstructions: 'Heat spicy pork in a wok for 3 minutes. Microwave wings for 2-3 minutes. Use sauces sparingly!',
            ingredients: 'Spicy Chicken Wings, Spicy Smoked Pork, Chili Blends, 2x Choice of Signature Sauce.',
            storageInstructions: 'Store chilled. Capsaicin is a natural preservative but best within 5 days.',
            price: 929,
            originalPrice: 970,
            image: '/combo6.png',
            isBestValue: false
        }
    ];

    console.log('--- Seeding Combos ---');
    for (const c of combos) {
        await prisma.comboPack.create({
            data: {
                id: crypto.randomUUID(),
                name: c.name,
                description: c.description,
                longDescription: c.longDescription,
                heatingInstructions: c.heatingInstructions,
                ingredients: c.ingredients,
                storageInstructions: c.storageInstructions,
                price: c.price,
                originalPrice: c.originalPrice,
                image: c.image,
                isMostPopular: c.isMostPopular || false,
                isBestValue: c.isBestValue || false,
                status: 'active'
            }
        });
    }

    console.log('--- Seeding Finished ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
