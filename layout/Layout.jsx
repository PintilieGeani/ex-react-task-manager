import AppHeader from "../components/AppHeader.jsx"
import AppFooter from "../components/AppFooter.jsx"
import { Outlet } from "react-router-dom"


export default function Layout() {
    return(
        <>
        <AppHeader/>
        <main>
            <Outlet />
        </main>
        <AppFooter/>
        </>
    )
}