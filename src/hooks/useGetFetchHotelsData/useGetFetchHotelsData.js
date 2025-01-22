import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useGetFetchHotelsData(url, qury){
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
console.log(url,qury);

    useEffect(() => {
        async function fetchData(){
            try {
                setIsLoading(true)
                const {data} = await axios.get(`${url}?${qury}`)
                setData(data)
            } catch (error) {
                setData([])
                toast.error(error?.response?.data)
            }finally{
                setIsLoading(false)
            }
        }
        fetchData()
    },[url, qury])

    return { data, isLoading }
}