import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

// React Component
const GlobalProvider = ({children}) => {

    const [isLogged, setLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        console.log("using provider effects")
      getCurrentUser()
      .then((res)=>{
        if (res){
            setLogged(true);
            setUser(res);
        } else{
            setLogged(false);
            setUser(null);
        }
      }).catch((error)=>{
        console.log(error)
      }).finally(()=>{
        setLoading(false);
      })

    }, [])
    

    return(
        <GlobalContext.Provider
        value={{
        isLogged,
        setLogged,
        user,
        setUser,
        isLoading,
        setLoading
        }}>
          {children}  
        </GlobalContext.Provider>
    )

}

export default GlobalProvider