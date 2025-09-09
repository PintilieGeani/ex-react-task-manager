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

            {/* Character in basso a destra */}
            <div className="character-sinistra">
                <img src="/character3.png" alt="Character sinistro" />

                {<DialogBubble
                text = "Benvenuto, mio oscuro signore!"
                onConfirm = {() => alert("Confermato")}
                onCancel = {() => alert("Annullato")}
                position = "left"
                />}
            </div>
            <div className="character-destra">
                <img src="/character1.png" alt="Character destro" />
                {<DialogBubble
                text = "Come possiamo aiutarla?!"
                position = "right"
                />}
            </div>
        </div>
    )
}
