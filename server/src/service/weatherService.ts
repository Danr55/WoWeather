import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  current: any; 
  forecast: any[]; 

  constructor(current: any, forecast: any[]) {
    this.current = current;
    this.forecast = forecast;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey: string = process.env.API_KEY || '';
  private cityName: string;
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.apiKey}`);
    const data = await response.json();
    return this.destructureLocationData(data);
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.coord.lat,
      lon: locationData.coord.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${city}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates>{
    const locationData = await this.fetchLocationData(city);
    return locationData;
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    const data = await response.json();
    return data;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const currentWeather = {
      city: response.city.name,
      date: new Date().toLocaleDateString(),
      icon: response.list[0].weather[0].icon,
      description: response.list[0].weather[0].description,
      temperature: response.list[0].main.temp,
      humidity: response.list[0].main.humidity,
      windSpeed: response.list[0].wind.speed,
    };
    const forecastData = this.buildForecastArray(response.list);
    return new Weather(currentWeather, forecastData);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): any[] {
    return weatherData.map(item => {
      return {
        date: new Date(item.dt_txt).toLocaleDateString(),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        temperature: item.main.temp,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
      };
    });
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();
