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

  const getCountryNames = async () => {
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

  const getStateNames = async() => {
    const authToken = localStorage.getItem('authToken');
    axios.get("https://www.universal-tutorial.com/api/states/${}", { headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${authToken}`
      }}).then((response) => {
        console.log(response);
        setCountryNames(response.data);
      })
  }

  useEffect(() => {
    getCountryNames();
  }, []);

  return (
    <div className="App">
      <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" onInput={(e) => console.log(e.target.value)}/>
      <datalist id="ice-cream-flavors">
        {countryNames.map((countryObj, index) => {
          return <option key={index} value={countryObj.country_name} />
        })}
      </datalist>
      <button type="button">OK</button>
      <hr />
      <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />
      <datalist id="ice-cream-flavors">
        {countryNames.map((countryObj, index) => {
          return <option key={index} value={countryObj.country_name} />
        })}
      </datalist>
      <hr />
      <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />
      <datalist id="ice-cream-flavors">
        {countryNames.map((countryObj, index) => {
          return <option key={index} value={countryObj.country_name} />
        })}
      </datalist>
    </div>
  );
}

export default App;
