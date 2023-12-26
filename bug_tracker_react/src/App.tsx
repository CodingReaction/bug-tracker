import { Route, Router } from "wouter";

import RouteProtected from "./Components/Authentication/RouteProtected";
import TasksPage from "./Pages/Tasks/TasksPage";
import IndexPage from "./Pages/Index/IndexPage";
import LoginPage from "./Pages/Auth/Login/LoginPage";
import RegisterPage from "./Pages/Auth/Register/RegisterPage";
import ReportsPage from "./Pages/Reports/ReportsPage";

import "./App.css";

const Header = () => {
    return (
        <header className="flex justify-between px-5 py-5 bg-purple-700 text-white">
            <h2 className="text-red-100 bg-blue-50">BugTracker</h2>
            <nav>
                <ul className="flex justify-end gap-2">
                    <li>Tasks</li>
                    <li>profile</li>
                </ul>
            </nav>
        </header>
    );
};

const Footer = () => {
    return (
        <footer>
            <p>All rights reserved. 2023 - Max Texeira</p>
        </footer>
    );
};

function App() {
    return (
        <>
            <Header />
            <Route path="/" component={IndexPage} />
            <Router base="/auth">
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Router>
            <Router base="/app">
                <Route path="/tasks">
                    <RouteProtected component={<TasksPage />} />
                </Route>
                <Route path="/reports">
                    <RouteProtected component={<ReportsPage />} />
                </Route>
            </Router>
            <Route>Not found</Route>
            <Footer />
        </>
    );
}

export default App;
