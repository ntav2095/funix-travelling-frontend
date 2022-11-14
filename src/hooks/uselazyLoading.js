import { useMemo } from 'react';
import {placeholder} from '../assets/images/index'

export function loadingImg(img){
  const lazzy=img.getAttribute('lazy')
  if(lazzy){
    img.setAttribute('src',lazzy)
    img.removeAttribute()
  }
  
  
}
export default function useLazyLoading(loading){
  const observer =useMemo(()=>
  new IntersectionObserver((entry) =>entry.forEach(item=>{
      if(item.isIntersecting){
          loading(item.target)
      }
    })
  ),[])
  function lazzy(){
    const image= document.querySelectorAll('[src]')
    image.forEach(item=>{
      observer.observe(item)
    })
  }
  return [()=>{
    lazzy()
  }]

}