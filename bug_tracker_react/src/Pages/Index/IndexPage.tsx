import { navigate } from "wouter/use-location";

const IndexPage = () => {
    function handleLogin() {
        navigate("/auth/login");
    }

    function handleRegister() {
        navigate("/auth/register");
    }
    return (
        <div>
            <h1>Welcome to bug tracker</h1>
            <header>
                <span>BugTracker</span>
                <nav>
                    <span>
                        <button onClick={handleLogin}>Login</button>
                    </span>{" "}
                    <span>
                        <button onClick={handleRegister}>Register</button>
                    </span>
                </nav>
            </header>
        </div>
    );
};

export default IndexPage;
