import React from 'react'
import { createContext } from 'react'
export const authDataContext= createContext()   //it will create a context

function AuthContext({children}) {
let serverUrl = "http://localhost:8001" //value defination

    let value = {
       serverUrl    //value we ll let other components use 
    }
  return (

    
    <div>
        <authDataContext.Provider value={value}>    {/* value passed to all children, whoever wants it can access it*/}
            {children}
        </authDataContext.Provider>
      
    </div>
  )
}

export default AuthContext
