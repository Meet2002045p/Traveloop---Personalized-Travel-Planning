const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Simulated AI Itinerary Generation
router.post('/generate', auth, async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // This is a mocked AI response for demonstration.
        // In a production app, you would call OpenAI or Google Gemini API here.
        
        setTimeout(() => {
            let responseText = `I have analyzed your request: "${prompt}".\n\n`;
            
            if (prompt.toLowerCase().includes('tokyo') || prompt.toLowerCase().includes('japan')) {
                responseText += "Here is a suggested 3-day itinerary for Tokyo:\n";
                responseText += "Day 1: Explore Shinjuku and Harajuku. Visit Meiji Shrine.\n";
                responseText += "Day 2: Tsukiji Outer Market for breakfast, then teamLab Planets.\n";
                responseText += "Day 3: Day trip to Mt. Fuji or explore Asakusa (Senso-ji).\n";
            } else if (prompt.toLowerCase().includes('paris')) {
                responseText += "Here is a suggested 3-day itinerary for Paris:\n";
                responseText += "Day 1: Eiffel Tower, Seine River Cruise, and Louvre Museum.\n";
                responseText += "Day 2: Montmartre, Sacré-Cœur, and vintage shopping in Le Marais.\n";
                responseText += "Day 3: Day trip to Palace of Versailles.\n";
            } else {
                responseText += "Based on my analysis of travel trends, I recommend focusing on finding flights first, then booking accommodations near the city center. I can help you create a detailed day-by-day itinerary once your destination is locked in!\n";
            }
            
            res.json({ message: responseText });
        }, 2000); // Simulate network/AI delay
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
