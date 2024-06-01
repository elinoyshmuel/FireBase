

//just need to generate your unique and obtain the unique ApiKey from OpenWeatherMap website. 
// And replace your api key in-line : 33 , into openWeatherMapKey constant and its done .


async function fetchInfo() {
    const cityInput = document.getElementById('cityInput').value.trim();
    if (!cityInput) {
        alert('Please enter a city name');
        return;
    }

    const locationIQKey = 'pk.87be29ebca62ca28ee09a5d55678699f';
    const encodedCity = encodeURIComponent(cityInput);
    const geoUrl = `https://us1.locationiq.com/v1/search.php?key=${locationIQKey}&q=${encodedCity}&format=json`;

    try {
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        if (geoData.error || geoData.length === 0) {
            alert('Failed to retrieve location data');
            return;
        }
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        // ensure you have a valid OpenWeatherMap API key
        const openWeatherMapKey = 'your_openweathermap_api_key'; // replace this with your actual OpenWeatherMap API key
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherMapKey}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        if (!weatherResponse.ok) {
            throw new Error(`Weather API responded with ${weatherResponse.status}: ${weatherData.message}`);
        }

        document.getElementById('weatherReport').innerHTML = `
        <h2>Weather in ${cityInput}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Weather: ${weatherData.weather[0].main}</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>`;

        const sunUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
        const sunResponse = await fetch(sunUrl);
        const sunData = await sunResponse.json();
        if (!sunResponse.ok) {
            throw new Error(`Sunrise-Sunset API responded with ${sunResponse.status}`);
        }

        document.getElementById('sunInfo').innerHTML = `
        <h2>Sunrise and Sunset Times</h2>
        <p>Sunrise: ${new Date(sunData.results.sunrise).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(sunData.results.sunset).toLocaleTimeString()}</p>`;
    } catch (error) {
        console.error('Failed to fetch information:', error);
        alert('Failed to fetch information. Check the console for details.');
    }
}
