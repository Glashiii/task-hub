import {useUser} from "../../../../app/store/use-user.js";

export const useAuth = () => {
    const email = useUser((state) => state.email);
    const token = useUser((state) => state.token);
    const id = useUser((state) => state.id);

    return { isAuth: !!email, email, token, id };
};