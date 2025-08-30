import { FooterComponent, NavBarComponent, ScrollToTopComponent } from "./components"
import { Outlet } from "react-router-dom";

function App() {

    return (
        <>
            <NavBarComponent />
            <ScrollToTopComponent />
            <Outlet />
            <FooterComponent />
        </>
    )
}

export default App
