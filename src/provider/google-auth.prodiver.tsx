"use client"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ReactNode } from "react"


const GoogleAuthProdiver = ({ children }: { children: ReactNode }) => {
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!client_id) {
       return <>{children}</>
    }
    return (
        <GoogleOAuthProvider clientId={client_id}>
            {children}
        </GoogleOAuthProvider>
    )
}

export default GoogleAuthProdiver  