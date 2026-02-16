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
                    or <Link to='/register'>Register</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;