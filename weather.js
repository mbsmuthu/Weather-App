
const day_week = document.querySelectorAll(".day")
const current_temperature = document.querySelector("#current-temp-param");
const wind = document.querySelector("#wind-param");
const day_time = document.querySelector("#day-time");
const current_weather = document.querySelector("#current-weather");
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const dayOftheWeek = document.querySelectorAll(".day");
const maximum_temp = document.querySelectorAll(".max-temp");
const minimum_temp = document.querySelectorAll(".min-temp");
const precipitation_list = document.querySelectorAll(".precip");
const windSpeed = document.querySelectorAll(".wind-speed");
const temp_comp = document.querySelector(".temp-component");
const precip_comp = document.querySelector(".precip-component");
const wind_comp = document.querySelector(".wind-component");


const lat = 12.921680;
const lon = 80.113831;



const getWeatherData = () =>{
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=IST&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&current_weather=true`)
          .then((response) => response.json())
          .then((data) => {console.log(data);
            showWeatherData(data);
        });
          
}
getWeatherData();


const showWeatherData = (weatherData) => {
    const {time, temperature_2m_max: temp_max, temperature_2m_min: temp_min, precipitation_sum:precipitation, windspeed_10m_max:windspeed} = weatherData.daily;
    const {temperature_2m_max:degree, precipitation_sum:rain, windspeed_10m_max:kmph} = weatherData.daily_units;
    const {temperature:current_temp, windspeed:current_windspeed} = weatherData.current_weather;
    current_temperature.textContent = `${current_temp}${degree}`;
    wind.textContent = `Windspeed:${current_windspeed}${kmph}`;
        const date=new Date();

        const hours = date.getHours();
        const minutes = date.getMinutes(); 
        const today = weekday[date.getDay()];
        day_time.textContent = `${today}, ${hours}:${minutes}`;
        // console.log([...maximum_temp], [...minimum_temp]);
        for(let i=0;i<7;i++){
            maximum_temp[i].textContent += `${temp_max[i]}${degree}`;
            minimum_temp[i].textContent += `${temp_min[i]}${degree}`;
            day_week[i].textContent += `${time[i]}`;
            precipitation_list[i].textContent += `${precipitation[i]}${rain}`;
            windSpeed[i].textContent += `${windspeed[i]}${kmph}`;
        }
   
 }

precip_comp.addEventListener("click", ()=>{
    document.querySelectorAll(".max-min-temp").forEach(temp=>{
        temp.style.display="none";
    })
    precipitation_list.forEach(precip=>{
        precip.style.display="block";
})
    windSpeed.forEach(wind=>{
        wind.style.display="none";
})
})

wind_comp.addEventListener("click", ()=>{
    document.querySelectorAll(".max-min-temp").forEach(temp=>{
        temp.style.display="none";
    })
    precipitation_list.forEach(precip=>{
        precip.style.display="none";
})
    windSpeed.forEach(windspeed=>{
        windspeed.style.display="block";
})
})

temp_comp.addEventListener("click", ()=>{
    document.querySelectorAll(".max-min-temp").forEach(temp=>{
        temp.style.display="block";
    })
    precipitation_list.forEach(precip=>{
        precip.style.display="none";
})
    windSpeed.forEach(wind=>{
        wind.style.display="none";
})
})



