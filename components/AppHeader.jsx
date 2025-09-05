import { NavLink } from "react-router-dom";

export default function AppHeader () {
    return(
        <>
        <h1>Sono il header</h1>
        <header>
        <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/addTask">AddTask</NavLink>
        </nav>
        </header>
        </>
    )
}