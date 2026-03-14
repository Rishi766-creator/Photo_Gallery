import {useState,useEffect} from "react";
import axios from "axios";
export  function useFetchPhotos(){
    const [photos,setPhotos]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    useEffect(()=>{
        const fetchPhotos=async()=>{
            try{
                
                const res=await axios.get("https://picsum.photos/v2/list?limit=30");
                setPhotos(res.data);
            }
            catch(error){
                setError("Failed to fetch photos");

            }finally{
                setLoading(false);
            }


        };
        fetchPhotos();
        
    },[]);
    return {photos,loading,error};
    

}
