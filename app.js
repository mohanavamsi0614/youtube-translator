import TranscriptAPI from 'youtube-transcript-api';
import express from "express"
import cors from "cors"; 
import openai from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const { OpenAI } = openai;
const openaiClient = new OpenAI({
    apiKey: process.env.open_api,
});

const app = express();
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('YouTube Transcript API is running!');
    }
);

app.post('/' , async(req , res)=>{

    const { videoId } = req.body;
    if (!videoId) {
        return res.status(400).json({ error: 'Video ID is required' });
    }
    try{
    const transcript= await TranscriptAPI.getTranscript(videoId)
    let result;
    transcript.forEach(element => {
        result += element.text + ' ';
    });
    result= result.trim();

    openaiClient.chat.completions.create({
        model: "chatgpt-4o-latest",
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Summarize the following transcript in telugu in a understandble way:\n\n${result}` }
        ],
    }).then((response) => {
        const summary = response.choices[0].message.content;
        return res.json({ summary });
    }).catch((error) => {
        console.error('Error generating summary:', error);
        return res.status(500).json({ error: 'Failed to generate summary' });

    })
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch transcript' });
    }
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
