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

  useEffect(() => {
    getCountryNames();
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
        setCityNames(response.data);
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
      <button type="button" onClick={()=> console.log(selectedCityName)}>OK</button>
    </div>
  );
}

export default App;
