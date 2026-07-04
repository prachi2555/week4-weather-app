class WeatherUI {
    constructor() {
        this.unit = "C";

        this.weatherBox = document.getElementById("weatherBox");
        this.forecastBox = document.getElementById("forecastBox");
        this.cityTitle = document.getElementById("cityTitle");
    }

    toggleUnit() {
        this.unit = this.unit === "C" ? "F" : "C";
        return this.unit;
    }

    convertTemp(temp) {
        return this.unit === "C"
            ? Math.round(temp)
            : Math.round((temp * 9/5) + 32);
    }

    showLoading() {
        this.weatherBox.innerHTML = "Loading...";
        this.forecastBox.innerHTML = "";
    }

    showError(msg) {
        this.weatherBox.innerHTML = `<p>${msg}</p>`;
    }

    renderCurrent(data) {
        this.cityTitle.innerText = `${data.name}, ${data.sys.country}`;

        this.weatherBox.innerHTML = `
            <div class="card">
                <h2>${this.convertTemp(data.main.temp)}°${this.unit}</h2>
                <p>${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            </div>
        `;
    }

    renderForecast(data) {
        const daily = data.list.filter((_, i) => i % 8 === 0);

        this.forecastBox.innerHTML = daily.map(day => {
            const date = new Date(day.dt * 1000);

            return `
                <div class="forecast-card">
                    <h4>${date.toDateString()}</h4>
                    <p>${this.convertTemp(day.main.temp)}°${this.unit}</p>
                    <p>${day.weather[0].main}</p>
                </div>
            `;
        }).join("");
    }
}