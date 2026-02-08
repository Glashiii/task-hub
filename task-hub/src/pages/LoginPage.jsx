import {Link} from "react-router-dom";
import {Login} from "../shared/Login.jsx";

const LoginPage = () => {
    return (
        <div className="login-page">
            <h1>Login</h1>
            <Login />
            <p>
                or <Link to='/register'>register</Link>
            </p>
        </div>
    )
}

export default LoginPage;