import Sidebar from "../widgets/sidebar/Sidebar.jsx";
import {Outlet} from "react-router-dom";
import MobileNavBar from "../shared/mobileNavBar/MobileNavBar.jsx";

const MainLayout = () => {
    return (
        <div className="App">

            <Sidebar/>

            <main>
                <MobileNavBar/>
                <Outlet/>
            </main>
        </div>
    )
}

export default MainLayout;