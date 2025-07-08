import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import WeatherActivities from "./WeatherActivities";
import { useState, useEffect } from "react";

export default function WeatherApp({ onWeatherChange }) {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "",
        temp: 0,
        temMin: 0,
        temMax: 0,
        feelsLike: 0,
        humidity: 0,
        weather: "",
        description: "",
        icon: "",
        country: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to determine weather type for styling
    const getWeatherType = (weather) => {
        if (!weather) return 'clear';
        const weatherLower = weather.toLowerCase().trim();
        
        // Group similar weather conditions with more specific matching
        const rainConditions = ['rain', 'drizzle', 'thunderstorm', 'squall', 'shower'];
        const snowConditions = ['snow', 'sleet', 'hail', 'blizzard', 'ice'];
        const cloudConditions = ['cloud', 'overcast', 'mist', 'fog', 'haze', 'dust', 'smoke', 'sand', 'ash'];
        const clearConditions = ['clear', 'sunny'];
        
        // More precise matching
        if (rainConditions.some(condition => 
            new RegExp(`\\b${condition}\\b`, 'i').test(weatherLower)
        )) return 'rainy';
        
        if (snowConditions.some(condition => 
            new RegExp(`\\b${condition}\\b`, 'i').test(weatherLower)
        )) return 'snowy';
        
        if (cloudConditions.some(condition => 
            new RegExp(`\\b${condition}\\b`, 'i').test(weatherLower)
        )) return 'cloudy';
        
        if (clearConditions.some(condition => 
            new RegExp(`\\b${condition}\\b`, 'i').test(weatherLower)
        )) return 'sunny';
        
        // Default to clear if no match found
        return 'clear';
    };

    // Update parent component when weather changes
    useEffect(() => {
        if (weatherInfo.weather && onWeatherChange) {
            onWeatherChange(getWeatherType(weatherInfo.weather));
        }
    }, [weatherInfo.weather, onWeatherChange]);

    // Fetch weather for default location on initial load
    useEffect(() => {
        const fetchDefaultWeather = async () => {
            try {
                setLoading(true);
                const API_KEY = "25aae518d4575bb056663f66b398774e";
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                
                const data = await response.json();
                
                const newInfo = {
                    city: data.name,
                    temp: data.main.temp,
                    temMin: data.main.temp_min,
                    temMax: data.main.temp_max,
                    feelsLike: data.main.feels_like,
                    humidity: data.main.humidity,
                    weather: data.weather[0].main.toLowerCase(),
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    country: data.sys.country
                };
                
                setWeatherInfo(newInfo);
                
                // Update weather type
                if (onWeatherChange) {
                    onWeatherChange(getWeatherType(newInfo.weather));
                }
                
                setLoading(false);
            } catch (err) {
                setError("Failed to load weather data. Please try again later.");
                setLoading(false);
            }
        };

        fetchDefaultWeather();
    }, [onWeatherChange]);

    const updateInfo = (newInfo) => {
        setWeatherInfo(prev => {
            const updatedInfo = {
                ...prev,
                ...newInfo
            };
            
            // Update weather type when info changes
            if (onWeatherChange && newInfo.weather) {
                onWeatherChange(getWeatherType(newInfo.weather));
            }
            
            return updatedInfo;
        });
    };

    return (
        <div className="weather-app">
            <header className="app-header">
                <h1>Mausam.ai</h1>
                <p className="app-tagline">Your personal weather companion</p>
                <SearchBox updateInfo={updateInfo} />
                {error && <div className="error-message">{error}</div>}
            </header>

            <main>
                {loading ? (
                    <div className="loading">Loading weather data...</div>
                ) : (
                    <>
                        <InfoBox info={weatherInfo} />
                        <WeatherActivities 
                            weatherType={getWeatherType(weatherInfo.weather)}
                            country={weatherInfo.country}
                            temperature={weatherInfo.temp}
                        />
                    </>
                )}
            </main>

            <footer className="app-footer">
                <p>
                    Created with ❤️ by{' '}
                    <a 
                        href="https://www.linkedin.com/in/shaurya-singh007" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="creator-link"
                    >
                        Shourya Singh
                    </a>
                </p>
            </footer>
        </div>
    );
}