class Storage {

    static getFavorites() {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    }

    static saveFavorite(city) {
        let fav = Storage.getFavorites();
        if (!fav.includes(city)) fav.push(city);
        localStorage.setItem("favorites", JSON.stringify(fav));
    }

    static removeFavorite(city) {
        let fav = Storage.getFavorites();
        fav = fav.filter(c => c !== city);
        localStorage.setItem("favorites", JSON.stringify(fav));
    }

    static isFavorite(city) {
        return Storage.getFavorites().includes(city);
    }

    static saveLastCity(city) {
        localStorage.setItem("lastCity", city);
    }

    static getLastCity() {
        return localStorage.getItem("lastCity");
    }
}