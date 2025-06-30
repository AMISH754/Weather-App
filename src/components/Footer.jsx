import React from "react"
import bus from "../../public/bus.jpg"
function Footer (){
return (
        <div className="bg-gray-800 shadow-2xl py-5 justify-center shadow-gray-900 flex flex-col sm:justify-around sm:flex-row " > 
        <footer > 
            <div className="border-b  border-white">
        <ul className="  flex justify-center text-lg text-center mb-6 " > 
        <li ><a href="/" className="text-white mx-3 hover:text-pink-300 cursor-pointer transition-colors duration-200 ">Home</a></li> 
        </ul> 
        </div>
        <br className="border-2 "></br>
        <p className="text-white text-center text-lg" >© { new Date().getFullYear()} Copyright reserved , Amish Kumar Dubey</p> 
         </footer>  
         </div>
);
}
export default Footer;