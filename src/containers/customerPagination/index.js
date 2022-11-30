import { useEffect, useState } from 'react';
import './pagination.css'
import {chevronLeft,chevronRight}from '../../assets/svgs'
export default function CustomPagination({total,pagenumber,callback}) {
    const [state,setState]=useState(pagenumber)

    useEffect(() => {
        if(state!==pagenumber){
            callback(state)
        }
        
    }, [state])
    
    useEffect(()=>{
        const left= document.getElementById("chevronLeft");
        const right = document.getElementById("chevronRight");

        if(pagenumber==1){
           left.classList.add("color__button__disable");
        //    left.setAttribute("disabled", "");
           right.classList.remove("color__button__disable");
        //    right.removeAttribute("disabled", "");
        }
        if(pagenumber>1 && pagenumber<total){
            right.classList.remove("color__button__disable");
            // right.removeAttribute("disabled", "");
            left.classList.remove("color__button__disable");
            // left.removeAttribute("disabled", "");
        }
        if(pagenumber==total){
            right.classList.add("color__button__disable");
            // right.setAttribute("disabled", "");
            left.classList.remove("color__button__disable");
            // left.removeAttribute("disabled", "");
        }
    },[pagenumber])
    return (
      <div className="container__pagination">
        {/* <div className="pagination"> */}
          <button className='button__number'>{pagenumber}</button>
          <span>{"  of " + total +' '}</span>
          <button id="chevronLeft" type='button' onClick={() =>pagenumber>1&& setState(state - 1)}>
            {" "}
            {chevronRight}{" "}
          </button>
          <button id="chevronRight" type='button' onClick={() =>pagenumber<total&& setState(state + 1)}>
            {" "}
            {chevronLeft}{" "}
          </button>
        {/* </div> */}
      </div>
    );
}
