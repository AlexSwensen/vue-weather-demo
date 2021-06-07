import { DateTime } from "luxon";
import fetch from "cross-fetch";
// DateTime.fromMillis().toFormat("DDD");

interface IWeatherDataResponse {
  list: IWeatherListObj[];
}

export interface IWeatherListObj {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  dt_txt: string;
  date: string;
}

export interface IShownWeatherData {
  date: string;
  chance_of_rain: string;
  temp_low: string;
  temp_high: string;
}

export class WeatherService {
  private static APIKey = "b1b15e88fa797225412429c1c50c122a1";
  static async hourlyQuery(zip: string): Promise<IShownWeatherData[]> {
    const queryURL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?zip=${zip}&units=imperial&appid=${WeatherService.APIKey}`;
    const data = await fetch(queryURL);
    return this._uniqueDayResults(await data.json());
  }

  private static _uniqueDayResults(originalData: IWeatherDataResponse) {
    const data = { ...originalData };
    const list = data.list.map((entry) => {
      entry.date = entry.dt_txt.split(" ")[0];
      return entry;
    });

    const dailyData: { [key: string]: IWeatherListObj[] } = {};

    list.forEach((entry) => {
      if (dailyData[entry.date]) {
        dailyData[entry.date].push(entry);
      } else {
        dailyData[entry.date] = [];
        dailyData[entry.date].push(entry);
      }
    });
    const correctedData = this._GetCorrectTemp(dailyData);

    const shownData = this._getShownData(correctedData);

    return shownData;
  }

  private static _getShownData(data: {
    [key: string]: IWeatherListObj;
  }): IShownWeatherData[] {
    const returnData: IShownWeatherData[] = [];
    Object.keys(data).forEach((key) => {
      returnData.push({
        date: data[key].date,
        chance_of_rain: `${data[key].pop * 100}%`,
        temp_low: `${data[key].main.temp_min} °F`,
        temp_high: `${data[key].main.temp_max} °F`,
      } as IShownWeatherData);
    });
    return returnData;
  }

  private static _GetCorrectTemp(data: { [key: string]: IWeatherListObj[] }): {
    [key: string]: IWeatherListObj;
  } {
    const newData = { ...data };
    const correctedWeatherData: { [key: string]: IWeatherListObj } = {};
    Object.keys(newData).forEach((key) => {
      newData[key].forEach((entry) => {
        if (!correctedWeatherData[key]) {
          correctedWeatherData[key] = entry;
        }
        if (correctedWeatherData[key].main.temp_max <= entry.main.temp_max) {
          correctedWeatherData[key].main.temp_max = entry.main.temp_max;
        }
        if (correctedWeatherData[key].main.temp_min >= entry.main.temp_min) {
          correctedWeatherData[key].main.temp_min = entry.main.temp_min;
        }
      });
    });
    return correctedWeatherData;
  }
}
