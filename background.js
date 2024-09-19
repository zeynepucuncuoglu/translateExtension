// Retrieve language from storage and use it
async function fetchTranslation(word, x, y) {
    const { language } = await chrome.storage.sync.get('language');
    const targetLanguage = language || 'es';  // Default to Spanish if no language is set

    try {
        const response = await fetch('https://libretranslate.com/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: word,
                source: 'auto',
                target: targetLanguage
            })
        });

        const data = await response.json();

        if (data && data.translatedText) {
            const translatedText = data.translatedText;
            showTooltip(translatedText, x, y);
        }
    } catch (error) {
        console.error('Error fetching translation:', error);
        hideTooltip();
    }
}
