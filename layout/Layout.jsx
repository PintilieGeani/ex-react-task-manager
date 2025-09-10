import AppHeader from "../components/AppHeader.jsx"
import AppFooter from "../components/AppFooter.jsx"
import { Outlet } from "react-router-dom"
import DialogBubble from "../components/DialogBubble.jsx"


export default function Layout() {
    return (
        <div className="app-wrapper">
            <AppHeader />
            <main>
                <Outlet />
            </main>
            <AppFooter />
        </div>
    )
}
