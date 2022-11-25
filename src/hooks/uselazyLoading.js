import { useMemo } from 'react';
import {placeholder} from '../assets/images/index'

export function loadingImg(img){
  const lazzy=img.getAttribute('lazy')
console.log('lazy')
  if(lazzy){
    img.setAttribute('src',lazzy)
    img.removeAttribute('lazy')
  }
  
  
}
export default function useLazyLoading(loading){
  async function intersectionHandler ({ intersectionRatio, target }) {
    if (intersectionRatio > 0) {
      observer.unobserve(target)
    }
   }
  const observer =useMemo(()=>
  new IntersectionObserver((entry) =>entry.forEach(item=>{
      console.log('item',item)
         
      if(item.isIntersecting){
        loading(item.target)
        intersectionHandler(item.target)
      }
    })
  ),[])
    
  function lazzy(){
    const image= document.querySelectorAll('img[lazy]')
    console.log(image)
    image.forEach(item=>{
      observer.observe(item)
    })
  }
  return [()=>{
    lazzy()
  }]

}