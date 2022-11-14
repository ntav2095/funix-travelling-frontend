import { useMemo } from "react";

export default function useLazyLoading(){
    console.log('lazzy')
    const image= document.querySelectorAll('[lazy]')
    
    const observer = useMemo(
        () =>
          new IntersectionObserver((entry) =>
            entry.forEach(item=>{
                if(item.isIntersecting){
                    console.log(item.target)
                }
            })
          ),
        []
      );
    
      image.forEach(item=>{
        observer.observe(item)
      })
    
      return ''

}