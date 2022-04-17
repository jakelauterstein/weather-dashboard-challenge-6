const submitBtn = document.getElementById('city-submit')
const searchFormEl = document.getElementById('search-form')
const userSearch = document.getElementById('user-search');
const apiKey = 'a727a7b4e3ac0945e7318901d9d0c745'


var getInfo = function (event) {
    
    const cityName = document.getElementById('city-name')
    const fiveDayCityDisplay = document.getElementById('five-day-city')
    cityName.innerHTML = userSearch.value
    fiveDayCityDisplay.innerHTML = userSearch.value

    event.preventDefault();


fetch('https://api.openweathermap.org/data/2.5/forecast?q='+userSearch.value+'&units=imperial&appid=' + apiKey)
.then(response => response.json())
.then(data =>{
    for(i = 0; i < 5; i++) {
        document.getElementById('day' + (i+1) + 'temp').innerHTML = "Temp:" + Number(data.list[i+3].main.temp).toFixed(0) + "°";
        document.getElementById('day' + (i+1) + 'wind').innerHTML = "Wind:" + Number(data.list[i+3].wind.speed).toFixed(0) + "mph";
        document.getElementById('day' + (i+1) + 'hum').innerHTML = "Hum:" + Number(data.list[i].main.humidity).toFixed(0) + "%";
        document.getElementById('icon-' + (i+1)).innerHTML = "Hum:" + Number(data.list[i+1].weather.icon);

    }
});
}
submitBtn.addEventListener('click', getInfo)

// current weather API call



