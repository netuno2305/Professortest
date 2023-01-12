import { useEffect, useState } from "react";
import { api } from "../lib/axios";

export function useFetch(url){

    const [data, setData] = useState>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState(null)
    

    useEffect(() =>{
        api.get(url)
        .then(response => {
            setData(response.data);
        })
        .catch(err =>{
            setError(err);
        })
        .finally(()=>{
            setIsFetching(false);
        })
    }, [])

    return {data, error, isFetching}
}