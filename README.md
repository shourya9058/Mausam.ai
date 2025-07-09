
# 🌦️ Mausam.ai

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

mausam.ai is a modern and lightweight React-based weather application that fetches real-time weather data using OpenWeatherMap API. Designed for simplicity and speed, it provides users with an intuitive interface to check current temperature, humidity, weather conditions, and more — all within a sleek UI.

## 🚀 Features

- Real-time weather updates
- Location-based weather information
- Beautiful UI with weather-appropriate animations
- Responsive design for all devices
- Fun, region-specific activity suggestions
- Quick search functionality

## 🛠️ Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- OpenWeatherMap API key

## 🚀 Quick Start

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/mausam-ai.git
   cd mausam-ai
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🚀 Deployment

### Deploy to Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

1. Click the "Deploy to Render" button above
2. Connect your GitHub/GitLab account
3. Select the repository
4. Add your environment variables:
   - `REACT_APP_WEATHER_API_KEY`: Your OpenWeatherMap API key
   - `REACT_APP_DEFAULT_CITY`: (Optional) Default city to show on load
5. Click "Create Web Service"

### Manual Deployment

1. Build the app for production:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your preferred static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_WEATHER_API_KEY` | OpenWeatherMap API key | Yes | - |
| `REACT_APP_API_BASE_URL` | OpenWeatherMap API base URL | No | `https://api.openweathermap.org/data/2.5` |
| `REACT_APP_DEFAULT_CITY` | Default city to show on load | No | `New Delhi` |

## 🤝 Contributing

Contributions are always welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenWeatherMap for the weather data API
- React for the amazing frontend library
- All the amazing open-source contributors


