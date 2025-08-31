import { AsideSocialBarComponent, FooterComponent, NavBarComponent, ScrollToTopButtonComponent, ScrollToTopComponent } from "./components"
import { Outlet } from "react-router-dom";

function App() {

    return (
        <>
            <NavBarComponent />
            <AsideSocialBarComponent />
            <ScrollToTopComponent />
            <Outlet />
            <FooterComponent />
            <ScrollToTopButtonComponent />
        </>
    )
}

export default App
