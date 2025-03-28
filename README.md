# Mood Muse

A beautiful and interactive mood tracking application that provides personalized music recommendations, memes, and emotional insights based on your current mood.

## Features

- 🎭 Mood Check-in: Express your mood through quick emoji selections or detailed text descriptions
- 🎵 Personalized Playlists: Get Spotify playlist recommendations based on your mood
- 😊 Mood-Matching Memes: Enjoy curated memes that match your emotional state
- ✨ Beautiful UI: Smooth animations and particle effects for an engaging experience
- 🤖 AI-Powered Analysis: Intelligent mood analysis and personalized responses
- 📱 Responsive Design: Works seamlessly on all devices

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Supabase

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mood-muse.git
   cd mood-muse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   VITE_HUGGINGFACE_API_TOKEN=your_huggingface_token_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   VITE_SUPABASE_URL=your_supabase_url_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Environment Variables

- `VITE_HUGGINGFACE_API_TOKEN`: Your HuggingFace API token for AI-powered mood analysis
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key for database access
- `VITE_SUPABASE_URL`: Your Supabase project URL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.