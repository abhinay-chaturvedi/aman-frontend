import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IdContainer from "../idContainer";
import style from "./index.module.css";
// import { useCookies } from 'react-cookie'
// import {Cookies} from "react-cookie"
import { useCookies } from 'react-cookie';
const UserContent= (props)=>{
    const [Cookies,setCookie,remove] =useCookies();
   console.log(Cookies)
    
    const navigate=useNavigate();
    console.log("rendering the user cotent page");
    const [ids,setIds]=useState([]);
    const handleSell=async (e)=>{
        try{
            console.log(e.target.id);
        // console.log("id password section clicked");
        if(props.userDetails.user.coins<20){
            throw new Error("you don't have enough coins to purchase id")
        }else{
            const fetchUser =await fetch("https://aman-backend.onrender.com/user/sub",{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${props.userDetails.token}`
                  },
                  body:JSON.stringify({id:props.userDetails.user._id})
            }) 
            // console.log(fetchUser);
            if(fetchUser.ok==false){
                throw new Error("some technical issue occurs")
            }
            const resUser=await fetchUser.json();
            // console.log(resUser);
        
            const fetchLock =await fetch("https://aman-backend.onrender.com/lock/deactivate",{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${props.userDetails.token}`
                  },
                  body:JSON.stringify({id:e.target.id})
            }) 
            const resLock=await fetchLock.json();
            console.log(resLock);
            const newIds=ids.filter(id=>id._id!=e.target.id);
            console.log(newIds);
            setIds(newIds);
            props.setData({Id:resLock.lockId,password:resLock.password})
            props.setPopup(true);
             props.setUserDetails({...props.userDetails,user:resUser})
             sessionStorage.removeItem("user");
          console.log(props.userDetails.user)
          sessionStorage.setItem("user",JSON.stringify(resUser));
          setCookie("lockid",JSON.stringify({Id:resLock.lockId,password:resLock.password}),{maxAge:7200});

        }
        }catch(e){
            console.log(e);
            navigate("/error",{state:{message:e.message}});
            
        }
    }
    // var ids=[];
   
    const getIds=async ()=>{
        // console.log(`Bearer ${props.userDetails.token}`)
        const fetchData=await fetch("https://aman-backend.onrender.com/lock",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${props.userDetails.token}`
              }
        })
        // console.log(fetchData);
        const response=await fetchData.json();
     
        const res=response.filter((data)=>{
       
            return data.is_Available===true;
        })
      
        setIds(res);
       
    }
    //  getIds()
    // console.log(ids);
    useEffect(()=>{
        getIds()
    },[]);
    return (
        <div className={style.section}>
        <div class={style.leftSection}>
            <h2>Available Ids</h2>
            <div class={style.availableIds}>
      
                {ids && ids.map((e,i)=>(<IdContainer key={i} _id={e._id} password={e.password} onClick={handleSell} class={{div:style.ids,btn:style.btnPur}}/>))}
            </div>
        </div>
        <div class={style.rightSection}>
            <h2>Your Information :)</h2>
            <div class={style.information}>
                <h2>email:</h2>
                <h3>{props.userDetails.user.email}</h3>
                <h2>Your Coins:</h2>
                <h3>{props.userDetails.user.coins}</h3>
                <h2>purchased:</h2>
                {/* {
                    Object.entries(Cookies).forEach(([key,value])=>{
                        return 
                    })
                } */}
               {
                Cookies.lockid &&  <div>
                <p><b>id:</b>{Cookies.lockid.Id}</p>
                <p><b>password:</b>{Cookies.lockid.password}</p>
                <span>it will automatically expire after 2 hour of purchased time </span>
            </div>
               }
            </div>
        </div>
    </div>
    // <h1>hello</h1>
    )
}
export default UserContent;