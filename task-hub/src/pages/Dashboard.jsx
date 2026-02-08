import {useAuth} from "../entities/user/model/hooks/use-auth.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeUser} from "../app/store/slices/userSlice.js";

const Dashboard = () => {

    const dispatch = useDispatch();

    const {
        email
    } = useAuth()

    return (
        <div className="Dashboard">
            some main info
            {email}

            <button onClick={() => dispatch(removeUser(email))}>

            </button>
        </div>
    )
}

export default Dashboard