import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = () => {
  const currentWeather = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 72,
    windSpeed: 12,
    location: "Dhaka, Bangladesh",
    icon: "CloudSun"
  };

  const forecast = [
    { day: "Today", high: 32, low: 24, condition: "Sunny", icon: "Sun" },
    { day: "Tomorrow", high: 30, low: 22, condition: "Cloudy", icon: "Cloud" },
    { day: "Wed", high: 29, low: 21, condition: "Rain", icon: "CloudRain" },
    { day: "Thu", high: 31, low: 23, condition: "Sunny", icon: "Sun" },
    { day: "Fri", high: 28, low: 20, condition: "Storm", icon: "CloudLightning" },
    { day: "Sat", high: 33, low: 25, condition: "Sunny", icon: "Sun" },
    { day: "Sun", high: 30, low: 22, condition: "Cloudy", icon: "Cloud" }
  ];

  return (
    <div className="bg-gradient-to-br from-sky-blue/20 to-primary/10 rounded-organic p-6 shadow-natural">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-poppins font-semibold text-lg text-primary">Weather Today</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <Icon name="MapPin" size={14} className="mr-1" />
            {currentWeather?.location}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{currentWeather?.temperature}°C</div>
          <div className="text-sm text-muted-foreground">{currentWeather?.condition}</div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-6">
        <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center">
          <Icon name={currentWeather?.icon} size={40} className="text-primary" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/30 rounded-organic p-3 text-center">
          <Icon name="Droplets" size={20} className="text-primary mx-auto mb-1" />
          <div className="text-sm font-medium">{currentWeather?.humidity}%</div>
          <div className="text-xs text-muted-foreground">Humidity</div>
        </div>
        <div className="bg-white/30 rounded-organic p-3 text-center">
          <Icon name="Wind" size={20} className="text-primary mx-auto mb-1" />
          <div className="text-sm font-medium">{currentWeather?.windSpeed} km/h</div>
          <div className="text-xs text-muted-foreground">Wind Speed</div>
        </div>
      </div>
      <div>
        <h4 className="font-poppins font-medium text-sm mb-3 text-primary">7-Day Forecast</h4>
        <div className="space-y-2">
          {forecast?.map((day, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-3 bg-white/20 rounded-organic-sm">
              <div className="flex items-center space-x-3">
                <Icon name={day?.icon} size={16} className="text-primary" />
                <span className="text-sm font-medium">{day?.day}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium">{day?.high}°</span>
                <span className="text-muted-foreground">{day?.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;