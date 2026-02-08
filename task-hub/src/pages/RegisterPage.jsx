import {Link} from "react-router-dom";
import {SignUp} from "../shared/SingUp.jsx";

const RegisterPage = () => {
    return (
        <div className="register-page">
            <h1>Register</h1>
            <SignUp/>
            <p>
                Already have an account? <Link to='/login'>Log in</Link>
            </p>
        </div>
    )
}
export default RegisterPage