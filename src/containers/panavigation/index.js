import { useEffect, useState } from "react"
import './panavition.css'


export default function Panavigation(props){
    const [state,setState]=useState(1)

    // console.log(state)
    const totalPage=props.totalPage
    function button1(){
       return state>=3?
        setState((prev)=>prev-2):state>1?setState((prev)=>prev-1):
        null
    }
    function button2(){
        
        return  state>=3?
            setState((prev)=>prev-1):
                state>1?
                null:
                setState((prev)=>prev+1)
       
    }
    function button3(){
        
      return  state==2
        ?setState((prev)=>prev+1):
            state==1?
            setState((prev)=>prev+2):
            null
        
    }
    function button4(){
        
        return state>=3?
            setState((prev)=>prev+1):
                state>1?
                    setState((prev)=>prev+2):
                    setState((prev)=>prev+3)
    }

    function button5(){
        
        return state>=3?
        setState((prev)=>prev+2):
            state>1?
                setState((prev)=>prev+3):
                setState((prev)=>prev+4)
    }

    useEffect(() => {
        if(state>1){
        props.callback(state)
        }
    },[state])

    useEffect(()=>{
        const btnAfter=document.getElementById('btnAfter')
        const btnBefor=document.getElementById('btnBefor')
        if(state==1){
            btnAfter.style.display='none'
        }else if(state==totalPage){
            btnBefor.style.display='none'
        }else{
            btnAfter.style.display='inline'
            btnBefor.style.display='inline'
        }
    },[state])

    useEffect(()=>{
        const btn3=document.getElementById('btn3')
        const btn4=document.getElementById('btn4')
        const btn5=document.getElementById('btn5')    
        if(totalPage==2){
            btn3.style.display='none'
            btn4.style.display='none'
            btn5.style.display='none'
        }else if(totalPage==3){
            btn4.style.display='none'
            btn5.style.display='none'
        }else if(totalPage==4){
            btn5.style.display='none'
        }
    },[])

    useEffect(()=>{
        const btn1=document.getElementById('btn1')
        const btn2=document.getElementById('btn2')
        const btn3=document.getElementById('btn3')
        if(state==1){
            btn2.classList.remove('active-pana')
            btn3.classList.remove('active-pana')
            btn1.classList.add('active-pana')
        }else if(state==2){
            btn1.classList.remove('active-pana')
            btn3.classList.remove('active-pana')
            btn2.classList.add('active-pana')
        }else{
            btn1.classList.remove('active-pana')
            btn2.classList.remove('active-pana')
            btn3.classList.add('active-pana')
        }
    },[state])


return(
    <div className="container">
        <div className="panavigation">
            <button id='btnAfter' className="btn-pana"  onClick={()=>setState((prev)=>prev-1)}>{'<<'}</button>
            <button 
                id='btn1' 
                className="btn-pana" 
                onClick={button1}
            >
                {state>3?state-2:1}
            </button>
            <button 
                id='btn2' 
                className="btn-pana" 
                onClick={button2}
            >
                {state>3?state-1:2}
            </button>
            <button 
                id='btn3' 
                className="btn-pana" 
                onClick={button3}
            >
                {state>3?state:3}
            </button>
            <button 
                id='btn4' 
                className="btn-pana" 
                onClick={button4}
            >
                {state>3?state+1:4}
            </button>
            <button 
                id='btn5' 
                className="btn-pana" 
                onClick={button5}
            >
                {state>3?state+2:5}
            </button>
            <button id='btnBefor' className="btn-pana" onClick={()=>setState((prev)=>prev+1)}>{'>>'}</button>
        </div>
    </div>
)
}

