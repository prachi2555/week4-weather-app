class WeatherService {
    constructor() {
        this.baseUrl = CONFIG.BASE_URL;
        this.apiKey = CONFIG.API_KEY;
        this.cache = new Map();
        this.cacheTime = 10 * 60 * 1000;
    }

    async getCurrentWeather(city) {
        const url = `${this.baseUrl}/weather?q=${city}&units=metric&appid=${this.apiKey}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("City not found");

        return await res.json();
    }

    async getForecast(city) {
        const url = `${this.baseUrl}/forecast?q=${city}&units=metric&appid=${this.apiKey}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("Forecast error");

        return await res.json();
    }
}