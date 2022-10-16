import React from 'react';
import moment from 'moment';


function CloudsCard({ data }) {

    const { formattedData, degreeSymbol, weather, weather_icon } = data;

    return (
        <div className='clouds'>
            <p className='celsius'>
                {formattedData.temp}
                {degreeSymbol}
            </p>
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
    )
}

export default CloudsCard;