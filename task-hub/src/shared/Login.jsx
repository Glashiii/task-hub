import {useDispatch} from "react-redux";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from '../app/store/slices/userSlice'
import {Form} from "./Form.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const from = location.state?.from || "/";

    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
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