 import React, { useEffect } from "react"
 import Layout from "../../layout/Default"
import HomeHearder from "./HomeHearder"
import './home.css'
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";
import Tour from "./tour";

 function HomeNew(){
    const [sendRequest, isLoading, data, error] = useAxios();
    console.log(data)
    useEffect(()=>{
        sendRequest(tourApi.get({page:1,page_size:6}));
    },[])
 return(
    <Layout>
      <div className="myContainer">
        <HomeHearder />
      </div>

      <div className="myContainer">
        <Tour tour={data?.data} title={'TOUR TRONG NƯỚC'} naviga={'/tour-trong-nuoc'} isloading={isLoading} />
      </div>
{/* 
      <div className="myContainer">
      </div>
      
      <div className="myContainer">
      </div>
      
      <div className="myContainer">
      </div>
      
      <div className="myContainer">
      </div> */}
    </Layout>
 )
 }
 export default HomeNew