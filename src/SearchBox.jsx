import { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "25aae518d4575bb056663f66b398774e";

    const getWeatherInfo = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const jsonResponse = await response.json();
            
            return {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                temMin: jsonResponse.main.temp_min,
                temMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].main.toLowerCase(),
                description: jsonResponse.weather[0].description,
                icon: jsonResponse.weather[0].icon,
            };
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        setCity(event.target.value);
        if (error) setError(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!city.trim()) return;
        
        try {
            const newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-container">
                    <FiMapPin className="search-icon" />
                    <input
                        type="text"
                        value={city}
                        onChange={handleChange}
                        placeholder="Search for a city..."
                        className="search-input"
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        className="search-button"
                        disabled={loading || !city.trim()}
                    >
                        {loading ? 'Searching...' : <FiSearch />}
                    </button>
                </div>
                {error && (
                    <p className="error-message">
                        City not found. Please try another location.
                    </p>
                )}
            </form>
        </div>
    );
}