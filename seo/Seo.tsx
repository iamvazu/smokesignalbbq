import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SeoProps {
    title: string;
    description: string;
    canonical?: string;
    ogType?: 'website' | 'article' | 'product';
    ogImage?: string;
    keywords?: string[];
    schema?: object | object[];
}

const DEFAULT_DESC = "Bangalore's original American BBQ since 2011. Slow-smoked beef brisket, pork ribs, and signature sauces delivered fresh to your door.";
const SITE_URL = "https://smokesignalbbq.in";
const DEFAULT_IMAGE = "/logo_final.png";

export const Seo: React.FC<SeoProps> = ({
    title,
    description,
    canonical,
    ogType = 'website',
    ogImage = DEFAULT_IMAGE,
    keywords = [],
    schema
}) => {
    const location = useLocation();
    const fullTitle = `${title} | Smoke Signal BBQ`;
    const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : `${SITE_URL}${location.pathname}`;
    const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

    return (
        <Helmet>
            {/* Canonical Link */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || DEFAULT_DESC} />
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || DEFAULT_DESC} />
            <meta property="og:image" content={imageUrl} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description || DEFAULT_DESC} />
            <meta property="twitter:image" content={imageUrl} />

            {/* JSON-LD Schema */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
