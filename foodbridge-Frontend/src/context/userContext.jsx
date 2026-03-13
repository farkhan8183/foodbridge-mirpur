import React, { createContext, useContext, useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import axios from 'axios'
import { authDataContext } from './AuthContext'

export const userDataContext = createContext()
function UserContext({children}) {

    let [userData,setUserData] = useState("")
    let {serverUrl} = useContext(authDataContext)


   const getCurrentUser = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/user/getcurrentuser",{withCredentials:true})

            setUserData(result.data)
            console.log(result.data)

        } catch (error) {
            setUserData(null)
            console.log(error)
        }
    }

    useEffect(()=>{ //***............starts.........will run on each  first render!
     getCurrentUser()
    },[])



    let value = {
     userData,setUserData,getCurrentUser
    }
    
   
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
