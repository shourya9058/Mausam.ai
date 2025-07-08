import React from 'react';

const WeatherActivities = ({ weatherType, country, temperature }) => {
  // Activity suggestions based on weather and region
  const getActivitySuggestion = () => {
    const isCold = temperature < 15;
    const isWarm = temperature >= 15 && temperature < 25;
    const isHot = temperature >= 25;

    // Regional activities
    const regionalActivities = {
      'IN': {
        rainy: [
          "Perfect weather for chai and pakoras!",
          "Time for some hot samosas and cutting chai!",
          "Grab a plate of bhajiyas and enjoy the rain!"
        ],
        sunny: [
          "Great day for mango lassi and a siesta!",
          "Perfect weather for aam panna and kulfi!",
          "Stay hydrated with nimbu pani and chaas!"
        ],
        snowy: [
          "Rare sight! Enjoy gajar ka halwa and hot chocolate!",
          "Perfect weather for gajar-methi ki sabzi and paratha!"
        ],
        cloudy: [
          "Ideal weather for masala chai and bhutta!",
          "Perfect time for hot jalebi and rabri!"
        ]
      },
      'US': {
        rainy: [
          "Perfect weather for hot chocolate and cookies!",
          "Great day for a movie marathon indoors!"
        ],
        snowy: [
          "Time for hot cocoa by the fireplace!",
          "Perfect weather for making snowmen!"
        ]
      },
      'GB': {
        rainy: [
          "Classic British weather! Time for tea and scones!",
          "Perfect weather for fish and chips!"
        ]
      },
      'JP': {
        rainy: [
          "Perfect weather for ramen and gyoza!",
          "Time for some hot green tea and dango!"
        ],
        snowy: [
          "Great weather for hot pot and sake!",
          "Perfect time for onsen and matcha!"
        ]
      },
      'default': {
        rainy: [
          "Perfect weather for comfort food and a good book!",
          "Great day to stay in and watch your favorite show!"
        ],
        sunny: [
          "Great day for outdoor activities!",
          "Perfect weather for a picnic in the park!"
        ],
        snowy: [
          "Time for hot chocolate by the fire!",
          "Perfect weather for building a snowman!"
        ],
        cloudy: [
          "Great day for a museum visit!",
          "Perfect weather for trying that new cafe!"
        ]
      }
    };

    // Get region-specific messages or fallback to default
    const region = regionalActivities[country] || regionalActivities['default'];
    const weatherKey = weatherType || 'sunny';
    const messages = (region && region[weatherKey]) || 
                   regionalActivities['default'][weatherKey] || 
                   ["Enjoy the weather!"];

    // Return a random message
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Weather emojis
  const weatherEmojis = {
    rainy: '🌧️',
    sunny: '☀️',
    snowy: '❄️',
    cloudy: '☁️',
    clear: '✨'
  };

  const emoji = weatherEmojis[weatherType] || '🌤️';
  const activity = getActivitySuggestion();

  return (
    <div className="activity-container">
      <div className="activity-bubble">
        <span className="emoji">{emoji}</span>
        <p>{activity}</p>
      </div>
    </div>
  );
};

export default WeatherActivities;
