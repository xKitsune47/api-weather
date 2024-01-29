function cityToCoords() {
    const city = document.querySelector("#cityInput").value;
    if (city) {
        const cityObject = fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86bc285aa7ac048811dadbcdc94b4aa4&units=${unit}`
        )
            .then((result) => result.json())
            .then((output) => {
                const description = output.weather.map((p) => p.main);
                const windDirection = calculateWindDirection(output.wind.deg);
                document.querySelector(
                    "#temperature"
                ).innerHTML = `Current temperature:<br> ${output.main.temp} ${unitsObject.temp}`;
                document.querySelector("#city").innerHTML = output.name;
                document.querySelector(
                    "#clouds"
                ).innerHTML = `Current cloudiness:<br> ${output.clouds.all}%`;
                document.querySelector(
                    "#temperatureFeelsLike"
                ).innerHTML = `Current felt temperature:<br> ${output.main.feels_like} ${unitsObject.temp}`;
                document.querySelector(
                    "#mainWeatherConditions"
                ).innerHTML = `Current conditions:<br> ${description}`;
                document.querySelector(
                    "#windSpeed"
                ).innerHTML = `Current wind speed:<br> ${output.wind.speed} ${unitsObject.windSpeed}`;
                document.querySelector(
                    "#windDirection"
                ).innerHTML = `Current wind direction:<br> ${windDirection}`;
            })
            .catch(
                (error) =>
                    (document.querySelector("#city").innerHTML =
                        "Wrong city name, try again")
            );
    }
}

function calculateWindDirection(degrees) {
    if (degrees > 337.5 || degrees < 22.5) {
        return "N";
    } else if (degrees > 22.5 && degrees < 67.5) {
        return "NE";
    } else if (degrees > 67.5 && degrees < 112.5) {
        return "E";
    } else if (degrees > 112.5 && degrees < 157.5) {
        return "SE";
    } else if (degrees > 157.5 && degrees < 202.5) {
        return "S";
    } else if (degrees > 202.5 && degrees < 247.5) {
        return "SW";
    } else if (degrees > 247.5 && degrees < 292.5) {
        return "W";
    } else if (degrees > 292.5 && degrees < 337.5) {
        return "NW";
    } else {
        return `The foxes couldn't calculate the wind direction :(`;
    }
}

let unit = "metric";
const unitsObject = {
    temp: "°C",
    windSpeed: "m/s",
};
function changeUnits() {
    if (unit === "metric") {
        unit = "imperial";
        document.querySelector("#units").innerHTML = "Change to metric";
        unitsObject.temp = "°F";
        unitsObject.windSpeed = "mph";
    } else {
        unit = "metric";
        document.querySelector("#units").innerHTML = "Change to imperial";
        unitsObject.temp = "°C";
        unitsObject.windSpeed = "m/s";
    }
}
