// Get global variables and dom elements
const formEl = document.getElementById('search-form');
const submitBtn = document.getElementById('city-submit-btn');
const apiKey = 'a727a7b4e3ac0945e7318901d9d0c745';
const previousSearches = document.getElementById('previous-searches');
const previousSearchContainer = document.getElementById('previous-search-container');
var cityIdCounter = 0;

var cities = [];

var cityFormHandler = function(event) {
    event.preventDefault();
    var cityNameInput = document.querySelector("input[name='city-name']").value;
    // check if input values are empty strings
      if (!cityNameInput) {
      alert("You need to enter a city!");
      return false;
    }
    formEl.reset();

      var cityDataObj = {
        name: cityNameInput,
        
      };
    createCityBtn(cityDataObj);
    getCurrentInfo(cityDataObj);
    getForecastInfo(cityDataObj);
    importDates();
};

var createCityBtn = function(cityDataObj) {
    // create button
    var cityBtnEl = document.createElement("button");
    cityBtnEl.className = "city-btn btn";

    // add city id as a custom attribute
    cityBtnEl.setAttribute("data-city-id", cityIdCounter)

    // add text to btn
    cityBtnEl.innerHTML = cityDataObj.name ;
    
    previousSearchContainer.appendChild(cityBtnEl)

    cityDataObj.id = cityIdCounter;

    cities.push(cityDataObj);

    saveCities();

    // increase task counter for next unique id
    cityIdCounter++;
}
var cityButtonHandler = function(event) {
    console.log(event.target);
    // get target element from event
    var targetEl = event.target;
    // btn was clicked
    if(event.target.matches(".city-btn")) {
      var cityId = targetEl.getAttribute("data-city-id");
      editSearch(cityId);
    }

  };

  var editSearch = function(cityId){
    // get button element
    var buttonSelected = document.querySelector(".city-btn[data-city-id='" + cityId + "']");
    console.log(buttonSelected);
    // get content from city name
    var cityName = buttonSelected.textContent
    console.log(cityName);

    cityName = {
        name: cityName
    }
    getCurrentInfo(cityName);
    getForecastInfo(cityName);

    saveCities();

    // document.querySelector("input[name='city-name']").value = cityName;
    // // document.querySelector("#save-task").textContent = "Update Task";

    // formEl.setAttribute("data-task-id", cityId);
  }

    // get and set current weather info
    let getCurrentInfo = function (cityDataObj) {
    
        const cityName = document.getElementById('city-name');
        cityName.innerHTML = cityDataObj.name;
    
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityDataObj.name+'&units=imperial&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {
            for(i = 0; i < 5; i++) {
                document.getElementById('single-day-temp').innerHTML = "Temp: " + Number(data.main.temp).toFixed(0) + "°F";
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

// get and set 5 day forecast info
let getForecastInfo = function (cityDataObj) {
    
    const fiveDayCityDisplay = document.getElementById('five-day-city')
    fiveDayCityDisplay.innerHTML = cityDataObj.name

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+cityDataObj.name+'&units=imperial&appid=' + apiKey)
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

var saveCities = function() {
  localStorage.setItem("cities", JSON.stringify(cities));
};

var loadCities = function() {
  var savedCities = localStorage.getItem("cities");
  // if there are no tasks, set tasks to an empty array and return out of the function
  if (!savedCities) {
    return false;
  }
  console.log("Saved cities found!");
  // else, load up saved tasks

  // parse into array of objects
  savedCities = JSON.parse(savedCities);

  // loop through savedTasks array
  for (var i = 0; i < savedCities.length; i++) {
    // pass each task object into the `createTaskEl()` function
    createCityBtn(savedCities[i]);
  }
};


formEl.addEventListener("submit", cityFormHandler);
previousSearchContainer.addEventListener("click", cityButtonHandler);


// submitBtn.addEventListener('click', getForecastInfo)
// submitBtn.addEventListener('click', getcurrentInfo)
// submitBtn.addEventListener('click', importDates)

loadCities();







// OLD CODE BELOW DISREGARD //

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

// function save(event) {
//     event.preventDefault();
//     var newData = document.getElementById('user-search').value
//     console.log(newData);
//     if(localStorage.getItem('city') == null){
//     localStorage.setItem('city', '[]');
// }
//     // get old data and add to new data
//     var oldData = JSON.parse(localStorage.getItem('city'));
//     oldData.push(newData);
//     console.log(oldData);

//     // save the old and new data to local storage
//     localStorage.setItem('city', JSON.stringify(oldData));

//     for( let iter = 0; iter < 5; iter++) {
//         document.getElementById('searchhistory' + (iter+1)).innerHTML = JSON.parse(localStorage.getItem('city'));

//     }
// }

//     // check if city is new or one being re-searched by seeing if it has a data-task-id attribute
//     var isSearchAgain = formEl.hasAttribute('data-city-id');
//     // if form has data attribute, get city id and call function to complete process
//     if (isSearchAgain) {
//       var cityId = formEl.getAttribute('data-city-id');
//       completeSearch(cityNameInput, cityId);
//     }
//     // no data attribute, so create object as normal and pass to createCityBtn function
//     else {
//       var cityDataObj = {
//         name: cityNameInput,
        
//       };
//     createCityBtn(cityDataObj);

//     }
// };