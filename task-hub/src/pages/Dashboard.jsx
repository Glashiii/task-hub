import {useAuth} from "../entities/user/model/hooks/use-auth.js";
import {useNavigate} from "react-router-dom";
import {useUser} from "../app/store/use-user.js";


const Dashboard = () => {

    const removeUser = useUser((state) => state.removeUser);

    const {
        email
    } = useAuth()

    return (
        <div className="Dashboard">
            some main info
            {email}

            <button onClick={() => removeUser()}>

            </button>
        </div>
    )
}

export default Dashboard