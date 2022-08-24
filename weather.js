const day_Component = document.querySelectorAll(".day-component")
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
const city = document.querySelector("#city");

const main_param = document.querySelector(".main-param");


let obj;

const getLatLong = (location) =>{
    switch(location){
        case `Chennai`:
            return {lat:13.0827,lon:80.2707}
        case `Mumbai`:
            return {lat:19.0760,lon:72.8777}
        case `Pune`:
            return {lat:18.5204,lon:73.8567}
        case `Delhi`:
            return {lat:28.7041,lon:77.1025}
    }
}

city.addEventListener("change", (event)=>{
    obj = getLatLong(event.target.value);
    getWeatherData();
    
})



const getWeatherData = () =>{
    console.log(obj);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${obj.lat}&longitude=${obj.lon}&timezone=IST&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&current_weather=true`)
          .then((response) => response.json())
          .then((data) => {console.log(data);
            showWeatherData(data);
        });
          
}



const showWeatherData = (weatherData) => {
    const {time, temperature_2m_max: temp_max, temperature_2m_min: temp_min, precipitation_sum:precipitation, windspeed_10m_max:windspeed, weathercode:weathercode} = weatherData.daily;
    const {temperature_2m_max:degree, precipitation_sum:rain, windspeed_10m_max:kmph} = weatherData.daily_units;
    const {temperature:current_temp, windspeed:current_windspeed, weathercode:weather_code} = weatherData.current_weather;
    current_temperature.textContent = `${current_temp}${degree}`;
    wind.textContent = `Windspeed:${current_windspeed}${kmph}`;
    console.log(weathercode);
    getDisplayWeatherIcon(main_param, weather_code);
    
        
    

    // currentIcon.classList.add()
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
            precipitation_list[i].textContent += `${precipitation[i]} ${rain}`;
            windSpeed[i].textContent += `${windspeed[i]} ${kmph}`;
            console.log(weathercode[i]);
            getDisplayWeatherIcon(day_Component[i], weathercode[i]);
            
        }
    }
 
const getDisplayWeatherIcon = (element, wcode)=>{

    switch(wcode){
        case 1:
        case 2:
        case 3:
            console.log(element)
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-cloud fa-2x"></i>`)
            break;
        
        case  0:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-sun-bright fa-2x"></i>`)
            break;
        
        case 45:
        case 48:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-bolt fa-2x"></i>`)
            break;
        
        case 51:
        case 53:
        case 55:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-cloud-showers fa-2x"></i>`)
            break;
        case 56:
        case 57:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-cloud-sleet fa-2x"></i>`)
            break;
        case 61:
        case 63:
        case 65:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-cloud-showers-heavy fa-2x"></i>`)
            break;
        case 66:
        case 67:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-snowflake fa-2x"></i>`)
            break;
        case 71:
        case 73:
        case 75:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-sparkle fa-2x"></i>`)
            break;
        case 77:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-bolt fa-2x"></i>`)
            break;
        case 80:
        case 81:
        case 82:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-sun fa-2x"></i>`)
            break;
        
           
        case 85:
        case 86:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-bolt-lightning fa-2x"></i>`)
            break;
        case 95:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-bolt fa-2x"></i>`)
            break;
        case 96:
        case 99:
            element.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-sun fa-2x"></i>`)
            break;
        
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




