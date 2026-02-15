import {useUser} from "../../../../app/store/use-user.js";


export const useAuth = () => {
    const email = useUser((state) => state.email);
    const token = useUser((state) => state.token);
    const id = useUser((state) => state.id);
    const isInited = useUser((s) => s.isInited);

    return { isAuth: !!id, email, token, id, isInited };
};