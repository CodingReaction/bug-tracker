import { useState, useEffect } from "react";
import { useProfileStore } from "../Stores/Global/ProfileStore";
import { SERVER_URL } from "../Stores/Global/globals";

export default function useAutoLoginEffect(){
    const setUser = useProfileStore((state) => state.setUser);

    const authToken = localStorage.getItem("access");
    const [isLoading, setIsLoading] = useState(authToken != null);

    useEffect(() => {
        let cancelRequest = false;
        async function tryFetchProfile(){
            console.log(SERVER_URL + "token/me/");
            const response = await fetch(`http://localhost:8000/api/v1/token/me/`, {method: "GET", headers:{"Authorization": `Bearer ${authToken}`}});
            console.log("effect response", response);
            if (!response.ok){
                setIsLoading(false);
            }
            const profile = await response.json();
            if (!cancelRequest){
                setUser(profile);
                setIsLoading(false);
            }
        }

        console.log("auth token", authToken)
        if (authToken != null)
            tryFetchProfile();
        return () => {
            cancelRequest = true;
        }
    }, [setUser, setIsLoading, authToken, isLoading]);

    return {isLoading};
}
