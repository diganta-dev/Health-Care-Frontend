import { useEffect, useState } from "react";

export function useDebunce<T>(value: T,delay=500){
 const [debunceValue,setDebunceValue] = useState(value);
 useEffect(()=>{
   const timer = setTimeout(()=>setDebunceValue(value),delay)
   return ()=>clearTimeout(timer)
 },[value,delay])
 return debunceValue
} 