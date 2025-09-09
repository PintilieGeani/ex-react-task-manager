import { NavLink } from "react-router-dom";

export default function AppHeader () {
    return(
        <>
        <header className="header">
        <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/addTask">AddTask</NavLink>
        </nav>
        </header>
        </>
    )
}