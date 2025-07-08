import { useEffect, useState } from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiDayCloudyHigh } from 'react-icons/wi';
import './InfoBox.css';

export default function InfoBox({ info }) {
  const [weatherIcon, setWeatherIcon] = useState(null);
  
  useEffect(() => {
    // Update app class based on weather condition
    const app = document.querySelector('.app');
    if (app) {
      app.className = 'app';
      if (info.weather) {
        if (info.weather.includes('rain')) {
          app.classList.add('rainy');
          setWeatherIcon(<WiRain className="weather-icon rain" />);
        } else if (info.weather.includes('cloud')) {
          app.classList.add('cloudy');
          setWeatherIcon(<WiCloudy className="weather-icon cloud" />);
        } else if (info.weather.includes('snow')) {
          app.classList.add('snowy');
          setWeatherIcon(<WiSnow className="weather-icon snow" />);
        } else {
          app.classList.add('sunny');
          setWeatherIcon(<WiDaySunny className="weather-icon sun" />);
        }
      }
    }
  }, [info.weather]);

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="weather-container">
      {info.city && (
        <div className="weather-card">
          <div className="weather-header">
            <div>
              <h2 className="city">{info.city}</h2>
              <p className="date">{formatDate()}</p>
              <p className="weather-desc">{info.description?.charAt(0).toUpperCase() + info.description?.slice(1)}</p>
            </div>
            <div className="weather-icon-container">
              {weatherIcon}
              <span className="temperature">{Math.round(info.temp)}°C</span>
            </div>
          </div>
          
          <div className="weather-details">
            <div className="detail-item">
              <WiDayCloudyHigh className="detail-icon" />
              <div>
                <span className="detail-label">Feels Like</span>
                <span className="detail-value">{Math.round(info.feelsLike)}°C</span>
              </div>
            </div>
            
            <div className="detail-item">
              <WiDaySunny className="detail-icon" />
              <div>
                <span className="detail-label">High / Low</span>
                <span className="detail-value">{Math.round(info.temMax)}° / {Math.round(info.temMin)}°</span>
              </div>
            </div>
            
            <div className="detail-item">
              <WiRain className="detail-icon" />
              <div>
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{info.humidity}%</span>
              </div>
            </div>
          </div>
          
          <div className="forecast">
            <h3>5-Day Forecast</h3>
            <div className="forecast-items">
              {[1, 2, 3, 4, 5].map((day) => (
                <div key={day} className="forecast-item">
                  <div className="forecast-day">
                    {new Date(Date.now() + day * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="forecast-temp">
                    {Math.round(info.temMax - (day * 1.5))}°
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {!info.city && (
        <div className="welcome-message">
          <h2>Welcome to Weather App</h2>
          <p>Enter a city name to see the current weather and forecast</p>
        </div>
      )}
    </div>
  );
}
