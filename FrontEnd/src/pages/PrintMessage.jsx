import React,{useState, useEffect} from "react";
import axios from "axios";


const Fetchlimter=()=>{
    const [mess,setMess]=useState();
    useEffect(()=>{
        const fetchmessage=async()=>{
            try{
                const res=await axios.get("https://ctf-webapp-w65c.onrender.com/user/check",{
                    withCredentials:true,
                });
                setMess(res.data.message);
            }catch(err){
                console.log("error in printing the rate limiters message");
            }
        }
        fetchmessage();
    },[])
}
return (
    <>
    <div> hey therer</div>
    </>
)
export default Fetchlimter;
