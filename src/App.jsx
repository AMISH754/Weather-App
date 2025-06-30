import { useState } from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import axios from "axios";
import Loading from './components/Loading';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from "./components/Footer";
import BeforeSearch from './components/BeforeSearch';


function App() {
  const [isCity,setIsCity]=useState(false);
  const [weather,setWeather]=useState(null);
const [loading,setLoading]=useState(false);
const [error,setError]=useState("");


const API_KEY=import.meta.env.VITE_API_KEY; //include .env in the same root as package.json and vite.config.js
const API_URL="https://api.openweathermap.org/data/2.5/weather";
let city;
async  function fetchWeather(city){
  


  try{
    setIsCity(true);
    setError("");
    setLoading(true);
    const url=`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
    const response=await axios.get(url);
    console.log(response.data);
    console.log(response.data.weather[0].main);
    setWeather(response.data);
  }
  catch(error){
    if(error.response && error.response.status===404){
      setError("City not found try again");
      
}else{
  setError("An error ha occurred ,please try again");
   
}
setWeather(null);
  }
  finally{
    setLoading(false);
  }
                                   
    }

  return (
<div >
  <Navbar onWeather={fetchWeather} />
  { !isCity&& <BeforeSearch/> }
  {loading && <Loading/>}
  {error && <ErrorDisplay errorMessage={error}/>}
 {weather && !loading && <Body weather={weather} />  }
 <Footer/>
</div>
  );
}

export default App;
