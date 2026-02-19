// import {useDispatch} from "react-redux";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
// import {setUser} from '../app/store/slices/userSlice'
import {AuthForm} from "./authForm/AuthForm.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../app/store/use-user.js";
import {useState} from "react";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const addUser = useUser((state) => state.setUser);

    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const from = location.state?.from || "/";

    const handleLogin = (email, password) => {
        setInvalidCredentials(false);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                addUser(user.email, user.accessToken, user.uid);
                navigate(from, {replace: true});
            })

            .catch(err => {
                console.log(err)
                setInvalidCredentials(true);
            })
    }


    return (
        <>
            <AuthForm
                title="Login"
                handleClick={handleLogin}
                isInvalidCreds={invalidCredentials}
            />
        </>

    )
}

export {Login};