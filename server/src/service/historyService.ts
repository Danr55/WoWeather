// import fs from 'fs/promises'; // Use promises version of fs
// import path from 'path';

// // TODO: Define a City class with name and id properties
// class City {
//   id: string;
//   name: string;

//   constructor(id: string, name: string) {
//     this.id = id;
//     this.name = name;
//   }
// }
// // TODO: Complete the HistoryService class
// class HistoryService {
//   private filePath: string;

//   constructor() {
//     this.filePath = path.join(__dirname, 'searchHistory.json');
//   }
//   // TODO: Define a read method that reads from the searchHistory.json file
//   private async read(): Promise<City[]>{
//     try {
//       const data = await fs.readFile(this.filePath, 'utf-8');
//       return JSON.parse(data);
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   }
//   // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
//   private async write(cities: City[]): Promise<void> {
//     try {
//       await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
//   async getCities(): Promise<City[]> {
//     return await this.read();
//   }
//   // TODO Define an addCity method that adds a city to the searchHistory.json file
//   async addCity(city: string): Promise<void> {
//     const cities = await this.getCities();
//     const newCity = new City((cities.length + 1).toString(), city);
//     cities.push(newCity);
//     await this.write(cities);
//   }
//   // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
//   async removeCity(id: string): Promise<void> {
//     const cities = await this.getCities();
//     const updatedCities = cities.filter(city => city.id !== id);
//     await this.write(updatedCities);
//   }
// }

// export default new HistoryService();

import fs from 'fs/promises';

class City {
  constructor(public id: string, public name: string) {}
}

class HistoryService {
  private filePath: string;

  constructor() {
    this.filePath = './db/searchHistory.json';
  }

  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }

  async getCities(): Promise<City[]> {
    return this.read();
  }

  async addCity(cityName: string) {
    const cities = await this.getCities();
    const newId = (Math.max(...cities.map(c => parseInt(c.id)), 0) + 1).toString();
    const newCity = new City(newId, cityName);
    cities.push(newCity);
    await this.write(cities);
  }

  async removeCity(id: string) {
    const cities = await this.getCities();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();