import React from "react"
function Loading(){
return (   
    <div className="min-h-screen flex justify-center bg-[url('/bus.jpg')] bg-cover bg-center items-center">
  <div className="  bg-[url('https://www.transparenttextures.com/patterns/brick-wall-dark.png')] rounded-2xl opacity-120 w-lg h-[420px] border-2 shadow-md shadow-pink-300   border-pink-500">
    <div  >
      <h1 className="text-center text-4xl font-extrabold text-[#F564A9] mb-4">Weather Detail</h1>
      <p className="text-[#EBD6FB] font-semibold text-2xl text-center">Loading...</p>
      </div>
      </div>
      </div>
);
}
export default Loading;