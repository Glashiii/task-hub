import {Link} from "react-router-dom";
import {Login} from "../../shared/Login.jsx";
import styles from "./LoginPage.module.css"

const LoginPage = () => {
    return (
        <div className={styles["loginPage"]}>
            <div>
                <h1>Login</h1>
            </div>
            <div className={styles["formContainer"]}>
                <Login />
                <p>
                    or <span className={styles["link"]}><Link to='/register'>Register</Link></span>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;