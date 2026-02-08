import {Route, Routes} from "react-router-dom";
import Profile from "../../pages/Profile.jsx";
import Dashboard from "../../pages/Dashboard.jsx";
import MainLayout from "../MainLayout.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;