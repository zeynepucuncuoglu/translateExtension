// Function to get the selected text
function getSelectedWord() {
    const selection = window.getSelection();
    return selection.toString().trim();
}

// Function to display the translation in a tooltip
function showTooltip(text, x, y) {
    let tooltip = document.getElementById('hover-translate-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'hover-translate-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = '#333';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.zIndex = '1000';
        tooltip.style.fontSize = '14px';
        document.body.appendChild(tooltip);
    }

    tooltip.textContent = text;
    tooltip.style.left = `${x + 15}px`;
    tooltip.style.top = `${y + 15}px`;
}

// Function to hide the tooltip
function hideTooltip() {
    const tooltip = document.getElementById('hover-translate-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Event listener for mouseover to detect hovered words
document.addEventListener('mouseover', (event) => {
    const word = getSelectedWord();
    console.log("Hovered word:", word); // Add this line for debugging
    if (word) {
        fetchTranslation(word, event.pageX, event.pageY);
    } else {
        hideTooltip();
    }
});


// Fetch translation from LibreTranslate API
async function fetchTranslation(word, x, y) {
    const targetLanguage = 'es';  // Example: Spanish; you can make this dynamic

    try {
        const response = await fetch('https://libretranslate.com/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: word,
                source: 'auto',  // Automatically detect source language
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
