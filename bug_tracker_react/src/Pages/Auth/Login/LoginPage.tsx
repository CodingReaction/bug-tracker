import { useLocation, useParams } from "wouter";
import { navigate } from "wouter/use-location";
import { useProfileStore } from "../../../Stores/Global/ProfileStore";

function useQueryParams(): URLSearchParams{
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams;
}

const LoginPage = () => {
    const queryParams = useQueryParams();
    const next = Array.from(queryParams.entries()).find(entry => entry[0] === "next");
    const setUser = useProfileStore(state => state.setUser);
    function handleLogin() {
        setUser({id: 1, first_name: "Max", last_name: "Texeira", username: "mtexeira", email: "mtexeira@mtexeira.com"});
        navigate(next != null ? `${next[1]}` : `~/app/tasks`, {
            replace: true,
        });
    }
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
