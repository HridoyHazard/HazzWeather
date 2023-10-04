import React from 'react';

function MoreInfoCard({ data }) {
    const { formattedData, degreeSymbol, main, clouds, t } = data;

    const averageTemp = (formattedData.temp_min + formattedData.temp_max) / 2;

    return (
        <div className='more-info'>
            <p className=''>
                {t('realFeel')}:{' '}
                <span>
                    {formattedData.feels_like}
                    {degreeSymbol}
                </span>
            </p>
            <p className=''>
                {t('humidity')}: <span>{main.humidity}%</span>
            </p>
            <p className=''>
                {t('cover')}: <span>{clouds.all}%</span>
            </p>
            <p className=''>
                {t('min-temp')}:{' '}
                <span>
                    {formattedData.temp_min}
                    {degreeSymbol}
                </span>
            </p>
            <p className=''>
                {t('max-temp')}:{' '}
                <span>
                    {formattedData.temp_max}
                    {degreeSymbol}
                </span>
            </p>
            <p className=''>
                {t('avg-temp')}:{' '}
                <span>
                    {averageTemp}
                    {degreeSymbol}
                </span>
            </p>
        </div>
    );
}

export default MoreInfoCard;
