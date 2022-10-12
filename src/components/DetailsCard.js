import React, { useMemo } from 'react';
import moment from 'moment';
import '../css/DetailsCard.css';
import BackgroundSound from './BackgroundSound';
import { useTranslation } from 'react-i18next';
import convertToFahrenheit from '../helpers/convertToFahrenheit'

function DetailsCard({ weather_icon, data, soundEnabled, isFahrenheitMode, degreeSymbol }) {
	const { clouds, main, weather } = data.list[0];
	const { t } = useTranslation();

	const formattedData = useMemo(() => {
		return {
			temp: Math.round(isFahrenheitMode ? convertToFahrenheit(main.temp) : main.temp),
			feels_like: Math.round(isFahrenheitMode ? convertToFahrenheit(main.feels_like) : main.feels_like),
			temp_min: Math.round(isFahrenheitMode ? convertToFahrenheit(main.temp_min) : main.temp_min),
			temp_max: Math.round(isFahrenheitMode ? convertToFahrenheit(main.temp_max) : main.temp_max),
		};
	}, [isFahrenheitMode, main.feels_like, main.temp, main.temp_max, main.temp_min])

	return (
		<div className='details'>
			<div className='clouds'>
				<p className='celsius'>{formattedData.temp}{degreeSymbol}</p>
				<div className='cloud-icon'>
					{weather[0].main}
					<img src={weather_icon} className='' alt='' />
				</div>
				<p className='des'>
					<span>{weather[0].description}</span>
				</p>
				<p className='time'>
					<span>{moment().format('dddd MMM YYYY')}</span>
				</p>
			</div>
			<div className='more-info'>
				<p className=''>
					{t('RealFeel')}: <span>{formattedData.feels_like}{degreeSymbol}</span>
				</p>
				<p className=''>
					{t('humidity')}: <span>{main.humidity}%</span>
				</p>
				<p className=''>
					{t('cover')}: <span>{clouds.all}%</span>
				</p>
				<p className=''>
					{t('min-temp')}: <span>{formattedData.temp_min}{degreeSymbol}</span>
				</p>
				<p className=''>
					{t('max-temp')}: <span>{formattedData.temp_max}{degreeSymbol}</span>
				</p>
			</div>
			<BackgroundSound weather={weather[0]} soundEnabled={soundEnabled} />
		</div>
	);
}

export default DetailsCard;
