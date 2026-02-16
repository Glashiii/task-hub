import {Link} from "react-router-dom";
import {SignUp} from "../../shared/SingUp.jsx";
import styles from "./RegisterPage.module.css"

const RegisterPage = () => {
    return (
        <div className={styles["registerPage"]}>
            <div>
                <h1>Register</h1>
            </div>

            <div className={styles["formContainer"]}>
            <SignUp/>
            <p>
                Already have an account? <Link to='/login'>Log in</Link>
            </p>
            </div>
        </div>
    )
}
export default RegisterPage