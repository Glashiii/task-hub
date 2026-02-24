import style from "./Profile.module.css";
import LogoutButton from "../../features/auth/Logout.jsx";
import {useUser} from "../../app/store/use-user.js";

const Profile = () => {
    return (
        <div className={style["profile-container"]}>
            <div>
                <p>Hello, {useUser.getState().email}</p>
            </div>
            <LogoutButton className={style.logoutBtn}/>
        </div>
    )
}

export default Profile