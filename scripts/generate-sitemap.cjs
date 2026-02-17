const fs = require('fs');
const path = require('path');

// Mocking the pSEO data since we can't easily import TS in a simple CJS script without ts-node
const LOCATIONS = [
    "Koramangala", "Indiranagar", "HSR Layout", "Kammanahalli", "Whitefield",
    "Jayanagar", "JP Nagar", "MG Road", "Hebbal", "Malleshwaram",
    "Electronic City", "Sarjapur", "Bannerghatta", "Marathahalli", "Kalyan Nagar"
];

const CATEGORIES = [
    { id: "catering", name: "BBQ Catering" },
    { id: "delivery", name: "BBQ Delivery" },
    { id: "brisket", name: "Authentic Beef Brisket" },
    { id: "ribs", name: "Smoked Pork Ribs" }
];

const STATIC_ROUTES = [
    '', '/shop', '/events', '/blog', '/franchise', '/terms', '/privacy'
];

const SITE_URL = "https://smokesignalbbq.in";

const generateSitemap = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static Routes
    STATIC_ROUTES.forEach(route => {
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}${route}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
        xml += `  </url>\n`;
    });

    // Programmatic Routes
    CATEGORIES.forEach(cat => {
        LOCATIONS.forEach(loc => {
            const slug = `${cat.id}-in-${loc.toLowerCase().replace(/\s+/g, '-')}`;
            xml += `  <url>\n`;
            xml += `    <loc>${SITE_URL}/services/${slug}</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.6</priority>\n`;
            xml += `  </url>\n`;
        });
    });

    xml += `</urlset>`;

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`✅ Sitemap generated with ${STATIC_ROUTES.length + (CATEGORIES.length * LOCATIONS.length)} URLs at ${outputPath}`);
};

generateSitemap();
