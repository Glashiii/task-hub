import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useUser } from "./store/use-user.js";
import {auth} from "../../firebase.js";


export const AuthInit = () => {
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            const { setUser, removeUser, setInited } = useUser.getState();

            if (user) {
                const token = await user.getIdToken();
                setUser(user.email, token, user.uid);
            } else {
                removeUser();
            }

            setInited(true);
        });

        return unsub;
    }, []);

    return null;
}