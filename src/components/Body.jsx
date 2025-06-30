import React,{useState} from "react";





function Body(props) {
 const iconCode = props.weather.weather[0].icon;
const imageUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
 console.log(props.weather.name);

 return (   <div className="flex min-h-screen justify-center items-center bg-[url('/bus.jpg')] bg-cover bg-center text-white text-4xl">
  <div className="bg-[url('https://www.transparenttextures.com/patterns/brick-wall-dark.png')] rounded-2xl opacity-120 w-lg h-[480px] sm:h-[420px] border-2  transition-shadow duration-300 ease-in-out shadow-md hover:shadow-2xl shadow-pink-300   border-pink-500">
    <div  >
      <h1 className="text-center font-extrabold text-[#F564A9] mb-4">Weather Detail</h1>
      <div>       
      <h2 className="text-center text-[#EBD6FB] font-bold">{props.weather.name},{props.weather.sys.country}</h2>
      <div className="flex  justify-center items-center ">
      < img src={imageUrl} alt={props.weather.weather[0].description} />
      <p className="text-4xl text-[#EBD6FB] font-bold">{Math.round(props.weather.main.temp)}°C</p>
      </div>
      <p className="text-2xl text-[#EBD6FB] text-center">{props.weather.weather[0].description}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 mb-4">
        <div className=" text-[#EBD6FB]  text-center">
          <p  className="text-2xl text-center">Feels like : </p>
          <p className="text-2xl text-center">{props.weather.main.feels_like}°C</p>
        </div>
        <div className=" text-[#EBD6FB]  text-center">
          <p  className="text-2xl">Pressure : </p>
          <p className="text-2xl">{props.weather.main.pressure}hPa</p>
        </div>
        <div className="text-[#EBD6FB] text-center" >
          <p  className="text-2xl">Max temp : </p>
          <p className="text-2xl">{props.weather.main.temp_max}°C</p>
        </div>
        <div className="text-[#EBD6FB] text-center" >
          <p  className="text-2xl">Min temp : </p>
          <p className="text-2xl">{props.weather.main.temp_min}°C</p>
        </div>
        <div className="text-[#EBD6FB] text-center" >
          <p  className="text-2xl">Humidity : </p>
          <p className="text-2xl">{props.weather.main.humidity}%</p>
        </div>
        <div className="text-[#EBD6FB] text-center" >
          <p  className="text-2xl">Wind speed : </p>
          <p className="text-2xl">{Math.round(props.weather.wind.speed)}m/s</p>
        </div>
        
      </div>
      </div>
  </div>
    </div>
 );
}
export default Body;