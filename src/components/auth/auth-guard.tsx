import { useMe } from "@/hooks"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function AuthGuard({children}:{children:ReactNode}){
    const {data,isPending,isError}=useMe()
    const router = useRouter()
    const user =data?.data;
    useEffect(()=>{ 
        if(isPending){ 
            return;
        }
     if(isError || !user?.email ){
        router.replace("/login"); 
     }
    },[isPending,isError,user]) 
        

    return(  
        <div>
            <>
            {children}
            </>
        </div>
    )
}
    