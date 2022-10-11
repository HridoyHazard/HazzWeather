import moment from 'moment'
import '../css/SummaryCard.css'
import React, { useMemo } from 'react'
import convertToFahrenheit from '../helpers/convertToFahrenheit'


function SummaryCard({ day, isFahrenheitMode, degreeSymbol }) {
  const day_icon = `${'https://openweathermap.org/img/wn/' + day.weather[0]["icon"]}@2x.png`

	const formattedTemp = useMemo(() => Math.round(isFahrenheitMode ? convertToFahrenheit(day.main.temp) : day.main.temp), [day.main.temp, isFahrenheitMode])

  return (
    <li className="summary-items">
      <div>
        <p className="">{formattedTemp}{degreeSymbol}</p>
        <p className="">
          {day.weather[0].main}
          <img src={day_icon} alt="" />
        </p>
        <p className="">{day.weather[0].description}</p>
        <p className="">{moment(day.dt_txt).format('hh:mm a')}</p>
      </div>
    </li>
  )
}

export default SummaryCard