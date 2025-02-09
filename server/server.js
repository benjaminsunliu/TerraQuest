import dotenv from 'dotenv';
import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate initial scene
app.post('/api/generate-initial-scene', async (req, res) => {
  const { scenario } = req.body;

  try {
    const prompt = `Create an opening scene for an interactive story about ${scenario}.
    
    Follow this EXACT format and rules:
    1. Numbers must be written as integers (e.g., 2, -1, 0) without any + signs
    2. Impact scores must be between -3 and 3
    3. Generate exactly 3 choices where:
       - First choice prioritizes environmental impact (higher environment score)
       - Second choice prioritizes economic impact (higher economy score)
       - Third choice prioritizes social impact (higher social score)
    4. Make sure the choices are not long and are easy to understand. They must fit in one line.
    5. Add emojis to the choices to make them more engaging.

    Return a JSON object exactly like this:
    {
      "text": "Your opening scene description",
      "choices": [
        {
          "text": "Environmental choice description",
          "impact": {"environment": 2, "economy": -1, "social": 0}
        },
        {
          "text": "Economic choice description",
          "impact": {"environment": -1, "economy": 2, "social": 0}
        },
        {
          "text": "Social choice description",
          "impact": {"environment": 0, "economy": -1, "social": 2}
        }
      ]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a story generator that creates engaging opening scenes with meaningful choices that each focus on different aspects: environmental, economic, and social impacts."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const scene = JSON.parse(completion.choices[0].message.content);
    res.json(scene);

  } catch (error) {
    console.error('Error generating initial scene:', error);
    res.status(500).json({ 
      error: 'Failed to generate initial scene',
      details: error.message
    });
  }
});

// Generate next scene
app.post('/api/generate-next-scene', async (req, res) => {
  const { scenario, previousScenes, currentChoice, totalScenes } = req.body;

  try {
    const shouldEndStory = totalScenes >= 3 && (
      totalScenes >= 5 || 
      Math.random() > 0.7 || 
      isPositiveOutcome(currentChoice.impact)
    );

    if (shouldEndStory) {
      const endingPrompt = `Create a conclusion for the story based on the player's choices. Make sure the ending is not long and is easy to understand.
      Previous scenes: ${JSON.stringify(previousScenes)}
      Current choice: ${JSON.stringify(currentChoice)}
      
      Return a JSON object like this:
      {
        "text": "Your ending description",
        "isEnding": true
      }`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Create a satisfying story conclusion that reflects the player's journey."
          },
          { role: "user", content: endingPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const ending = JSON.parse(completion.choices[0].message.content);
      ending.isEnding = true;
      return res.json(ending);
    }

    const prompt = `Create the next scene for the story based on the player's previous choice.
    Previous scenes: ${JSON.stringify(previousScenes)}
    Current choice: ${JSON.stringify(currentChoice)}
    
    Follow this EXACT format and rules:
    1. Numbers must be written as integers (e.g., 2, -1, 0) without any + signs
    2. Impact scores must be between -3 and 3
    3. Generate exactly 3 choices where:
       - First choice focuses on environmental impact (higher environment score)
       - Second choice focuses on economic impact (higher economy score)
       - Third choice focuses on social impact (higher social score)
    4. Each choice should follow naturally from the previous scenes
    5. Make sure the choices are not long and are easy to understand. They must fit in one line.
    6. Add emojis to the choices to make them more engaging.

    Return a JSON object exactly like this:
    {
      "text": "Your scene description",
      "choices": [
        {
          "text": "Environmental choice description",
          "impact": {"environment": 2, "economy": -1, "social": 0}
        },
        {
          "text": "Economic choice description",
          "impact": {"environment": -1, "economy": 2, "social": 0}
        },
        {
          "text": "Social choice description",
          "impact": {"environment": 0, "economy": -1, "social": 2}
        }
      ]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Create engaging story scenes with three distinct choices that focus on environmental, economic, and social impacts respectively. Make sure the choices are not long and are easy to understand."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const scene = JSON.parse(completion.choices[0].message.content);
    res.json(scene);

  } catch (error) {
    console.error('Error generating next scene:', error);
    res.status(500).json({ 
      error: 'Failed to generate next scene',
      details: error.message
    });
  }
});

// Helper function to determine if the current choice has a positive outcome
function isPositiveOutcome(impact) {
  const total = impact.environment + impact.economy + impact.social;
  return total >= 2;
}

// Generate personality assessment
app.post('/api/generate-assessment', async (req, res) => {
  const { scores, scenario, playerChoices } = req.body;

  try {
    const prompt = `Generate a personality assessment for a player in a ${scenario} scenario.
    Their choices: ${JSON.stringify(playerChoices)}
    Final scores: ${JSON.stringify(scores)}
    
    Return a JSON object with this structure:
    {
      "type": "Career archetype name",
      "description": "Detailed personality assessment",
      "careers": ["Career suggestion 1", "Career suggestion 2", "Career suggestion 3"]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    const assessment = JSON.parse(completion.choices[0].message.content);
    res.json(assessment);

  } catch (error) {
    console.error('Error generating assessment:', error);
    res.status(500).json({ error: 'Failed to generate assessment' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

