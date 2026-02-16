// import {useDispatch} from "react-redux";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
// import {setUser} from '../app/store/slices/userSlice'
import {AuthForm} from "./authForm/AuthForm.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../app/store/use-user.js";

const SignUp = () => {
    const navigate = useNavigate();

    // const dispatch = useDispatch();
    const addUser = useUser((state) => state.setUser);

    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                addUser(user.email, user.accessToken, user.uid);
                // dispatch(setUser({
                //     email: user.email,
                //     id: user.uid,
                //     token: user.accessToken,
                // }));

                navigate('/', {replace: true});
            })
            .catch(err => console.log(err))


    }
    return (
        <AuthForm
            title="Register"
            handleClick={handleRegister}
        />
    )
}

export {SignUp}

