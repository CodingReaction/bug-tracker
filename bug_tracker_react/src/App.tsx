import { Route, Router } from "wouter";

import RouteProtected from "./Components/Authentication/RouteProtected";
import TasksPage from "./Pages/Tasks/TasksPage";
import IndexPage from "./Pages/Index/IndexPage";
import LoginPage from "./Pages/Auth/Login/LoginPage";
import RegisterPage from "./Pages/Auth/Register/RegisterPage";
import ReportsPage from "./Pages/Reports/ReportsPage";

import "./App.css";

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
