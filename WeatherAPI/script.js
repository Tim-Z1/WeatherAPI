let result;
let destination;

let locationInput = document.querySelector('#location-input');
let submitBtn = document.querySelector('#submit-btn');
let HTMLBody = document.querySelector('body');
let weatherDataContainer = document.querySelector('.weather-data-container');
let toggleFCBtn = document.querySelector('#toggleFC');

function getDayFromDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dateObject = new Date(date);
    return days[dateObject.getDay()];
} 

function convertFarenheitToCelsius(F) {
    //note: rounding to nearest whole number, can change to decimals if necessary
    return Math.round( (F - 32) * 5 / 9 );
}

//current task to work on next: clean up the code, i was able to get async function working, there is old code that uses .then and stuff like that which i dont need anymore

//note about async functions that i found out: running a function that is declared outside the async function will not follow the await feature, it seems to run the function immediately and not wait for fetch data to be retrieved *see note 2:
submitBtn.addEventListener('click', async () => {
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput.value}?key=H9AE4P4A3CCXQ59FW9XNW6TUZ`);
        let weatherData = await response.json();

        //filters weatherData into an object with only the data I need to use (when i tried wrapping this in a self invoking function it didnt work for me)
        let weatherDataArray = weatherData.days.map (item => { 
            return {date: item.datetime, day: getDayFromDate(item.datetime), temperatureF: item.temp, temperatureC: convertFarenheitToCelsius(item.temp)}  
        });

        //*note 2: for example, this function was originally declared outside the async function but trying to run it that way caused it to run before fetching weather data was finished
        (function displayWeatherDataToHTML() {
            (function clearHTMLWeatherData(){
                weatherDataContainer.textContent = '';
            })();

            for (const arrItem of weatherDataArray) {
                const newDiv = document.createElement('div');
                newDiv.textContent = `Date: ${arrItem.date} || Day: ${arrItem.day} || Temp: ${arrItem.temperatureC}C`;
                weatherDataContainer.appendChild(newDiv);
            }
        })()

});



function getWeatherData() {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput.value}?key=H9AE4P4A3CCXQ59FW9XNW6TUZ`)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      result = response.days;
      console.log(response);
      console.log('destination: ' + response.resolvedAddress);
      let weatherDataArray = result.map (item => {
          return { 
            date: item.datetime, day: getDayFromDate(item.datetime), temperatureF: item.temp, 
            temperatureC: convertFarenheitToCelsius(item.temp)
          };  
      });
      console.log(weatherDataArray);
      return weatherDataArray;
    })
    .catch(function(err) {
        // Error :(
        console.log(err);
    });
}
//current task: use async/await to first get fetch weatherAPI data, place it in an array -> then take that array data and display it on the HTML




/* to do: 
1. add 'days' based on date (done)
2. have a button that toggles between displaying F and C temperatures
3. add a function that clears the weather data being currently displayed (done)
4. add an event listener so that when 'Enter/Return' button on keyboard is pressed, it also acts as if submit btn was clicked
*/

//overall task to work on now: Display the (weather) information on your webpage!



/* --Completed Task Log--
-task:  (DONE) Set up a form that will let users input their location and will fetch the weather info (still just console.log() it)
-task: (DONE) take the response array object and filter it to return an array only with the data I need i.e. datetime and temp for each item   --DONE: used map array method to return an object for every arr item

 */