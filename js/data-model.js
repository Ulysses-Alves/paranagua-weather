class WeatherData
{
    constructor(
        current_temperature,
        current_windspeed,
        current_winddirection,
        current_weathercode,
        current_time = "",
        hourly_relativehumidity_2m = [],
        hourly_time = "",
        hourly_temperature_2m = [],
        hourly_weathercode = [],
        daily_time = [],
        daily_temperature_2m_max = [],
        daily_temperature_2m_min = [],
        daily_weathercode = []
        )
    {
        this.current_temperature = current_temperature;
        this.current_windspeed = current_windspeed;
        this.current_winddirection = current_winddirection;
        this.current_weathercode = current_weathercode;
        this.current_time = current_time;
        this.hourly_relativehumidity_2m = hourly_relativehumidity_2m;
        this.hourly_time = hourly_time;
        this.hourly_temperature_2m = hourly_temperature_2m;
        this.hourly_weathercode = hourly_weathercode;
        this.daily_time = daily_time;
        this.daily_temperature_2m_max = daily_temperature_2m_max;
        this.daily_temperature_2m_min = daily_temperature_2m_min;
        this.daily_weathercode = daily_weathercode;
    }
}