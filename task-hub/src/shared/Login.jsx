// import {useDispatch} from "react-redux";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
// import {setUser} from '../app/store/slices/userSlice'
import {Form} from "./Form.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../app/store/use-user.js";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const dispatch = useDispatch();
    const addUser = useUser((state) => state.setUser);

    const from = location.state?.from || "/";

    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                addUser(user.email, user.accessToken, user.uid);
                // dispatch(setUser({
                //     email: user.email,
                //     id: user.uid,
                //     token: user.accessToken,
                // }))
                navigate(from, {replace: true});
            })

            .catch(err => console.log(err))
    }


    return (
        <Form
            title="Login"
            handleClick={handleLogin}
        />
    )
}

export {Login};