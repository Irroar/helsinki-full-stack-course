import { useState, useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const [countrySearch, setCountrySearch] = useState('');
  const [countries, setCountries] = useState([]);

  const countriesHook = () => {
    axios.get(`https://restcountries.com/v3.1/all`).then(res => {
      setCountries(res.data);
    });
  }  

  useEffect(countriesHook, []);

  const searchChangeHandler = (event) => {
    setCountrySearch(event.target.value);
  }

  return (
    <>
      <div>
        search: <input value={countrySearch} onChange={searchChangeHandler}></input>
      </div>
      <CountryList countries={countries.filter(country => country.name.common.includes(countrySearch))} 
                   isFiltered={countrySearch.length !== 0} onClick={setCountries}
                   />
    </>
  );
}

const CountryList = ({countries, isFiltered, onClick}) => {
  if (isFiltered) {
    if (countries.length > 10) {
      return (
        <>
          <p>Too many matches, specify another filter</p>
        </>
      )
    } else if (countries.length === 1) {
      return (
        <>
          <CountryFullInfo country={countries[0]}/>
        </>
      );
    } else {
      return (
        <>
          {countries.map((country, i) => 
            <Country key={i} country={country} onClick={onClick} />
          )}
        </>
      );
    }
  }
}

const Country = ({country, onClick}) => {
  return (
    <>
      <div>
        {country.name.common} <button onClick={() => onClick([country])}>show</button>
      </div>
    </>
  );
}

const CountryFullInfo = ({country}) => {
  const languages = Object.values(country.languages);
  const flagUrl = country.flags.png;
  const [weather, setWeather] = useState([]);

  const weatherHook = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`).then(res => {
    setWeather(res.data);
    })
  }

  useEffect(weatherHook, [country.capital]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={flagUrl} alt="flag"></img>
      <h2>Weather in {country.capital}</h2>
      <div>temperature {weather.hasOwnProperty('main')? weather.main.temp : 'none' } Celcius</div>
      <img alt="weather icon" src={weather.hasOwnProperty('main') ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : ''}></img>
      <div>wind {weather.hasOwnProperty('wind') ? weather.main.temp : 0} m/s</div>
    </>
  );
}

export default App;
