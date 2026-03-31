import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../Context/TokenContext'




export default function GardRoute({children}) {

    const{token}=useContext(TokenContext)

    if (token){
         
           return  <Navigate to={'/home'}/>
    
       
    }else{
           return children
    }
 
}
