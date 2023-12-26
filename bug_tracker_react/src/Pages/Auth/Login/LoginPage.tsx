import { useLocation, useParams } from "wouter";
import { navigate } from "wouter/use-location";
import { useProfileStore } from "../../../Stores/Global/ProfileStore";
import useAutoLoginEffect from "../../../Hooks/useLoginEffect";
import { SERVER_URL } from "../../../Stores/Global/globals";
import { useRef, useState } from "react";

function useQueryParams(): URLSearchParams{
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams;
}

const LoginPage = () => {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const [formError, setFormError] = useState("");

    const queryParams = useQueryParams();
    const next = Array.from(queryParams.entries()).find(entry => entry[0] === "next");
    const setUser = useProfileStore(state => state.setUser);

    async function handleLogin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        console.log(username, password)
        let response = await fetch(`${SERVER_URL}token/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        })
        if (!response.ok){
            setFormError("User data is invalid or doesn't exists");
            return;
        }

        const tokens = await response.json();
        localStorage.setItem("access", tokens.access);
        localStorage.setItem("refresh", tokens.refresh);

        response = await fetch(SERVER_URL + "token/me/", {
            method: "GET",
            headers: {"Authorization": `Bearer ${tokens.access}`},
        })

        if (!response.ok){
            setFormError("User data is invalid or doesn't exists");
            return;
        }

        const user = await response.json();
        setUser(user);
        navigate(next != null ? `${next[1]}` : `/app/tasks`, {
            replace: true,
        });
    }

    const {isLoading} = useAutoLoginEffect();


    if (isLoading){
        return <div>Looking for user data</div>
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={(evt)=> { evt.preventDefault(); handleLogin(); }}>
                <label htmlFor="user-username">Username</label>
                <input ref={usernameRef} required type="text" id="user-username" placeholder="joe1234" onChange={(e) => setFormError("")}/>
                <label htmlFor="user-password">Password</label>
                <input ref={passwordRef} required type="password" id="user-password" placeholder="password" onChange={(e) => setFormError("")} />
                <button type="submit">Login</button>
            </form>
            <h2>{formError}</h2>
        </div>
    );
};

export default LoginPage;
