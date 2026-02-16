import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "../../pages/Profile.jsx";
import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import MainLayout from "../MainLayout.jsx";
import LoginPage from "../../pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../../pages/RegisterPage/RegisterPage.jsx";
import RequireAuth from "./RequireAuth.jsx";
import ProjectDetail from "../../pages/ProjectDetail/ProjectDetail.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route exact path='/login' element={<LoginPage/>}></Route>
            <Route exact path='/register' element={<RegisterPage/>}></Route>
            <Route element={<RequireAuth/>}>
                <Route element={<MainLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path='/projects/:projectId' element={<ProjectDetail/>}/>
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}

export default AppRouter;