import { useEffect, useMemo, useState } from 'react';
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
  const [active, setActive] = useState(false);
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

  const activate = () => {
    setActive(true);
  };

  useEffect(() => {
    if (currentLanguage === 'en') return;

    changeLanguage(currentLanguage);

    // eslint-disable-next-line
  }, [currentLanguage]);

  const toggleFahrenheit = () => {
    setIsFahrenheitMode(!isFahrenheitMode);
  };

  const handleChange = (input) => {
    const { value } = input.target;
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  // load current location weather info on load
  window.addEventListener('load', function () {
    navigator.geolocation.getCurrentPosition(myIP);
  });
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
            <form className='search-bar' noValidate onSubmit={handleSubmit}>
              <input
                type='text'
                name=''
                id=''
                onClick={activate}
                placeholder={active ? '' : 'Explore cities weather'}
                onChange={handleChange}
                required
              />
              <button className='s-icon'>
                <TbSearch
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(myIP);
                  }}
                />
              </button>
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
              <option selected value='en'>
                English
              </option>
              <option value='es'>Español</option>
              <option value='fr'>Français</option>
              <option value='id'>Indonesia</option>
              <option value='ta'>தமிழ்</option>
              <option value='zh'>简体中文</option>
              <option value='ukr'>Ukrainian</option>
              <option value='es'>{t('languages.es')}</option>
              <option value='fr'>{t('languages.fr')}</option>
              <option value='id'>{t('languages.id')}</option>
              <option value='it'>{t('languages.it')}</option>
              <option value='ta'>{t('languages.ta')}</option>
              <option value='bn'>{t('languages.bn')}</option>
              <option value='zh'>{t('languages.zh')}</option>
              <option value='ptBR'>{t('languages.ptBR')}</option>
              <option value='sw'>{t('languages.sw')}</option>
              <option value='neNP'>{t('languages.neNP')}</option>
              <option value='he'>{t('languages.he')}</option>
              <option value='hnd'>{t('languages.hnd')}</option>
            </select>
            <div className='toggle-container'>
              <input
                type='checkbox'
                className='checkbox'
                id='fahrenheit-checkbox'
                onChange={toggleFahrenheit}
              />
              <label htmlFor='fahrenheit-checkbox' className='label'>
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
