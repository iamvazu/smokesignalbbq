import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.GA_PROPERTY_ID;

// Initialize the client
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
});

export const getGA4Report = async (startDate = '30daysAgo', endDate = 'today') => {
    if (!propertyId) {
        throw new Error('GA_PROPERTY_ID is not configured');
    }

    try {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [
                { name: 'date' },
                { name: 'sessionSource' }
            ],
            metrics: [
                { name: 'activeUsers' },
                { name: 'screenPageViews' },
                { name: 'sessions' },
                { name: 'conversions' }
            ],
        });

        return response;
    } catch (error) {
        console.error('Error fetching GA4 report:', error);
        throw error;
    }
};

export const getPageViewsReport = async (startDate = '30daysAgo', endDate = 'today') => {
    if (!propertyId) return null;

    try {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'pagePath' }],
            metrics: [{ name: 'screenPageViews' }],
            limit: 10,
        });

        return response.rows?.map(row => ({
            page: row.dimensionValues?.[0]?.value,
            views: parseInt(row.metricValues?.[0]?.value || '0')
        })) || [];
    } catch (error) {
        console.error('Error fetching Page Views report:', error);
        return [];
    }
};

export const getUserInsights = async () => {
    if (!propertyId) return null;

    try {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
            dimensions: [{ name: 'city' }],
            metrics: [{ name: 'activeUsers' }],
            limit: 5,
        });

        return response.rows?.map(row => ({
            city: row.dimensionValues?.[0]?.value,
            users: parseInt(row.metricValues?.[0]?.value || '0')
        })) || [];
    } catch (error) {
        console.error('Error fetching User Insights:', error);
        return [];
    }
};
