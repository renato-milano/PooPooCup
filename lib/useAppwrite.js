import React, {useEffect, useState} from 'react'
import { Alert } from 'react-native'
const useAppwrite = (fn) =>{

    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(true)
  
    useEffect(() => {
      const fetchData = async () =>{
        setisLoading(true);
        try {
          const response = await fn();
          setData(response);
          
        } catch (error) {
          Alert.alert("", error.message)
        }finally{
          setisLoading(false)
        }
      }
      fetchData();
    }, [])
    return {data};
}

export default useAppwrite