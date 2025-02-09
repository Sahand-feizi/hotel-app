import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useGetFetchHotelsData(accessCb, rejecteCb, url, qury) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    async function fetchData(fetchUrl, fetchQury) {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`${fetchUrl}?${fetchQury}`)
            accessCb(data)
            setData(data)
        } catch (error) {
            setData([])
            toast.error(error?.response?.data)
            rejecteCb(error?.response?.data)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData(url, qury)
    }, [url, qury])

    return { data, isLoading, fetchData }
}