import React,{useState} from "react";
import weathericon from "../assets/static/weatherIcon.svg"
function Navbar(props){
    const [cityName,setCityName]=useState("");
 
    function handleChange(event){
        var name=event.target.value;
        setCityName(name);
    }
    function handleSubmit(event){
    event.preventDefault();
     props.onWeather(cityName.trim());
    }

    return ( <div className="bg-gray-800 shadow-2xl justify-center shadow-gray-900 flex flex-col sm:justify-around sm:flex-row ">
        <div className="flex mx-6 flex-wrap  sm:mb-0 ">
            <img src={weathericon} alt="weather-app-icon" />
            <p className="my-8 text-3xl   text-pink-600 font-serif font-bold">VortexCast</p>
        </div>
        <ul className="flex flex-wrap mx-6 mb-4 text-white text-lg sm:my-9 sm:mx-10 ">
            <li className="mx-3 hover:text-pink-300 cursor-pointer transition-colors duration-200">Home</li>
        </ul>
        <form onSubmit={handleSubmit} className="flex mx-6  sm:my-8  ">
        <div >
        <input className="flex-1 px-4 py-2 outline-none rounded-l-lg focus:ring-2 focus:ring-pink-600 border border-transparent focus:border-pink-600 transition-all duration-200 bg-gray-700 text-white placeholder-gray-400 " type="text" palceholder="Search city" autoFocus="off" value={cityName} onChange={handleChange}/>
        <button type="submit" className="bg-pink-600 hover:bg-pink-500 rounded-r-lg text-white px-5 py-2 font-semibold shadow-md transition-colors duration-220 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-600">Search</button>
        </div>
        </form>
    </div> );

}
export default Navbar;