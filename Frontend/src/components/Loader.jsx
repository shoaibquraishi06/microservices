import React from 'react'
import "../style/loader.css"
import Logo from "../assets/nikeSvg.svg"
const Loader = () => {
  return (
       <div className="intro-loader">
      
      <svg viewBox="0 0 900 400" className="nike-svg">
        <path
          className="nike-path"
          d="M120 255 C145 175,210 110,260 70 C225 135,220 195,255 235 C300 285,390 270,520 230 C650 190,760 150,865 95 C760 155,660 215,540 275 C430 330,315 365,220 350 C145 337,105 305,120 255 Z"
        />
      </svg>
      <div className="progress"><span></span></div>
    </div>
  )
}

export default Loader
