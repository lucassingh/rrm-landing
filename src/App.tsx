import { Outlet } from "react-router-dom";
import { FooterComponent, NavBarComponent } from "./components"

function App() {

    return (
        <>
            <NavBarComponent />
            <Outlet />
            <FooterComponent />
        </>
    )
}

export default App
