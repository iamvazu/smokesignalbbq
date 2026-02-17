import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
    title: string;
    description: string;
    canonical?: string;
    ogType?: 'website' | 'article' | 'product';
    ogImage?: string;
    keywords?: string[];
    schema?: object;
}

const DEFAULT_TITLE = "Smoke Signal BBQ | Authentic Texas-Style BBQ in Bangalore";
const DEFAULT_DESC = "Bangalore's original American BBQ since 2011. Slow-smoked beef brisket, pork ribs, and signature sauces delivered fresh to your door.";
const SITE_URL = "https://smokesignalbbq.in";

export const Seo: React.FC<SeoProps> = ({
    title,
    description,
    canonical,
    ogType = 'website',
    ogImage = '/logo_final.png',
    keywords = [],
    schema
}) => {
    const fullTitle = `${title} | Smoke Signal BBQ`;
    const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || DEFAULT_DESC} />
            <link rel="canonical" href={fullCanonical} />
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || DEFAULT_DESC} />
            <meta property="og:image" content={fullOgImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullCanonical} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || DEFAULT_DESC} />
            <meta name="twitter:image" content={fullOgImage} />

            {/* JSON-LD Schema */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
