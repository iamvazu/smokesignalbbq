export const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Smoke Signal BBQ",
    "alternateName": "Bangalore's Original Texas BBQ",
    "description": "Bangalore's original authentic Texas BBQ since 2011. Specialized in charcoal-smoked brisket, ribs, and ready-to-heat BBQ.",
    "url": "https://smokesignalbbq.in",
    "logo": "https://smokesignalbbq.in/logo_final.png",
    "foundingDate": "2011",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+917899870957",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["en", "Hindi", "Kannada"]
    },
    "sameAs": [
        "https://www.instagram.com/smokesignalbbq",
        "https://www.facebook.com/smokesignalbbq"
    ]
});

export const generateRestaurantSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Smoke Signal BBQ",
    "image": "https://smokesignalbbq.in/logo_final.png",
    "@id": "https://smokesignalbbq.in",
    "url": "https://smokesignalbbq.in",
    "telephone": "+917899870957",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "RS Palaya, Kammanahalli",
        "addressLocality": "Bangalore",
        "postalCode": "560033",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 13.0016,
        "longitude": 77.6377
    },
    "servesCuisine": ["Texas BBQ", "American BBQ", "Smoked Meats"],
    "priceRange": "₹₹₹",
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],
        "opens": "11:00",
        "closes": "23:00"
    },
    "areaServed": "Bangalore",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Authentic BBQ Menu",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Product",
                    "name": "Texas Smoked Brisket",
                    "description": "14-hour charcoal smoked beef brisket, tender and juicy."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Product",
                    "name": "Pork Spare Ribs",
                    "description": "Slow-smoked ribs with signature dry rub."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Product",
                    "name": "Pulled Pork",
                    "description": "Hickory-smoked pulled pork shoulder."
                }
            }
        ]
    }
});

export const generateProductSchema = (product: any) => ({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": `https://smokesignalbbq.in${product.image}`,
    "description": product.description,
    "brand": {
        "@type": "Brand",
        "name": "Smoke Signal BBQ"
    },
    "offers": {
        "@type": "Offer",
        "url": `https://smokesignalbbq.in/product/${product.id}`,
        "priceCurrency": "INR",
        "price": product.priceValue,
        "availability": "https://schema.org/InStock"
    }
});

export const generateFAQSchema = (faqs: { q: string, a: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
        }
    }))
});

export const generateBreadcrumbSchema = (steps: { name: string, item: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": steps.map((step, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": step.name,
        "item": `https://smokesignalbbq.in${step.item}`
    }))
});
