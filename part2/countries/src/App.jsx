import React, { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const style = {
  margin: "20px",
};

const flagStyle = {
  width: "180px",
};

const ShowCountry = ({ country }) => {
  // ... (rest of the ShowCountry component remains the same)

  const [weatherDetails, setWeatherDetails] = useState({});

  const { name, capital, population, languages, flags } = country;
  const {png,alt}=flags
  const { official, common } = name;
  // const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      )
      .then((response) => {
        console.log(response.data);
        const { temperature, weather_icons, wind_speed, wind_dir } =
          response.data.current;
        setWeatherDetails({
          temperature,
          weather_icons,
          wind_speed,
          wind_dir,
        });
      });
  }, [api_key, capital]);

  return (
    <div>
      <h1>Name: {official}</h1>
      <h2>Capital :{capital}</h2>
      <h3>Population :{population}</h3>
      {Array.isArray(languages) && languages.length > 0 && (
        <div>
          <h2>Spoken Languages</h2>
          <ul>
            {languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
        </div>
      )}
      <img src={png} alt={alt} style={flagStyle}></img>
      <h2>Weather at {capital}</h2>
      <p>
        <b>temperature</b>: {weatherDetails.temperature} Celcius
      </p>
      <img src={weatherDetails.weather_icons} alt="weather icon"></img>
      <p>
        <b>wind:</b> {weatherDetails.wind_speed} mph direction{" "}
        {weatherDetails.wind_dir}
      </p>
    </div>
  );
};

const ListCountries = ({ query }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState({});

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((res) => {
          // console.log(res.data)
          setCountries(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  });
  const handleShow = (country) => {
    setCountry(country);
  };

  return (
    <div>
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
      {countries.length < 10 &&
        countries.length > 1 &&
        countries.map((country) => {
          return (
            <div key={country.name.common}>
              {country.name.official}
              <button onClick={() => handleShow(country)}>show</button>
            </div>
          );
        })}
      {country.languages !== undefined && <ShowCountry country={country} />}
    </div>
  );
};

function App() {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  return (
    <div style={style}>
      <h1>Find countries</h1>
      <div>
        Find countries : <input onChange={handleChange} value={query}></input>
      </div>
      <ListCountries query={query} />
    </div>
  );
}

export default App;
