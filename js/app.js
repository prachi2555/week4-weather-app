const weatherService = new WeatherService();
const ui = new WeatherUI();

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const toggleBtn = document.getElementById("toggleUnit");
const favList = document.getElementById("favList");

async function loadWeather(city) {
    try {
        ui.showLoading();

        const current = await weatherService.getCurrentWeather(city);
        const forecast = await weatherService.getForecast(city);

        ui.renderCurrent(current);
        ui.renderForecast(forecast);

        Storage.saveLastCity(city);

        renderFavorites(city);

    } catch (err) {
        ui.showError(err.message);
    }
}

// SEARCH
searchBtn.addEventListener("click", () => {
    loadWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        loadWeather(searchInput.value);
    }
});

// TOGGLE °C / °F
toggleBtn.addEventListener("click", () => {
    const unit = ui.toggleUnit();
    toggleBtn.innerText = `Switch to °${unit === "C" ? "F" : "C"}`;

    const city = Storage.getLastCity() || CONFIG.DEFAULT_CITY;
    loadWeather(city);
});

// FAVORITES RENDER
function renderFavorites() {
    const favs = Storage.getFavorites();

    favList.innerHTML = "";

    favs.forEach(city => {
        const div = document.createElement("div");
        div.className = "fav-item";
        div.innerText = city;

        div.onclick = () => loadWeather(city);

        favList.appendChild(div);
    });
}

// ADD / REMOVE FAVORITE BUTTON
function setupFavoriteButton(city) {
    const weatherBox = document.getElementById("weatherBox");

    const btn = document.createElement("button");

    if (Storage.isFavorite(city)) {
        btn.innerText = "❌ Remove Favorite";
    } else {
        btn.innerText = "⭐ Add Favorite";
    }

    btn.onclick = () => {
        if (Storage.isFavorite(city)) {
            Storage.removeFavorite(city);
        } else {
            Storage.saveFavorite(city);
        }

        loadWeather(city);
    };

    weatherBox.appendChild(btn);
}

// AUTO LOAD LAST CITY
window.addEventListener("load", () => {
    const city = Storage.getLastCity() || CONFIG.DEFAULT_CITY;
    loadWeather(city);
});