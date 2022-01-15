import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

const App = () => {

  const [countryNames, setCountryNames] = useState([]);
  const [selectedCountryName, setSelectedCountryName] = useState("");
  const [stateNames, setStateNames] = useState([]);
  const [selectedStateName, setSelectedStateName] = useState("");
  const [cityNames, setCityNames] = useState([]);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [weatherData, setWeatherData] = useState({temp: "", condition: "", icon: ""});
  const [error, setError] = useState(false);

  useEffect(() => {
    getCountryNames();
    return () => {
      localStorage.removeItem("authToken");
    }
  }, []);

  const getCountryNames = () => {
    axios.get("https://www.universal-tutorial.com/api/getaccesstoken", { headers: {
      "Accept": "application/json",
      "api-token": "56yO7D4NrdRT7wqtVIn9p_XYA8pNKEZ77cz1QYAcKNfdCGbT4_DMo0xvxO7iWOu2kfI",
      "user-email": "manoramtaparia@gmail.com"
    }}).then((data) => {
      const authToken = data.data.auth_token;
      localStorage.setItem('authToken', authToken);
      axios.get("https://www.universal-tutorial.com/api/countries/", { headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${authToken}`
      }}).then((response) => {
        setCountryNames(response.data);
      })
    })
  };

  const getStateNames = () => {
    if(!selectedCountryName){
      return;
    }
    const authToken = localStorage.getItem('authToken');
    axios.get(`https://www.universal-tutorial.com/api/states/${selectedCountryName}`, { headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${authToken}`
      }}).then((response) => {
        setStateNames(response.data);
      })
  }

  const getCityNames = () => {
    if(!selectedStateName){
      return;
    }
    const authToken = localStorage.getItem('authToken');
    axios.get(`https://www.universal-tutorial.com/api/cities/${selectedStateName}`, { headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${authToken}`
      }}).then((response) => {
        setCityNames(response.data);
      })
  }

  const getWeatherData = () => {
    if(!selectedCityName){
      return;
    }
    setError(false);
    const apiKey = "e81d4cdf3f42ccbc745fe27695843e3c";
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${selectedCityName}&appid=${apiKey}`)
      .then((response) => {
        setWeatherData(prevState => ({
          ...prevState,
          temp: response.data.main.temp,
          condition: response.data.weather[0].main,
          icon: response.data.weather[0].icon
        }))
      }).catch((error) => {
        console.log("Error in weather API - possibly city not found");
        setError(true);
      })
  }

  return (
    <div className="App">
      <input list="country-list" id="country-choice" name="country-choice" onInput={(e) => setSelectedCountryName(e.target.value)}/>
      <datalist id="country-list">
        {countryNames.map((countryObj, index) => {
          return <option key={index} value={countryObj.country_name} />
        })}
      </datalist>
      <button type="button" onClick={getStateNames}>OK</button>
      <hr />
      <input list="state-list" id="state-choice" name="state-choice" onInput={(e) => setSelectedStateName(e.target.value)}/>
      <datalist id="state-list">
        {stateNames.map((stateObj, index) => {
          return <option key={index} value={stateObj.state_name} />
        })}
      </datalist>
      <button type="button" onClick={getCityNames}>OK</button>
      <hr />
      <input list="city-list" id="city-choice" name="city-choice" onInput={(e) => setSelectedCityName(e.target.value)}/>
      <datalist id="city-list">
        {cityNames.map((cityObj, index) => {
          return <option key={index} value={cityObj.city_name} />
        })}
      </datalist>
      <button type="button" onClick={getWeatherData}>OK</button>
      <hr />
      {weatherData.temp && 
      weatherData.condition && 
      weatherData.icon && 
      selectedCityName && 
      selectedStateName && 
      selectedCountryName &&
        <div>
          <p>The temperature in {selectedCityName}, {selectedStateName}, {selectedCountryName} is {parseFloat(weatherData.temp - 273).toFixed(2)}°C</p>
          <p>The weather condition is {weatherData.condition}</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="weather-icon" />
        </div>
      }
      {error && <p>City not found error in API. Please try for some other city.</p>}
    </div>
  );
}

export default App;
