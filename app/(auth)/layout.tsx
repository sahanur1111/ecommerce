import { Children } from "react"

 export default function AuthLayout({
     children
 }:{
    children:React.ReactNode
 }){
    return(
        <div className="flex items-center justify-center h-full w-full bg-yellow-300 ">
            {children}
        </div>
    )
 }