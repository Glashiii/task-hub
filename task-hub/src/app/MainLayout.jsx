import Sidebar from "../widgets/sidebar/Sidebar.jsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="App">
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;