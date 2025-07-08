//Getting know to material UI:

// import './App.css'
// import Button from '@mui/material/Button';
// import SearchBox from './SearchBox';


// function App() {

//   let handleclick =()=>{
//     console.log("Button is clicked");
//   }
//   return (
//     <>
//       <h1>Material UI</h1>
//       <SearchBox/>
//       <Button variant="outlined" onClick={handleclick}>Outlined</Button>
//     </>
//   )
// }

// export default App
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Project name - Weather widget (Mini/Minor react project to practice and learn how to work with apis)
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import { useState } from 'react';
import WeatherApp from "./WeatherApp";
import WeatherParticles from './WeatherParticles';
import './App.css';

function App() {
  const [weatherType, setWeatherType] = useState('clear');

  return (
    <div className={`app ${weatherType}`}>
      <WeatherParticles weatherType={weatherType} />
      <div className="container">
        <WeatherApp onWeatherChange={setWeatherType} />
      </div>
    </div>
  );
}

export default App;
