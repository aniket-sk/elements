let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let maxTemp = document.getElementById("maxTempValue");
let minTemp = document.getElementById("minTempValue");
let humidityValue = document.getElementById("humidityValue");
let windValue = document.getElementById("windValue");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

var objToday = new Date(),
  weekday = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ),
  dayOfWeek = weekday[objToday.getDay()],
  domEnder = (function () {
    var a = objToday;
    if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
    a = parseInt((a + "").charAt(1));
    return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
  })(),
  dayOfMonth =
    today + (objToday.getDate() < 10)
      ? "0" + objToday.getDate() + domEnder
      : objToday.getDate() + domEnder,
  months = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ),
  curMonth = months[objToday.getMonth()],
  curYear = objToday.getFullYear(),
  curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
var today =
  "<h2 id='day'>" +
  dayOfWeek +
  "</h2> <div id='date'>" +
  dayOfMonth +
  " " +
  curMonth +
  " " +
  curYear +
  "</div>";

document.getElementById("today").innerHTML = today;

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a8d5cdfac404f7db284945943fad0d5`,

      { mode: "cors" }
    );

    const weatherData = await response.json();
    console.log(weatherData);
    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { id, main } = weatherData.weather[0];
    const { temp_max } = weatherData.main;
    const { temp_min } = weatherData.main;
    const { humidity } = weatherData.main;
    const { speed } = weatherData.wind;
    loc.textContent = name;
    climate.textContent = main;
    tempvalue.textContent = Math.round(feels_like - 273);
    maxTemp.textContent = Math.round(temp_max - 273);
    minTemp.textContent = Math.round(temp_min - 273);
    humidityValue.textContent = Math.round(humidity);
    windValue.textContent = Math.round(3.6 * speed);
    if (id < 300 && id >= 200) {
      tempicon.src = "http://openweathermap.org/img/wn/11d@2x.png";
    } else if (id >= 300 && id < 400) {
      tempicon.src = "http://openweathermap.org/img/wn/09d@2x.png";
    } else if (id >= 500 && id < 600) {
      tempicon.src = "http://openweathermap.org/img/wn/10d@2x.png";
    } else if (id >= 600 && id < 700) {
      tempicon.src = "http://openweathermap.org/img/wn/13d@2x.png";
    } else if (id >= 700 && id < 800) {
      tempicon.src = "http://openweathermap.org/img/wn/50d@2x.png";
    } else if (id == 800) {
      tempicon.src = " http://openweathermap.org/img/wn/01d@2x.png";
    } else if (id == 801) {
      tempicon.src = " http://openweathermap.org/img/wn/02d@2x.png";
    } else if (id == 802) {
      tempicon.src = " http://openweathermap.org/img/wn/03d@2x.png";
    } else if (id == 803) {
      tempicon.src = " http://openweathermap.org/img/wn/04d@2x.png";
    } else if (id == 804) {
      tempicon.src = " http://openweathermap.org/img/wn/04d@2x.png";
    }
  } catch (error) {
    alert("city not found");
  }
};

window.addEventListener("load", () => {
  let long = 0;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0a8d5cdfac404f7db284945943fad0d5`;

      fetch(api)
        .then((response) => {
          mode: "cors";
          return response.json();
        })

        .then((data) => {
          setTimeout(function () {
            $(".loader-wrapper").fadeOut("medium");
          }, 1000);
          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];
          const { temp_max } = data.main;
          const { temp_min } = data.main;
          const { humidity } = data.main;
          const { speed } = data.wind;
          loc.textContent = name;
          climate.textContent = main;
          tempvalue.textContent = Math.round(feels_like - 273);
          maxTemp.textContent = Math.round(temp_max - 273);
          minTemp.textContent = Math.round(temp_min - 273);
          humidityValue.textContent = Math.round(humidity);
          windValue.textContent = Math.round(3.6 * speed);
          if (id < 300 && id >= 200) {
            tempicon.src = "http://openweathermap.org/img/wn/11d@2x.png";
          } else if (id >= 300 && id < 400) {
            tempicon.src = "http://openweathermap.org/img/wn/09d@2x.png";
          } else if (id >= 500 && id < 600) {
            tempicon.src = "http://openweathermap.org/img/wn/10d@2x.png";
          } else if (id >= 600 && id < 700) {
            tempicon.src = "http://openweathermap.org/img/wn/13d@2x.png";
          } else if (id >= 700 && id < 800) {
            tempicon.src = "http://openweathermap.org/img/wn/50d@2x.png";
          } else if (id == 800) {
            tempicon.src = " http://openweathermap.org/img/wn/01d@2x.png";
          } else if (id == 801) {
            tempicon.src = " http://openweathermap.org/img/wn/02d@2x.png";
          } else if (id == 802) {
            tempicon.src = " http://openweathermap.org/img/wn/03d@2x.png";
          } else if (id == 803) {
            tempicon.src = " http://openweathermap.org/img/wn/04d@2x.png";
          } else if (id == 804) {
            tempicon.src = " http://openweathermap.org/img/wn/04d@2x.png";
          }
          console.log(data);
        });
    });
  }
});
