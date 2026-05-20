
/**
 * Filters, scores, and ranks providers based on the extracted user intent.
 * 
 * @param {Object} intent - The parsed JSON from Gemini (contains service, location, etc.)
 * @param {Array} providers - The array of providers objects from providers.json
 * @returns {Array} - Top 3 matched providers with scores and reasoning
 */

const BASE_RATES = { "ac technician": 800, "plumber": 500, "electrician": 600, "tutor": 550, "beautician": 700 };
const URGENCY = { "urgent": 200, "abhi": 250, "jaldi": 200, "asap": 200, "tonight": 150, "kal subah": 100, "tomorrow morning": 100 };

function estimatePrice(provider, intent) {
    const base = BASE_RATES[provider.category.toLowerCase()] || 600;
    const time = (intent?.time || '').toLowerCase();
    const urgency = Object.entries(URGENCY).find(([k]) =>
        time.includes(k))?.[1] ?? 100;
    const price = base + (provider.rating * 15) + (provider.distance_km * 5) + urgency;
    return `Rs. ${Math.round(price * 0.9)} - Rs. ${Math.round(price * 1.1)}`;
}

export function matchprovider(intent, providers) {
    // 1. Normalize intent strings (Mapping 'service' -> 'category' and 'location' -> 'area')
    const requestedCategory = (intent.service || "").toLowerCase();
    const requestedArea = (intent.location || "").toLowerCase();

    // 2. Filter by availability, area match, and category inclusion
    const filteredproviders = providers.filter(providers => {
        if (!providers.available) return false;

        const providersCategory = providers.category.toLowerCase();
        const providersArea = providers.area.toLowerCase();

        const isCategoryMatch = providersCategory.includes(requestedCategory) || requestedCategory.includes(providersCategory);

        const isAreaMatch = providersArea.includes(requestedArea) || requestedArea.includes(providersArea);

        return isCategoryMatch && isAreaMatch;
    });

    // 3. Score each filtered providers
    const scoredproviders = filteredproviders.map(providers => {
        // Formula: score = (rating * 0.6) + ((10 - distance_km) * 0.4)
        const rawScore = (providers.rating * 0.6) + ((10 - providers.distance_km) * 0.4);
        const finalScore = parseFloat(rawScore.toFixed(2)); // Clean up floating point decimals

        // Generate reasoning string
        const reasoning = `Recommended because they are a ${providers.rating}-star ${providers.category} located in ${providers.area} (just ${providers.distance_km}km away). Match Score: ${finalScore}.`;

        return {
            ...providers,
            matchScore: finalScore,
            priceEstimate: estimatePrice(providers, intent),
            reasoning: reasoning
        };
    });

    // 4. Sort descending by score and return the top 3
    return scoredproviders
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3)
        .map(p => ({
            ...p,
            priceEstimate: estimatePrice(p, intent),
            reasoning: `Rated ${p.rating}★, ${p.distance_km}km away`
        }))
};