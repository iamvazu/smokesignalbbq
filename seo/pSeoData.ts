export interface PSeoPage {
    slug: string;
    title: string;
    description: string;
    h1: string;
    content: string;
    location: string;
    category: string;
    faqs: { q: string; a: string }[];
}

export const LOCATIONS = [
    "Koramangala", "Indiranagar", "HSR Layout", "Kammanahalli", "Whitefield",
    "Jayanagar", "JP Nagar", "MG Road", "Hebbal", "Malleshwaram",
    "Electronic City", "Sarjapur", "Bannerghatta", "Marathahalli", "Kalyan Nagar"
];

export const CATEGORIES = [
    { id: "catering", name: "BBQ Catering", intent: "party catering services" },
    { id: "delivery", name: "BBQ Delivery", intent: "fresh charcoal bbq delivery" },
    { id: "brisket", name: "Authentic Beef Brisket", intent: "slow-smoked brisket" },
    { id: "ribs", name: "Smoked Pork Ribs", intent: "fall-off-the-bone ribs" }
];

export const generatePSeoPages = (): PSeoPage[] => {
    const pages: PSeoPage[] = [];

    CATEGORIES.forEach(cat => {
        LOCATIONS.forEach(loc => {
            const slug = `${cat.id}-in-${loc.toLowerCase().replace(/\s+/g, '-')}`;
            pages.push({
                slug,
                location: loc,
                category: cat.name,
                title: `${cat.name} in ${loc} | Best American BBQ in Bangalore`,
                description: `Looking for ${cat.intent} in ${loc}? Smoke Signal BBQ provides authentic Texas-style smoked meats and ${cat.name} across ${loc}, Bangalore. Order now!`,
                h1: `Premium ${cat.name} Services in ${loc}`,
                content: `Experience the finest American charcoal BBQ in ${loc}. Since 2011, Smoke Signal BBQ has been the pioneer of slow-smoked meats in Bangalore. Our ${cat.name} in ${loc} brings the authentic taste of the Texas pit directly to your event or doorstep.`,
                faqs: [
                    {
                        q: `Do you provide ${cat.name} in ${loc}?`,
                        a: `Yes, we provide full ${cat.name} services throughout ${loc} and surrounding areas in Bangalore.`
                    },
                    {
                        q: `What is the delivery time for ${loc}?`,
                        a: `We typically deliver to ${loc} within 45-60 minutes to ensure your BBQ stays fresh and warm.`
                    }
                ]
            });
        });
    });

    return pages;
};
