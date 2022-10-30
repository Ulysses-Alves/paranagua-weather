const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-25.57&longitude=-48.52&current_weather=true&hourly=temperature_2m,weathercode,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America/Sao_Paulo';

async function getApiData()
{
    const RESPONSE = await fetch(API_URL);
    const RESPONSE_DATA = await RESPONSE.json();

    let data = new WeatherData(
        RESPONSE_DATA.current_weather.temperature,
        RESPONSE_DATA.current_weather.windspeed,
        RESPONSE_DATA.current_weather.winddirection,
        RESPONSE_DATA.current_weather.weathercode,
        RESPONSE_DATA.current_weather.time,
        RESPONSE_DATA.hourly.relativehumidity_2m,
        RESPONSE_DATA.hourly.time,
        RESPONSE_DATA.hourly.temperature_2m,
        RESPONSE_DATA.hourly.weathercode,
        RESPONSE_DATA.daily.time,
        RESPONSE_DATA.daily.temperature_2m_max,
        RESPONSE_DATA.daily.temperature_2m_min,
        RESPONSE_DATA.daily.weathercode
    )
        getCurrentForcast(data);
        getHourlyForcast(data);
        getDailyForcast(data);
}

function getCurrentForcast(weatherData)
{
    setTempCircleGradient(weatherData);

    document.getElementById("current_temp").innerHTML = weatherData.current_temperature + "°";
    document.getElementById("wind_direction_icon").src = 'img/svg/compass_darker.png';
    rotateCompass(weatherData);
    document.getElementById("wind_direction_text").innerHTML = getWindDirection(weatherData) + " " + weatherData.current_windspeed + "KM/H";
    document.getElementById("current_min_temp").innerHTML = weatherData.daily_temperature_2m_min[0] + "°";
    document.getElementById("current_max_temp").innerHTML = weatherData.daily_temperature_2m_max[0] + "°";

    let wCode = weatherData.current_weathercode;

    if(wCode == 0) document.getElementById("current_weather_icon").src = 'img/svg/weather_clear_sky.png';
    if(wCode == 1 || wCode == 2)  document.getElementById("current_weather_icon").src = 'img/svg/weather_partly_cloudy.png';
    if(wCode == 3 || wCode == 45)  document.getElementById("current_weather_icon").src = 'img/svg/weather_overcast.png';
    if(wCode == 51 || wCode == 53|| wCode == 55)  document.getElementById("current_weather_icon").src = 'img/svg/weather_rain_drizzle.png';
    if(wCode == 61|| wCode == 63 || wCode == 65)  document.getElementById("current_weather_icon").src = 'img/svg/weather_rain.png';
    if(wCode == 80 || wCode == 81 || wCode == 82)  document.getElementById("current_weather_icon").src = 'img/svg/weather_rain_shower.png';
    if(wCode == 95)  document.getElementById("current_weather_icon").src = 'img/svg/weather_thunderstorm.png';

}

function getHourlyForcast(weatherData)
{
    let currentTime = weatherData.current_time;
    let hourlyTime = weatherData.hourly_time;

    let currentIndex = hourlyTime.findIndex(getCurrentIndex => getCurrentIndex == currentTime);

    for(let i = 1; i < 7;i++)
    {
        let wCode = weatherData.hourly_weathercode[currentIndex + i];
        let hTime = weatherData.hourly_time[currentIndex + i];
        let hTemp = weatherData.hourly_temperature_2m[currentIndex + i];

        document.getElementById("forcast_time_hour_" + i).innerHTML = hTime.slice(11,16);
        document.getElementById("temp_hour_" + i).innerHTML = hTemp + "°";

        if(wCode == 0)  document.getElementById("weather_icon_hour_" + i).src = 'img/svg/weather_clear_sky.png';
        if(wCode == 1 || wCode == 2)  document.getElementById("weather_icon_hour_" + i).src = 'img/svg/weather_partly_cloudy.png';
        if(wCode == 3 || wCode == 45)  document.getElementById("weather_icon_hour_" + i).src = 'img/svg/weather_overcast.png';
        if(wCode == 51 || wCode == 53|| wCode == 55)  document.getElementById("weather_icon_hour_" + i).src = 'img/svg/weather_rain_drizzle.png';
        if(wCode == 61|| wCode == 63 || wCode == 65)  document.getElementById("weather_icon_hour_" + i).src = 'img/svg/weather_rain.png';
        if(wCode == 80 || wCode == 81 || wCode == 82)  document.getElementById("weather_icon_hour_" + i).src = 'img/svg/weather_rain_shower.png';
        if(wCode == 95) document.getElementById("weather_icon_hour_" + i).src = 'img/svg/weather_thunderstorm.png';
    }
}

function getDailyForcast(weatherData)
{
    for(let i = 1;i<weatherData.daily_time.length;i++)
    {
        document.getElementById("forcast_time_day_" + i).innerHTML = getWeekDay(weatherData.daily_time[i]);
        document.getElementById("temp_max_day_" + i).innerHTML = weatherData.daily_temperature_2m_max[i] + "°";
        document.getElementById("temp_min_day_" + i).innerHTML = weatherData.daily_temperature_2m_min[i] + "°";

        let wCode = weatherData.daily_weathercode[i];

        if(wCode == 0) document.getElementById("weather_icon_day_" + i).src = 'img/svg/weather_clear_sky.png';
        if(wCode == 1 || wCode == 2)  document.getElementById("weather_icon_day_" + i).src = 'img/svg/weather_partly_cloudy.png';
        if(wCode == 3 || wCode == 45)  document.getElementById("weather_icon_day_" + i).src = 'img/svg/weather_overcast.png';
        if(wCode == 51 || wCode == 53|| wCode == 55)  document.getElementById("weather_icon_day_" + i).src = 'img/svg/weather_rain_drizzle.png';
        if(wCode == 61|| wCode == 63 || wCode == 65)  document.getElementById("weather_icon_day_" + i).src = 'img/svg/weather_rain.png';
        if(wCode == 80 || wCode == 81 || wCode == 82)  document.getElementById("weather_icon_day_" + i).src = 'img/svg/weather_rain_shower.png';
        if(wCode == 95)  document.getElementById("weather_icon_day_" + i).src = 'img/svg/weather_thunderstorm.png';
    }
}

function getWindDirection(weatherData)
{
    let directionInDegrees = weatherData.current_winddirection;

    if(directionInDegrees > 348.75) return "N";
    if(directionInDegrees < 11.25) return "N"; 
    if(directionInDegrees > 11.25 && directionInDegrees < 33.75) return "NNE";
    if(directionInDegrees > 33.75 && directionInDegrees < 56.25) return "NE";
    if(directionInDegrees > 56.25 && directionInDegrees < 78.75) return "ENE";
    if(directionInDegrees > 78.75 && directionInDegrees < 101.25) return "E";
    if(directionInDegrees > 101.25 && directionInDegrees < 123.75) return "ESE";
    if(directionInDegrees > 123.75 && directionInDegrees < 146.25) return "SE";
    if(directionInDegrees > 146.25 && directionInDegrees < 168.75) return "SSE";
    if(directionInDegrees > 168.75 && directionInDegrees < 191.25) return "S";
    if(directionInDegrees > 191.25 && directionInDegrees < 213.75) return "SSW";
    if(directionInDegrees > 213.75 && directionInDegrees < 236.25) return "SW";
    if(directionInDegrees > 236.25 && directionInDegrees < 258.75) return "WSW";
    if(directionInDegrees > 258.75 && directionInDegrees < 281.25) return "W";
    if(directionInDegrees > 281.25 && directionInDegrees < 303.75) return "WNW";
    if(directionInDegrees > 303.75 && directionInDegrees < 326.25) return "NW";
    if(directionInDegrees > 326.25 && directionInDegrees < 348.75) return "NNW";
}

function rotateCompass(weatherData)
{
    let windDirec = weatherData.current_winddirection;
    document.getElementById("wind_direction_icon").setAttribute('style', 'transform: rotateZ(' + windDirec + 'deg);');
}

function getWeekDay(date)
{    
    let day = parseInt(date.slice(8,10));
    let month = parseInt(date.slice(5,7));
    let year = parseInt(date.slice(2,4));
    let dayOfTheWeek;

    let monthCodes = [0,3,3,6,1,4,6,2,5,0,3,5];
    let yearCode = (year + (year / 4)) % 7;

    if(year % 4 == 0 )
    {
        if(month == 1 || month == 2)
        {
        dayOfTheWeek = (day + monthCodes[month-1] + 6 + yearCode - 1) % 7;
        }
    }
    else
    {
        dayOfTheWeek = (day + monthCodes[month-1] + 6 + yearCode) % 7;
    }

    switch(Math.floor(dayOfTheWeek))
    {
        case 0:
            return "Dom";
            break;
        case 1:
            return "Seg";
            break;
        case 2:
            return "Ter";
            break;
        case 3: 
            return "Qua";
            break;
        case 4:
            return "Qui";
            break;
        case 5:
            return "Sex";
            break;
        case 6:
            return "Sab";
    }
}
function setTempCircleGradient(weatherData)
{
    let currentTemp = weatherData.current_temperature;

    if(currentTemp >= 25) 
    {
        document.getElementById("current_temp_circle").style.background = "linear-gradient(rgb(236, 90, 52), rgb(253, 132, 59))";
        document.getElementById("current_temp").style.color = "rgb(232, 104, 43)";
    }
    if(currentTemp < 25 && currentTemp >= 20)
    {
        document.getElementById("current_temp_circle").style.background = "linear-gradient(rgb(207, 150, 23), rgb(190, 170, 38))";
        document.getElementById("current_temp").style.color = "rgb(199, 160, 29)";
    }
    if(currentTemp < 20)
    {
        document.getElementById("current_temp_circle").style.background = "linear-gradient(rgb(162, 195, 78), rgb(141, 210, 110))";
        document.getElementById("current_temp").style.color = "rgb(152, 203, 93)"
    }
}
getApiData();