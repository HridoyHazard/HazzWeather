import { useEffect, useMemo, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri';
import {
  TbMapSearch,
  TbMoon,
  TbSearch,
  TbSun,
  TbVolume,
  TbVolumeOff,
} from 'react-icons/tb';
import DetailsCard from './components/DetailsCard';
import SummaryCard from './components/SummaryCard';
import './languages/i18n';

import LakeBackground from './asset/lake-background.jpg';
import Astronaut from './asset/not-found.svg';
import SearchPlace from './asset/search.svg';
import BackgroundColor from './components/BackgroundColor';
import BackgroundImage from './components/BackgroundImage';
import Animation from './components/Animation';

import axios from 'axios';
import { Card } from 'antd';
import toast from 'react-hot-toast';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const { t, i18n } = useTranslation();
  const [noData, setNoData] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState();
  const [weatherIcon, setWeatherIcon] = useState(
    `https://openweathermap.org/img/wn/10n@2x.png`
  );
  const [currentLanguage, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  const [loading, setLoading] = useState(false);
  const [backgroundSoundEnabled, setBackgroundSoundEnabled] = useState(true);
  const [isFahrenheitMode, setIsFahrenheitMode] = useState(false);
  const degreeSymbol = useMemo(
    () => (isFahrenheitMode ? '\u00b0F' : '\u00b0C'),
    [isFahrenheitMode]
  );

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  // SETTING THEMES ACCORDING TO DEVICE
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setIsDark(true);
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        setIsDark(event.matches);
      });
  }, [setIsDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    if (currentLanguage === 'en') return;

    changeLanguage(currentLanguage);

    // eslint-disable-next-line
  }, [currentLanguage]);

  const toggleFahrenheit = () => {
    setIsFahrenheitMode(!isFahrenheitMode);
  };

  // const handleChange = (input) => {
  //   const { value } = input.target;
  //   setSearchTerm(value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return toast.error('Please enter a location');
    }
    getWeather(searchTerm);
  };

  const handleLanguage = (event) => {
    changeLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
  };

  const changeLanguage = (value, location) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value) && getWeather(location))
      .catch((err) => console.log(err));
  };

  const getWeather = async (location) => {
    setLoading(true);
    setWeatherData([]);
    let how_to_search =
      typeof location === 'string'
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    const url = 'https://api.openweathermap.org/data/2.5/forecast?';
    try {
      let res = await fetch(
        `${url}${how_to_search}&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
      );
      let data = await res.json();
      if (data.cod !== '200') {
        setNoData('Location Not Found');
        setCity('Unknown Location');
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return;
      }
      setWeatherData(data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setCity(`${data.city.name}, ${data.city.country}`);
      setWeatherIcon(
        `${
          'https://openweathermap.org/img/wn/' + data.list[0].weather[0]['icon']
        }@4x.png`
      );
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
  };

  // For the autocomplete search box- Places List
  const [countries, setCountries] = useState([]);
  const [countryMatch, setCountryMatch] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      let arr = [];
      response.data.forEach((element) => {
        arr.push(element.name.official);
      });
      setCountries(arr);
      console.log(arr);
    };

    loadCountries();
  }, []);

  // console.log(countries);

  const searchCountries = (input) => {
    // const {value}=input.target;
    setSearchTerm(input);

    if (!input.trim()) {
      // created if-else loop for matching countries according to the input
      setCountryMatch([]);
    } else {
      let matches = countries.filter((country) => {
        // eslint-disable-next-line no-template-curly-in-string
        const regex = new RegExp(`${input.trim()}`, 'gi');
        // console.log(regex)
        return country.match(regex) || country.match(regex);
      });
      setCountryMatch(matches);
      setDropdownVisible(true);
    }
    // console.log(countryMatch);
    setSearchValue(input);
  };

  const handleSelection = (selectedCountry) => {
    setSearchValue(selectedCountry);
    setDropdownVisible(false); // Hide the dropdown after selection
    // You can perform search or other actions related to the selected country here
  };

  // load current location weather info on load
  window.addEventListener('load', function () {
    navigator.geolocation.getCurrentPosition(myIP);
  });

  //TO SET THE DARK/LIGHT AUTOMATICALLY AS PER DAY OR NIGHT
  const determineTimeOfDay = () => {
    if (weatherData && weatherData.city) {
      const sunriseTimestamp = weatherData.city.sunrise;
      const sunsetTimestamp = weatherData.city.sunset;
      const timezoneOffset = weatherData.city.timezone;

      // Calculate the current timestamp in seconds since the Unix epoch
      const currentTimestamp = Math.floor(Date.now() / 1000);

      // Calculate the current time in the searched location's timezone
      const currentTime = new Date((currentTimestamp + timezoneOffset) * 1000);

      // Convert Unix timestamps to actual times for sunrise and sunset
      const sunriseTime = new Date(sunriseTimestamp * 1000);
      const sunsetTime = new Date(sunsetTimestamp * 1000);

      // Determine the time of day based on the current time in the searched location
      if (currentTime < sunriseTime || currentTime >= sunsetTime) {
        // Before sunrise or after sunset (night)
        setIsDark(true);
      } else {
        // Between sunrise and sunset (day)
        setIsDark(false);
      }
    }
  };
  useEffect(() => {
    determineTimeOfDay();
    // eslint-disable-next-line
  }, [weatherData]);

  return (
    <div className='container'>
      <div
        className='blur'
        style={{
          background: `${
            weatherData ? BackgroundColor(weatherData) : '#a6ddf0'
          }`,
          top: '-10%',
          right: '0',
        }}
      ></div>
      <div
        className='blur'
        style={{
          background: `${
            weatherData ? BackgroundColor(weatherData) : '#a6ddf0'
          }`,
          top: '36%',
          left: '-6rem',
        }}
      ></div>
      <div className='content'>
        <div
          className='form-container'
          style={{
            backgroundImage: `url(${
              weatherData ? BackgroundImage(weatherData) : LakeBackground
            })`,
          }}
        >
          <div className='name'>
            <Animation />
            <div className='toggle-container'>
              <input
                type='checkbox'
                className='checkbox'
                id='checkbox'
                checked={isDark}
                onChange={toggleDark}
              />
              <label htmlFor='checkbox' className='label'>
                <TbMoon
                  style={{
                    color: '#a6ddf0',
                  }}
                />
                <TbSun
                  style={{
                    color: '#f5c32c',
                  }}
                />
                <div className='ball' />
              </label>
            </div>
            <div className='city'>
              <TbMapSearch />
              <p>{city ?? t('unknown-location')}</p>
            </div>
          </div>
          <div className='search'>
            <h2
              style={{
                marginRight: currentLanguage === 'es' || 'fr' ? '10px' : '0px',
              }}
            >
              {t('title')}
            </h2>

            <hr />

    <form className='form-width' noValidate onSubmit={handleSubmit}>
      <div className='search-bar'>
      <input
        onClick={() => setDropdownVisible(true)}
        placeholder={'Explore cities weather'}
        onChange={(e) => searchCountries(e.target.value)}
        value={searchValue}
        required
        className={isDark ? 'input_search_dark' : 'input_search'}
      />
      {isDropdownVisible && countryMatch.length > 0 && (
        <div className='list-dropdown'>
          {countryMatch.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelection(item)} 
              className='dropdown-item'
            >
              <Card title={`Country: ${item}`} />
            </div>
          ))}
        </div>
      )}
      <button className='s-icon'>
        <TbSearch
          onClick={() => {
            navigator.geolocation.getCurrentPosition(myIP);
          }}
        />
      </button>
      </div>
    </form>

            <button
              className='s-icon sound-toggler'
              onClick={() => setBackgroundSoundEnabled((prev) => !prev)}
            >
              {backgroundSoundEnabled ? <TbVolume /> : <TbVolumeOff />}
            </button>
          </div>
        </div>
        <div className='info-container'>
          <div className='info-inner-container'>
          <select
            className='selected-language'
            defaultValue={currentLanguage}
            onChange={(e) => handleLanguage(e)}
          >
            <option value='en'>English</option>
            <option value='es'>Español</option>
            <option value='fr'>Français</option>
            <option value='id'>Indonesia</option>
            <option value='ta'>தமிழ்</option>
            <option value='zh'>简体中文</option>
            <option value='ukr'>Ukrainian</option>
            <option value='it'>Italiano</option>
            <option value='bn'>Bengali</option>
            <option value='ko'>한국어</option>
            <option value='ptBR'>Português (Brasil)</option>
            <option value='sw'>Kiswahili</option>
            <option value='neNP'>Nepali</option>
            <option value='he'>עברית</option>
            <option value='hnd'>हिन्दी</option>
          </select>

            <div className='toggle-container'>
              <input
                type='checkbox'
                className='checkbox'
                id='fahrenheit-checkbox'
                onChange={toggleFahrenheit}
              />
              <label
                htmlFor='fahrenheit-checkbox'
                className={`label ${
                  isFahrenheitMode ? 'fahrenheit-label' : 'celsius-label'
                }`}
              >
                <RiFahrenheitFill />
                <RiCelsiusFill />
                <div className='ball' />
              </label>
            </div>
          </div>
          {loading ? (
            <div className='loader'></div>
          ) : (
            <span>
              {weatherData.length === 0 ? (
                <div className='nodata'>
                  <h1>{noData ?? t('no-data')}</h1>
                  {noData === 'Location Not Found' ? (
                    <>
                      <img
                        src={Astronaut}
                        alt='an astronaut lost in the space'
                      />
                      <p>Oh oh! We're lost in space finding that place.</p>
                    </>
                  ) : (
                    <>
                      <img
                        src={SearchPlace}
                        alt='a person thinking about what place to find'
                      />
                      <p style={{ padding: '20px' }}>
                        Don't worry, if you don't know what to search for, try:
                        Dhaka, Canada or maybe USA.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <h1 className='centerTextOnMobile'>{t('today')}</h1>
                  <DetailsCard
                    weather_icon={weatherIcon}
                    data={weatherData}
                    soundEnabled={backgroundSoundEnabled}
                    isFahrenheitMode={isFahrenheitMode}
                    degreeSymbol={degreeSymbol}
                  />
                  <h1 className='title centerTextOnMobile'>
                    {t('more-on')} {city ?? t('unknown-location')}
                  </h1>
                  <ul className='summary'>
                    {weatherData.list.map((days, index) => (
                      <SummaryCard
                        key={index}
                        day={days}
                        isFahrenheitMode={isFahrenheitMode}
                        degreeSymbol={degreeSymbol}
                      />
                    ))}
                  </ul>
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
