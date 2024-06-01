async function fetchWeather() {
  const cityName = document.getElementById("cityName").value.trim();
  const weatherInfoDiv = document.getElementById("weatherInfo").value;
  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }
  try {
    const response = await fetch(
      `https://goweather.herokuapp.com/weather/${cityName}`
    );
    if (!response.ok) {
      throw new Error("Weather information for this city could not be found.");
    }

    const data = await response.json();

    weatherInfoDiv.innerHTML = "";
    weatherInfoDiv.innerHTML = `Temperature: ${data.temperature}
            Wind: ${data.wind}
             Description: ${data.description}
            `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherInfoDiv.textContent = error.message;
  }
}

async function fetchForecast() {
  const cityName = document.getElementById("cityName").value.trim();
  const weatherInfoDiv = document.getElementById("weatherInfoDiv");
  // Check if the user has entered a city name
  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(
      `https://goweather.herokuapp.com/weather/${cityName}`
    );

    if (!response.ok) {
      throw new Error("Forecast information for this city could not be found.");
    }

    const data = await response.json();

    weatherInfoDiv.innerHTML = "<h3>3-Day Forecast</h3>";

    // Assuming data.forecast is an array of forecasts for the next three days
    for (let day of data.forecast) {
      weatherInfoDiv.innerHTML += `
        <div>
                        <strong>Day:</strong> ${day.day}<br>
                        <strong>Temperature:</strong> ${day.temperature}<br>
                        <strong>Wind:</strong> ${day.wind}<br>
                    </div>
                    <hr>`;
    }
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    weatherInfoDiv.textContent =
      "Error fetching forecast data: " + error.message;
  }
}

// fetch(`https://goweather.herokuapp.com/weather/london`).then(res=>res.json()).then(data=>console.log(`${JSON.stringify(data)}`)).catch(err=>console.log(`${err}`))
