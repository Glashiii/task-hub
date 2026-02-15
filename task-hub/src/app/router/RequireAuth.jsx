import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../../entities/user/model/hooks/use-auth.js";

const RequireAuth = () => {

    const { isAuth, isInited } = useAuth();
    const location = useLocation();

    if (!isInited) return null;


    if(!isAuth){
        const from = location.pathname + location.search;
        return(
            <Navigate to="/login" replace state={{from}}></Navigate>
        )
    }
    return (
        <Outlet/>
    )
}

export default RequireAuth;