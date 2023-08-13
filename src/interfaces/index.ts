export interface weatherInfoInterface {
    temperature: number;
    wind: number;
    pressure: number;
    moisture: number;
    dew: number;
    visibility: number;
    city: string;
    country: string;
}

export interface countryInterface {
    id: string;
    city: string;
    country: string;
    lat: number;
    lon: number;
}

export interface responseGeo {
    name: string;
    'local_names': { [key: string]: string };
    lat: number;
    lon: number;
    country: string;
    state: string;
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Main {
    temp: number;
    'feels_like': number;
    'temp_min': number;
    'temp_max': number;
    pressure: number;
    humidity: number;
    'sea_level': number;
    'grnd_level': number;
}

export interface Rain {
    "1h": number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface responseWeather {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    rain: Rain;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

