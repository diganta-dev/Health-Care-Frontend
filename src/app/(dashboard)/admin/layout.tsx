import { ReactNode } from "react"

export default function layout({
    children
}:{
    children:ReactNode
}){
    return(
        <section>
            <h1>Admin Layout</h1>
            {children}
        </section>
    )
}