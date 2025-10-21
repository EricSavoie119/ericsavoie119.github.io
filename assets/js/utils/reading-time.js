/**
 * Calculate estimated reading time for text content
 * @param {string} text - The text content to analyze
 * @param {number} wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns {number} Estimated reading time in minutes
 */
function calculateReadingTime(text, wordsPerMinute = 200) {
    if (!text || typeof text !== 'string') {
        return 0;
    }

    // Remove HTML tags if present
    const plainText = text.replace(/<[^>]*>/g, '');
    
    // Count words (split by whitespace and filter empty strings)
    const words = plainText.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Calculate reading time in minutes
    const minutes = wordCount / wordsPerMinute;
    
    // Round up to nearest minute (minimum 1 minute)
    return Math.max(1, Math.ceil(minutes));
}

/**
 * Format reading time as a human-readable string
 * @param {number} minutes - Reading time in minutes
 * @returns {string} Formatted reading time (e.g., "5 min read")
 */
function formatReadingTime(minutes) {
    if (minutes === 1) {
        return '1 min read';
    }
    return `${minutes} min read`;
}

// Export for use in other modules
export { calculateReadingTime, formatReadingTime };
