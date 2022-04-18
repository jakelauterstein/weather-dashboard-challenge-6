// Get global variables and dom elements
const submitBtn = document.getElementById('city-submit-btn');
const searchFormEl = document.getElementById('search-form');
const userSearch = document.getElementById('user-search');
const apiKey = 'a727a7b4e3ac0945e7318901d9d0c745';
const previousSearches = document.getElementById('previous-searches')


function save() {
    var newData = document.getElementById('user-search').value
    if(localStorage.getItem('city') == null){
    localStorage.setItem('city', '[]');
}

// get old data and add to new data
var oldData = JSON.parse(localStorage.getItem('city'));
oldData.push(newData);

// save the old and new data to local storage

localStorage.setItem('city', JSON.stringify(oldData));

}



// const cities = JSON.parse(localStorage.getItem("cities"))  ||  [];

// const addCities = (citySearch) => {
//    cities.push({ 
//  	citySearch
// })

// localStorage.setItem("cities", JSON.stringify(cities))

// return {citySearch}

// }

// const createButtonElement = (city) => {
// 	const cityButton = document.createElement('button')
// 	cityButton.innerText = city;
// 	cityButton.appendChild(previousSearches);
// 	cityButton.classList.add("btn");
// } 

// //	cityButton.classList.add("btn");

// 	cities.forEach(createButtonElement)

//     // get and set 5 day forecast info

let getForecastInfo = function (event) {
    
    const fiveDayCityDisplay = document.getElementById('five-day-city')
    fiveDayCityDisplay.innerHTML = userSearch.value

    event.preventDefault();

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+userSearch.value+'&units=imperial&appid=' + apiKey)
    .then(response => response.json())
    .then(data =>{
        for(i = 0; i < 5; i++) {
            document.getElementById('day' + (i+1) + 'temp').innerHTML = "Temp: " + Number(data.list[i].main.temp).toFixed(0) + "°";
            document.getElementById('day' + (i+1) + 'wind').innerHTML = "Wind: " + Number(data.list[i].wind.speed).toFixed(0) + "mph";
            document.getElementById('day' + (i+1) + 'hum').innerHTML = "Hum: " + Number(data.list[i].main.humidity).toFixed(0) + "%";
            document.getElementById('icon-' + (i+1)).src = "http://openweathermap.org/img/wn/"+
            data.list[i].weather[0].icon+".png";
            +".png";

            }
        });
}

    // get and set current weather info

let getcurrentInfo = function (event) {

    // add previous search to button display

    previousSearches.innerText = userSearch.value;
   
    const cityName = document.getElementById('city-name');
    cityName.innerHTML = userSearch.value;
    event.preventDefault();

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+userSearch.value+'&units=imperial&appid=' + apiKey)
    .then(response => response.json())
    .then(data => {
        for(i = 0; i < 5; i++) {
            document.getElementById('single-day-temp').innerHTML = "Temp: " + Number(data.main.temp).toFixed(0) + "°";
            document.getElementById('single-day-wind').innerHTML = "Wind: " + Number(data.wind.speed).toFixed(0) + "mph";
            document.getElementById('single-day-hum').innerHTML = "Hum: " + Number(data.main.humidity).toFixed(0) + "%";
            document.getElementById('single-day-icon-1').src = "http://openweathermap.org/img/wn/"+
            data.weather[0].icon+".png";
        }

        var latitude = Number(data.coord.lon).toFixed(2);
        var longitude = Number(data.coord.lat).toFixed(2);

        getUV(latitude, longitude)
});
}

function getUV(lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)

    
    .then(response => response.json())
    .then(data => {
        document.getElementById('single-day-UV').innerHTML = "UV Index: " + Number(data.current.uvi);
    })
};
    // set dates

let importDates = function () {
    let currentDate = document.getElementById('single-day-current');
    currentDate.innerText = moment().format("dddd, MMMM Do YYYY");
    var myCurrentDate=new Date();
    var myFutureDate=new Date(myCurrentDate);
    for (let i = 0; i < 5; i++) {
        document.getElementById('date-' + (i+1)).innerText=moment().add((i+1), 'd').format("dddd, MMMM Do YYYY");

    }
}

// api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}

submitBtn.addEventListener('click', getForecastInfo)
submitBtn.addEventListener('click', getcurrentInfo)
submitBtn.addEventListener('click', importDates)

// submitBtn.addEventListener('click', save) 

// searchFormEl.onsubmit = (e) => {
// 	e.preventDefault();

// 	//const newCity = addCities(userSearch.value);

// 	createButtonElement(newCity)

// 		//userSearch.value = "";
	
// }



// function save () {
//     const key = "search";
//     const value = userSearch.value;
//     console.log(key);
//     console.log(value);

//     if(city) {
//         localStorage.setItem(key, value)
//     } else {
//         alert("You must enter a city name!")
//     }

//     for (let i = 0; i < localStorage.length; i++) {
//         const savedKey = localStorage.value(i);
//         const savedValue = localStorage.getItem(savedKey);   

//         previousSearches.innerHTML += `${savedKey}: ${savedValue}<br />`;
//     }
// }