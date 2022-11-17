import React, { useEffect } from "react"
import styles from './tour.module.css'
import { brokenImage } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";


function Tour(props){
    const {title,tour,naviga,isLoading}=props
    const navigation=useNavigate()
    const handlerBrokenImg = (e) => {
        e.target.src = brokenImage;
      };
    
const click=(e)=>{
    const scroll= document.getElementById('scroll')
     if(e){
        document.documentElement.scrollLeft
        scroll.scrollLeft=scroll.scrollLeft - 100
    }else{
        scroll.scrollLeft=scroll.scrollLeft + 100

}}

useEffect(()=>{
    const scroll= document.getElementById('scroll')
    scroll.addEventListener('scroll',()=>{
        console.log(scroll.scrollLeft)
        scroll.scrollLeft=scroll.scrollLeft + 100
    }
    )
},[])

return(
  <div className={styles.title}>
    <div>
        <h3>{title}</h3>
    </div>
    <div className={styles.position}>
        <div id="scroll" className={styles.container} >
            <button className={styles.button +' '+ styles.after} onClick={()=>click(0)}>{'<'}</button>
            {!isLoading &&
                tour &&
                tour.map((item, id) => (
                <div
                    key={id}
                    className={styles.carouselItem}
                    onClick={() => {}}
                >
                    <div className={styles.img}>
                        <img src={item.thumb} alt={tour.name} onError={handlerBrokenImg} />
                    </div>
                    <div className={styles.content}>
                        <h6>item.name</h6>
                        <ul>
                            <li>{item.journey}</li>
                            <li>{item.days+ ' ngày ' + item.nights +' đêm'}</li>
                            <li>{'Trọn gói:' + item.currentPrice + 'đ'}</li>
                        </ul>
                    </div>
                </div>
                ))}

            {isLoading && (
                <div className={styles.carouselItem + " " + styles.placeholder}></div>
            )}
            <button className={styles.button +' '+ styles.befor} onClick={()=>click(1)}>{'>'}</button>
        </div>
    </div>
    <div className={styles.tourdetail} onClick={()=>navigation(naviga)}>Xem tất cả</div>
  </div>
)
}
export default Tour
