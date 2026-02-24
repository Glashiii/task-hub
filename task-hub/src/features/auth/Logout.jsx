import {useNavigate} from "react-router-dom";
import {useUser} from "../../app/store/use-user.js";
import { signOut } from "firebase/auth";
import {auth} from "../../../firebase.js"

const LogoutButton = () => {

    const navigate = useNavigate();
    const removeUser = useUser((s) => s.removeUser);

    const onLogout = async () => {
        try {
            await signOut(auth);
            removeUser();
            navigate("/login", {replace: true});
        } catch (e) {
            console.error("Logout error:", e);
        }
    };

    return (
        <button type="button" onClick={onLogout}>
            Logout
        </button>
    )
}

export default LogoutButton;