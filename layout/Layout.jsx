import AppHeader from "../components/AppHeader.jsx"
import AppFooter from "../components/AppFooter.jsx"
import { Outlet } from "react-router-dom"


export default function Layout() {
    return (
        <div className="app-wrapper">
            <AppHeader />
            <main>
                <Outlet />
            </main>
            <AppFooter />

            {/* Character in basso a destra */}
            <div className="character">
                <img src="/character2.png" alt="" />
            </div>
        </div>
    )
}
