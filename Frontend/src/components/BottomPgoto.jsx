import React from 'react'
import TrendImage from "../assets/nikeshoes4.avif"
import TrendImage2 from "../assets/nikeshoes2.avif"
import TrendImage3 from "../assets/poster2.png"
import "../style/BottomPage.css"

const BottomPgoto = () => {
  return (
   <>
    <h2 className='Trend-heading'>Tending Now</h2>
     <section className='Trend-container'>
       
        <div className="trend-top">
          <img src={TrendImage3} alt="" srcset="" />

           {/* <div className="trend-text">
            <h2>New from nike sportwear</h2>
            <h4>REACT PRESTO</h4>
            <p>With React foam the most <br />comfortable presto ever</p>
            <button>Shop</button>
             
           </div> */}

        </div>

       {/* <div className="trend-bottom">

      <div className="trending-img-top">
      <img loading='lazy' src={TrendImage} alt="" />

           <div className="bottom-text1">
           <p> Summer Must-Haves: Air Max Dia</p>
            </div>   
   
     </div>

           <div className="trending-img-bottom">
             <img loading='lazy' src={TrendImage2} alt="" />
              <div className="bottom-text2">
           <p> Summer Must-Haves: Air Max Dia</p>
            </div>   
   
           </div>
</div> */}

     </section>
   
   
   </>
  )
}

export default BottomPgoto
