const submitBtn = document.getElementById('city-submit');
const searchFormEl = document.getElementById('search-form');
const userSearch = document.getElementById('user-search');
const apiKey = 'a727a7b4e3ac0945e7318901d9d0c745';


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

let getcurrentInfo = function (event) {

    const cityName = document.getElementById('city-name');
    cityName.innerHTML = userSearch.value;
    event.preventDefault();

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+userSearch.value+'&units=imperial&appid=' + apiKey)
    .then(response => response.json())
    .then(data =>{
    for(i = 0; i < 5; i++) {
        document.getElementById('single-day-temp').innerHTML = "Temp: " + Number(data.main.temp).toFixed(0) + "°";
        document.getElementById('single-day-wind').innerHTML = "Wind: " + Number(data.wind.speed).toFixed(0) + "mph";
        document.getElementById('single-day-hum').innerHTML = "Hum: " + Number(data.main.humidity).toFixed(0) + "%";
        document.getElementById('single-day-icon-1').src = "http://openweathermap.org/img/wn/"+
        data.weather[0].icon+".png";
    }
});
}

let importDates = function () {
    let currentDate = document.getElementById('single-day-current');
    currentDate.innerText = moment().format("dddd, MMMM Do YYYY");
    var myCurrentDate=new Date();
    var myFutureDate=new Date(myCurrentDate);
    for (let i = 0; i < 5; i++) {
        document.getElementById('date-' + (i+1)).innerText=moment().add((i+1), 'd').format("dddd, MMMM Do YYYY");

    }
    
}



submitBtn.addEventListener('click', getForecastInfo)
submitBtn.addEventListener('click', getcurrentInfo)
submitBtn.addEventListener('click', importDates)



// current weather API call



