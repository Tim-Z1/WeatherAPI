let locationInput = document.querySelector('#location-input');
let submitBtn = document.querySelector('#submit-btn');
let HTMLBody = document.querySelector('body');
let weatherDataContainer = document.querySelector('.weather-data-container');
// let toggleTemperatureTypeBtn = document.querySelector('#toggleFC');
let weatherDataContent = document.querySelector('.weather-data-content');

function getDayFromDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dateObject = new Date(date);
    return days[dateObject.getDay()];
} 

function convertFarenheitToCelsius(F) {
    //note: rounding to nearest whole number, can change to decimals if necessary
    return Math.round( (F - 32) * 5 / 9 );
}

//current task to work: display weather data in more visually appealing, user-friendly manner, like cards

//note about async functions that i found out: running a function that is declared outside the async function will not follow the await feature, it seems to run the function immediately and not wait for fetch data to be retrieved *see note 2:
submitBtn.addEventListener('click', async () => {
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput.value}?key=H9AE4P4A3CCXQ59FW9XNW6TUZ`);
        let weatherData = await response.json();
        console.log(weatherData);

        //filters weatherData into an object with only the data I need to use (when i tried wrapping this in a self invoking function it didnt work for me)
        let weatherDataArray = weatherData.days.map (item => { 
            return {date: item.datetime, day: getDayFromDate(item.datetime), temperatureF: item.temp, temperatureC: convertFarenheitToCelsius(item.temp), conditions: item.conditions}  
        });

        //*note 2: for example, this function was originally declared outside the async function but trying to run it that way caused it to run before fetching weather data was finished
        (function displayWeatherDataToHTML() {
            (function clearHTMLWeatherData(){
                weatherDataContainer.textContent = '';
            })();

            for (const arrItem of weatherDataArray) {
                const newDiv = document.createElement('div');
                newDiv.innerHTML = `
                    <p> Date: ${arrItem.date} </p> 
                    <p> Day: ${arrItem.day} </p> 
                    <p> Temp: ${arrItem.temperatureC}C </p> 
                    <p> Conditions: ${arrItem.conditions} </p>
                `;                
                weatherDataContainer.appendChild(newDiv);
            }
        })()

});

toggleTemperatureTypeBtn.addEventListener('click', () => {

});


/* to do: 
1. have the weather data displayed in a more visually appealing user friendly manner, like cards
2. add an event listener so that when 'Enter/Return' button on keyboard is pressed, it also acts as if submit btn was clicked

optional:
1. have a button that toggles between displaying F and C temperatures

*/

//overall task to work on now: Display the (weather) information on your webpage!




/* --Completed Task Log--
-task: add a function that clears the weather data being currently displayed (done)
-task: add 'days' based on date (done)
-task:  (DONE) Set up a form that will let users input their location and will fetch the weather info (still just console.log() it)
-task: (DONE) take the response array object and filter it to return an array only with the data I need i.e. datetime and temp for each item   --DONE: used map array method to return an object for every arr item
-task: (DONE) implemented async/await to fetch weather data array and use that array to display weather data on the HTML accordingly
 */