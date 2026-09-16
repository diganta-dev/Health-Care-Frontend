"use client";

import { toast } from "@/components/ui/toast"
import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation"
export function GoogleLoginButton() {
    const router =useRouter() 
     const {mutate:googleLogin}=useGoogleOAuth()
    const handleGoogleSuccess = (credetialResponse:{credential?:string}) => {
  const {credential}=credetialResponse
  if(!credential){
    toast.add({
      title:"Google login failed",
      description:"Something went wrong",
      type:"error"
    })
    return
  }

  googleLogin({idToken:credential},{
    onSuccess:(res)=>{
      toast.add({
        title:"Google login successfull",
        description:"Welcome back",
        type:"success"
      })
      router.push('/')
    },
    onError:(error)=>{
      toast.add({
        title:"Google login failed",
        description:error.message || "Please try again",
        type:"error"
      })
    }
  })
  
}

const handleGoogleError = () => {
  toast.add({
    title:"Google login failed",
    description:"Something went wrong",
    type:"error"
  })
  
  
}
  return (
    <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            shape="pill"
            size="large"
            width="280" 
          />
  );
}