import {useDispatch} from "react-redux";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {setUser} from '../app/store/slices/userSlice'
import {Form} from "./Form.jsx";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));

                navigate('/', {replace: true});
            })
            .catch(err => console.log(err))


    }
    return (
        <Form
            title="Register"
            handleClick={handleRegister}
        />
    )
}

export {SignUp}

